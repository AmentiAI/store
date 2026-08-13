"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import {
  capturePaypalOrder,
  createPaypalOrder,
  isPaypalConfigured,
} from "@/lib/paypal";
import { money, shippingForSubtotal } from "@/lib/shipping";

export type CheckoutLine = {
  productId: string;
  size?: string;
  quantity: number;
};

export type CheckoutAddress = {
  email: string;
  shippingName: string;
  shippingLine1: string;
  shippingLine2?: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry?: string;
  notes?: string;
};

export type CheckoutResult = {
  error?: string;
  paypalOrderId?: string;
  orderId?: string;
};

function parseAddress(
  input: CheckoutAddress,
): CheckoutAddress | { error: string } {
  const email = input.email.trim().toLowerCase();
  const shippingName = input.shippingName.trim();
  const shippingLine1 = input.shippingLine1.trim();
  const shippingLine2 = input.shippingLine2?.trim() || undefined;
  const shippingCity = input.shippingCity.trim();
  const shippingState = input.shippingState.trim();
  const shippingZip = input.shippingZip.trim();
  const shippingCountry = (input.shippingCountry ?? "US").trim() || "US";
  const notes = input.notes?.trim() || undefined;

  if (!email.includes("@")) return { error: "Enter a valid email." };
  if (!shippingName) return { error: "Name is required." };
  if (!shippingLine1) return { error: "Street address is required." };
  if (!shippingCity) return { error: "City is required." };
  if (!shippingState) return { error: "State is required." };
  if (!shippingZip) return { error: "ZIP code is required." };

  return {
    email,
    shippingName,
    shippingLine1,
    shippingLine2,
    shippingCity,
    shippingState,
    shippingZip,
    shippingCountry,
    notes,
  };
}

async function quoteCart(lines: CheckoutLine[]) {
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new Error("Your cart is empty.");
  }

  const cleaned = lines.map((line) => ({
    productId: String(line.productId ?? ""),
    size: line.size?.trim() || "",
    quantity: Math.max(1, Math.floor(Number(line.quantity) || 0)),
  }));

  if (cleaned.some((line) => !line.productId || line.quantity < 1)) {
    throw new Error("Cart items are invalid.");
  }

  const products = await prisma.product.findMany({
    where: { id: { in: [...new Set(cleaned.map((line) => line.productId))] } },
  });
  const byId = new Map(products.map((product) => [product.id, product]));

  const items = cleaned.map((line) => {
    const product = byId.get(line.productId);
    if (!product) {
      throw new Error("A product in your cart is no longer available.");
    }
    if (product.stock < line.quantity) {
      throw new Error(`${product.brand} ${product.name} does not have enough stock.`);
    }
    if (product.sizes.length > 0 && !product.sizes.includes(line.size)) {
      throw new Error(`Select a valid size for ${product.brand} ${product.name}.`);
    }

    return {
      product,
      size: line.size || undefined,
      quantity: line.quantity,
      lineTotal: product.price * line.quantity,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = shippingForSubtotal(subtotal);
  const total = subtotal + shipping;

  return { items, subtotal, shipping, total };
}

export async function startPaypalCheckout(
  lines: CheckoutLine[],
  address: CheckoutAddress,
): Promise<CheckoutResult> {
  if (!isPaypalConfigured()) {
    return { error: "PayPal is not configured yet." };
  }

  const parsed = parseAddress(address);
  if ("error" in parsed) return { error: parsed.error };

  try {
    const quote = await quoteCart(lines);
    const session = await getSession();

    const order = await prisma.order.create({
      data: {
        userId: session?.userId ?? undefined,
        email: parsed.email,
        status: "PENDING",
        subtotal: Number(money(quote.subtotal)),
        shipping: Number(money(quote.shipping)),
        total: Number(money(quote.total)),
        shippingName: parsed.shippingName,
        shippingLine1: parsed.shippingLine1,
        shippingLine2: parsed.shippingLine2,
        shippingCity: parsed.shippingCity,
        shippingState: parsed.shippingState,
        shippingZip: parsed.shippingZip,
        shippingCountry: parsed.shippingCountry,
        notes: parsed.notes,
        items: {
          create: quote.items.map((item) => ({
            productId: item.product.id,
            slug: item.product.slug,
            brand: item.product.brand,
            name: item.product.name,
            price: item.product.price,
            size: item.size,
            quantity: item.quantity,
            image: item.product.image,
          })),
        },
      },
    });

    const paypalOrderId = await createPaypalOrder({
      customId: order.id,
      subtotal: quote.subtotal,
      shipping: quote.shipping,
      total: quote.total,
      items: quote.items.map((item) => ({
        name: `${item.product.brand} ${item.product.name}`,
        quantity: item.quantity,
        unitAmount: item.product.price,
      })),
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { paypalOrderId },
    });

    return { paypalOrderId, orderId: order.id };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Could not start checkout.",
    };
  }
}

export async function finishPaypalCheckout(
  paypalOrderId: string,
): Promise<CheckoutResult> {
  const id = paypalOrderId.trim();
  if (!id) return { error: "Missing PayPal order." };

  try {
    const existing = await prisma.order.findFirst({
      where: { paypalOrderId: id },
      include: { items: true },
    });
    if (!existing) return { error: "Order not found." };
    if (existing.status === "PAID") return { orderId: existing.id };

    const captured = await capturePaypalOrder(id);

    await prisma.$transaction(async (tx) => {
      let stockIssue = false;
      for (const item of existing.items) {
        if (!item.productId) continue;
        const updated = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: { gte: item.quantity },
          },
          data: { stock: { decrement: item.quantity } },
        });
        if (updated.count !== 1) stockIssue = true;
      }

      await tx.order.update({
        where: { id: existing.id },
        data: {
          status: "PAID",
          paypalCaptureId: captured.captureId,
          notes: stockIssue
            ? [existing.notes, "Stock could not be decremented for one or more items."]
                .filter(Boolean)
                .join("\n")
            : existing.notes,
        },
      });
    });

    revalidatePath("/admin", "layout");
    revalidatePath("/shop", "layout");
    revalidatePath("/", "layout");

    return { orderId: existing.id };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Payment could not be completed.",
    };
  }
}
