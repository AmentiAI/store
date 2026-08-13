"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Star,
  Upload,
  X,
} from "lucide-react";
import {
  createProduct,
  updateProduct,
  type AdminState,
} from "@/app/actions/admin";
import type { Category, Product } from "@/generated/prisma/client";
import {
  isLocalUpload,
  MAX_PRODUCT_IMAGES,
  productGallery,
} from "@/lib/product-types";

const initial: AdminState = {};
const categories: Category[] = ["clothing", "shoes", "accessories"];

type GalleryItem =
  | { id: string; kind: "url"; url: string }
  | { id: string; kind: "file"; file: File; url: string };

function initialGallery(product?: Product): GalleryItem[] {
  return productGallery(product ?? { image: "", images: [] }).map((url) => ({
    id: url,
    kind: "url" as const,
    url,
  }));
}

export function ProductForm({ product }: { product?: Product }) {
  const action = product ? updateProduct : createProduct;
  const [state, formAction, pending] = useActionState(action, initial);
  const [items, setItems] = useState<GalleryItem[]>(() =>
    initialGallery(product),
  );
  const [selected, setSelected] = useState(0);
  const [urlDraft, setUrlDraft] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const submitFilesRef = useRef<HTMLInputElement>(null);
  const gallerySignature = product
    ? `${product.id}:${productGallery(product).join("|")}`
    : "";

  useEffect(() => {
    setItems(initialGallery(product));
    setSelected(0);
    // Only resync when the saved gallery changes, not on every product object identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallerySignature]);

  const preview = items[selected] ?? items[0];
  const remaining = MAX_PRODUCT_IMAGES - items.length;

  function addFiles(fileList: FileList | File[] | null) {
    if (!fileList) return;
    const incoming = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (incoming.length === 0) return;

    setItems((current) => {
      const room = MAX_PRODUCT_IMAGES - current.length;
      const added: GalleryItem[] = incoming.slice(0, room).map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        kind: "file",
        file,
        url: URL.createObjectURL(file),
      }));
      if (added.length > 0) {
        setSelected(current.length);
      }
      return [...current, ...added];
    });
  }

  function addUrl() {
    const value = urlDraft.trim();
    if (!value) return;
    if (!value.startsWith("http://") && !value.startsWith("https://")) return;

    setItems((current) => {
      if (current.length >= MAX_PRODUCT_IMAGES) return current;
      if (current.some((item) => item.kind === "url" && item.url === value)) {
        return current;
      }
      setSelected(current.length);
      return [...current, { id: value, kind: "url", url: value }];
    });
    setUrlDraft("");
  }

  function removeAt(index: number) {
    setItems((current) => {
      const next = current.filter((_, i) => i !== index);
      setSelected((prev) => Math.max(0, Math.min(prev, next.length - 1)));
      return next;
    });
  }

  function move(index: number, direction: -1 | 1) {
    setItems((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      setSelected(target);
      return next;
    });
  }

  function setCover(index: number) {
    if (index === 0) return;
    setItems((current) => {
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.unshift(item);
      setSelected(0);
      return next;
    });
  }

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      onSubmit={() => {
        const input = submitFilesRef.current;
        if (!input) return;
        const transfer = new DataTransfer();
        for (const item of items) {
          if (item.kind === "file") transfer.items.add(item.file);
        }
        input.files = transfer.files;
      }}
      className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]"
    >
      {product && <input type="hidden" name="id" value={product.id} />}
      <input
        type="hidden"
        name="galleryOrder"
        value={items.map((item) => (item.kind === "url" ? "u" : "f")).join(",")}
      />
      {items
        .filter((item) => item.kind === "url")
        .map((item) => (
          <input
            key={item.id}
            type="hidden"
            name="existingImages"
            value={item.url}
          />
        ))}
      <input
        ref={submitFilesRef}
        type="file"
        name="imageFiles"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        tabIndex={-1}
        aria-hidden
      />

      <section className="border border-neutral-200 bg-white p-5">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
          Product images
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          Add up to {MAX_PRODUCT_IMAGES} photos (JPG, PNG, WEBP, GIF · max 8MB
          each). The first image is the cover used in the shop.
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
            addFiles(e.dataTransfer.files);
          }}
        >
          {preview ? (
            preview.url.startsWith("blob:") ? (
              // Local object URL preview
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview.url}
                alt="Product preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={preview.url}
                alt="Product preview"
                fill
                unoptimized={isLocalUpload(preview.url)}
                className="object-cover"
                sizes="360px"
              />
            )
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-neutral-500">
              <ImagePlus className="h-8 w-8" strokeWidth={1.5} />
              <p className="text-sm">Drop images here or choose files</p>
            </div>
          )}
          {preview && selected === 0 && (
            <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase text-white">
              Cover
            </span>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {items.map((item, index) => (
              <div key={item.id} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setSelected(index)}
                  className={`relative block h-20 w-16 overflow-hidden bg-neutral-100 ${
                    index === selected
                      ? "ring-2 ring-black"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {item.url.startsWith("blob:") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={item.url}
                      alt=""
                      fill
                      unoptimized={isLocalUpload(item.url)}
                      className="object-cover"
                      sizes="64px"
                    />
                  )}
                  {index === 0 && (
                    <span className="absolute bottom-0 left-0 right-0 bg-black/80 py-0.5 text-center text-[8px] font-semibold tracking-[0.1em] uppercase text-white">
                      Cover
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  aria-label="Remove image"
                  onClick={() => removeAt(index)}
                  className="absolute -right-1.5 -top-1.5 rounded-full bg-black p-0.5 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={selected === 0}
              onClick={() => move(selected, -1)}
              className="inline-flex items-center gap-1 border border-neutral-300 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Left
            </button>
            <button
              type="button"
              disabled={selected === items.length - 1}
              onClick={() => move(selected, 1)}
              className="inline-flex items-center gap-1 border border-neutral-300 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase disabled:opacity-40"
            >
              Right
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              disabled={selected === 0}
              onClick={() => setCover(selected)}
              className="inline-flex items-center gap-1 border border-neutral-300 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase disabled:opacity-40"
            >
              <Star className="h-3.5 w-3.5" strokeWidth={1.5} />
              Set cover
            </button>
          </div>
        )}

        <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 border border-neutral-300 bg-neutral-50 px-4 py-3 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors hover:border-black hover:bg-white">
          <Upload className="h-4 w-4" strokeWidth={1.5} />
          {remaining <= 0
            ? "Image limit reached"
            : items.length > 0
              ? "Add more images"
              : "Choose images"}
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            disabled={remaining <= 0}
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </label>

        <div className="mt-4">
          <label className="mb-1 block text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500">
            Or paste image URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://..."
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addUrl();
                }
              }}
              disabled={remaining <= 0}
              className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black disabled:opacity-50"
            />
            <button
              type="button"
              onClick={addUrl}
              disabled={remaining <= 0}
              className="shrink-0 border border-neutral-300 px-3 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase hover:border-black disabled:opacity-50"
            >
              Add
            </button>
          </div>
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
