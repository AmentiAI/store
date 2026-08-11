"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import {
  createProduct,
  updateProduct,
  type AdminState,
} from "@/app/actions/admin";
import type { Category, Product } from "@/generated/prisma/client";

const initial: AdminState = {};
const categories: Category[] = ["clothing", "shoes", "accessories"];

export function ProductForm({ product }: { product?: Product }) {
  const action = product ? updateProduct : createProduct;
  const [state, formAction, pending] = useActionState(action, initial);
  const [preview, setPreview] = useState(product?.image ?? "");
  const [imageUrl, setImageUrl] = useState(product?.image ?? "");
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    setPreview(product?.image ?? "");
    setImageUrl(product?.image ?? "");
  }, [product?.image]);

  function assignFile(file: File | null) {
    if (!file) return;
    setFileName(file.name);
    setImageUrl("");
    setPreview(URL.createObjectURL(file));
  }

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]"
    >
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="existingImage" value={product?.image ?? ""} />
      <input type="hidden" name="image" value={imageUrl} readOnly />

      <section className="border border-neutral-200 bg-white p-5">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
          Product image
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          Upload from your computer (JPG, PNG, WEBP, GIF · max 8MB).
        </p>

        <div
          className={`relative mt-4 aspect-[4/5] overflow-hidden bg-neutral-100 ${
            dragOver ? "ring-2 ring-black" : ""
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files?.[0] ?? null;
            const input = document.getElementById(
              "imageFile",
            ) as HTMLInputElement | null;
            if (file && input) {
              const transfer = new DataTransfer();
              transfer.items.add(file);
              input.files = transfer.files;
              assignFile(file);
            }
          }}
        >
          {preview ? (
            preview.startsWith("blob:") ? (
              // Local object URL preview
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Product preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={preview}
                alt="Product preview"
                fill
                unoptimized={preview.startsWith("/uploads/")}
                className="object-cover"
                sizes="320px"
              />
            )
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-neutral-500">
              <ImagePlus className="h-8 w-8" strokeWidth={1.5} />
              <p className="text-sm">Drop an image here or choose a file</p>
            </div>
          )}
        </div>

        <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 border border-neutral-300 bg-neutral-50 px-4 py-3 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors hover:border-black hover:bg-white">
          <Upload className="h-4 w-4" strokeWidth={1.5} />
          {fileName || (product ? "Replace image" : "Choose image")}
          <input
            id="imageFile"
            name="imageFile"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            onChange={(e) => assignFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <div className="mt-4">
          <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500">
            Or paste image URL
          </label>
          <input
            type="url"
            placeholder="https://..."
            value={
              imageUrl.startsWith("http://") || imageUrl.startsWith("https://")
                ? imageUrl
                : ""
            }
            onChange={(e) => {
              const value = e.target.value.trim();
              setFileName("");
              const input = document.getElementById(
                "imageFile",
              ) as HTMLInputElement | null;
              if (input) input.value = "";
              setImageUrl(value);
              setPreview(value || product?.image || "");
            }}
            className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
          />
        </div>
      </section>

      <section className="space-y-4 border border-neutral-200 bg-white p-5 sm:p-6">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
            Details
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Price, description, sizes, and listing flags.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Brand" name="brand" defaultValue={product?.brand} required />
          <Field label="Name" name="name" defaultValue={product?.name} required />
        </div>

        <Field
          label="Slug"
          name="slug"
          defaultValue={product?.slug}
          placeholder="auto from brand + name if empty"
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Price (USD)"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price?.toString()}
            required
          />
          <div>
            <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500">
              Category
            </label>
            <select
              name="category"
              defaultValue={product?.category ?? "clothing"}
              className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Stock"
            name="stock"
            type="number"
            min="0"
            defaultValue={(product?.stock ?? 1).toString()}
          />
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={6}
            defaultValue={product?.description}
            placeholder="Condition, fit, authenticity notes..."
            className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
          />
        </div>

        <Field
          label="Sizes (comma separated)"
          name="sizes"
          defaultValue={product?.sizes.join(", ")}
          placeholder="S, M, L, XL"
        />

        <div className="flex flex-wrap gap-6 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isNew"
              defaultChecked={product?.isNew}
            />
            New arrival
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="onSale"
              defaultChecked={product?.onSale}
            />
            On sale
          </label>
        </div>

        {state.error && <p className="text-sm text-red-600">{state.error}</p>}
        {state.success && (
          <p className="text-sm text-green-700">{state.success}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="bg-black px-5 py-3.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white disabled:opacity-60"
        >
          {pending
            ? "Saving..."
            : product
              ? "Save product"
              : "Publish product"}
        </button>
      </section>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  step,
  min,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  step?: string;
  min?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500">
        {label}
      </label>
      <input
        name={name}
        type={type}
        step={step}
        min={min}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
      />
    </div>
  );
}
