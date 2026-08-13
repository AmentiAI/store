import "server-only";

import { money } from "@/lib/shipping";

type PaypalEnv = "live" | "sandbox";

function paypalEnv(): PaypalEnv {
  const value = (process.env.PAYPAL_ENV ?? "sandbox").trim().toLowerCase();
  return value.startsWith("liv") ? "live" : "sandbox";
}

export function paypalApiBase() {
  return paypalEnv() === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

export function getPaypalClientId() {
  return process.env.PAYPAL_CLIENT_ID?.trim() ?? "";
}

function getPaypalSecret() {
  return process.env.PAYPAL_CLIENT_SECRET?.trim() ?? "";
}

export function isPaypalConfigured() {
  return Boolean(getPaypalClientId() && getPaypalSecret());
}

export function isPaypalLive() {
  return paypalEnv() === "live";
}

async function paypalAccessToken() {
  const clientId = getPaypalClientId();
  const secret = getPaypalSecret();
  if (!clientId || !secret) {
    throw new Error("PayPal is not configured.");
  }

  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const response = await fetch(`${paypalApiBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  const data = (await response.json()) as { access_token?: string; error?: string };
  if (!response.ok || !data.access_token) {
    throw new Error("Could not connect to PayPal.");
  }

  return data.access_token;
}

export type PaypalPurchaseItem = {
  name: string;
  quantity: number;
  unitAmount: number;
};

export async function createPaypalOrder(input: {
  customId: string;
  subtotal: number;
  shipping: number;
  total: number;
  items: PaypalPurchaseItem[];
}) {
  const token = await paypalAccessToken();
  const paypalItems = input.items.map((item) => ({
    name: item.name.slice(0, 127),
    quantity: String(item.quantity),
    unit_amount: {
      currency_code: "USD",
      value: money(item.unitAmount),
    },
  }));
  const itemTotal = paypalItems.reduce(
    (sum, item) => sum + Number(item.unit_amount.value) * Number(item.quantity),
    0,
  );
  const shippingValue = money(input.shipping);
  const totalValue = money(itemTotal + Number(shippingValue));

  const response = await fetch(`${paypalApiBase()}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      application_context: {
        brand_name: "Thrift Sharks",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
      },
      purchase_units: [
        {
          custom_id: input.customId,
          amount: {
            currency_code: "USD",
            value: totalValue,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: money(itemTotal),
              },
              shipping: {
                currency_code: "USD",
                value: shippingValue,
              },
            },
          },
          items: paypalItems,
        },
      ],
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as { id?: string; message?: string };
  if (!response.ok || !data.id) {
    throw new Error("PayPal could not create this order.");
  }

  return data.id;
}

export async function capturePaypalOrder(paypalOrderId: string) {
  const token = await paypalAccessToken();
  const response = await fetch(
    `${paypalApiBase()}/v2/checkout/orders/${encodeURIComponent(paypalOrderId)}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  const data = (await response.json()) as {
    id?: string;
    status?: string;
    purchase_units?: Array<{
      payments?: {
        captures?: Array<{ id?: string; status?: string }>;
      };
    }>;
  };

  if (!response.ok || data.status !== "COMPLETED") {
    throw new Error("PayPal could not capture this payment.");
  }

  const captureId = data.purchase_units?.[0]?.payments?.captures?.[0]?.id;
  return { paypalOrderId: data.id ?? paypalOrderId, captureId };
}
