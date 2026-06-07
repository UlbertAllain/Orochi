"use client";

import { useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/image-upload";
import type { Product } from "@/types/product";
import type { Series } from "@/types/series";

type ProductFormValues = {
  seriesId: string;
  name: string;
  slug: string;
  kanji: string;
  element: string;
  meaning: string;
  notes: string;
  mood: string;
  description: string;
  imageUrl: string;
  cloudinaryPublicId: string;
  price30: number;
  price50: number;
  price100: number;
  isLocked: boolean;
  isVisible: boolean;
  order: number;
};

type ProductFormProps = {
  seriesList: Series[];
  initialSeriesId?: string;
  initialData?: Product;
  submitLabel: string;
  onSubmit: (values: ProductFormValues) => Promise<void>;
};

const emptyForm: ProductFormValues = {
  seriesId: "",
  name: "",
  slug: "",
  kanji: "",
  element: "",
  meaning: "",
  notes: "",
  mood: "",
  description: "",
  imageUrl: "",
  cloudinaryPublicId: "",
  price30: 35000,
  price50: 50000,
  price100: 70000,
  isLocked: false,
  isVisible: true,
  order: 1,
};

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-[#f8efe0] outline-none placeholder:text-[#f8efe0]/28 transition focus:border-[#c8a35f]/40";

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getInitialForm(
  product?: Product,
  initialSeriesId?: string,
): ProductFormValues {
  if (!product) {
    return {
      ...emptyForm,
      seriesId: initialSeriesId ?? "",
    };
  }

  return {
    seriesId: product.seriesId,
    name: product.name,
    slug: product.slug,
    kanji: product.kanji ?? "",
    element: product.element ?? "",
    meaning: product.meaning ?? "",
    notes: product.notes ?? "",
    mood: product.mood ?? "",
    description: product.description ?? "",
    imageUrl: product.imageUrl ?? "",
    cloudinaryPublicId: product.cloudinaryPublicId ?? "",
    price30:
      product.sizes?.find((item) => item.label === "30ml")?.price ?? 35000,
    price50:
      product.sizes?.find((item) => item.label === "50ml")?.price ?? 50000,
    price100:
      product.sizes?.find((item) => item.label === "100ml")?.price ?? 70000,
    isLocked: product.isLocked,
    isVisible: product.isVisible,
    order: product.order,
  };
}

export function ProductForm({
  seriesList,
  initialSeriesId,
  initialData,
  submitLabel,
  onSubmit,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductFormValues>(
    getInitialForm(initialData, initialSeriesId),
  );
  const [saving, setSaving] = useState(false);

  function handleNameChange(value: string) {
    setForm((current) => ({
      ...current,
      name: value,
      slug: createSlug(value),
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      await onSubmit({
        ...form,
        order: Number(form.order),
        price30: Number(form.price30),
        price50: Number(form.price50),
        price100: Number(form.price100),
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-[#c8a35f]/10 bg-[#070504] p-6"
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-[#f8efe0]/60">Series</label>
          <select
            value={form.seriesId}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                seriesId: event.target.value,
              }))
            }
            className={inputClass}
            required
          >
            <option value="">Pilih series</option>
            {seriesList.map((series) => (
              <option key={series.id} value={series.id}>
                {series.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-[#f8efe0]/60">Nama</label>
            <input
              value={form.name}
              onChange={(event) => handleNameChange(event.target.value)}
              className={inputClass}
              placeholder="Kaminari"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#f8efe0]/60">Slug</label>
            <input
              value={form.slug}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  slug: createSlug(event.target.value),
                }))
              }
              className={inputClass}
              placeholder="kaminari"
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            value={form.kanji}
            onChange={(event) =>
              setForm((current) => ({ ...current, kanji: event.target.value }))
            }
            className={inputClass}
            placeholder="Kanji"
          />

          <input
            value={form.element}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                element: event.target.value,
              }))
            }
            className={inputClass}
            placeholder="Element"
          />

          <input
            value={form.meaning}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                meaning: event.target.value,
              }))
            }
            className={inputClass}
            placeholder="Arti"
          />
        </div>

        <input
          value={form.notes}
          onChange={(event) =>
            setForm((current) => ({ ...current, notes: event.target.value }))
          }
          className={inputClass}
          placeholder="Notes"
        />

        <input
          value={form.mood}
          onChange={(event) =>
            setForm((current) => ({ ...current, mood: event.target.value }))
          }
          className={inputClass}
          placeholder="Mood"
        />

        <textarea
          value={form.description}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
          className={`${inputClass} min-h-32 resize-none`}
          placeholder="Deskripsi produk..."
        />

        <div>
          <label className="mb-2 block text-sm text-[#f8efe0]/60">
            Gambar Produk
          </label>

          <ImageUpload
            currentPublicId={form.cloudinaryPublicId}
            onUploaded={({ imageUrl, publicId }) =>
              setForm((current) => ({
                ...current,
                imageUrl,
                cloudinaryPublicId: publicId,
              }))
            }
          />

          {form.imageUrl ? (
            <Image
              src={form.imageUrl}
              alt="Preview produk"
              width={176}
              height={176}
              className="mt-4 h-44 w-44 rounded-2xl bg-black object-contain p-3"
            />
          ) : null}
        </div>

        {!form.isLocked ? (
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="number"
              value={form.price30}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  price30: Number(event.target.value),
                }))
              }
              className={inputClass}
              placeholder="30ml"
            />

            <input
              type="number"
              value={form.price50}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  price50: Number(event.target.value),
                }))
              }
              className={inputClass}
              placeholder="50ml"
            />

            <input
              type="number"
              value={form.price100}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  price100: Number(event.target.value),
                }))
              }
              className={inputClass}
              placeholder="100ml"
            />
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="flex items-center gap-3 rounded-2xl border border-[#c8a35f]/10 bg-black/25 px-4 py-3 text-sm text-[#f8efe0]/65">
            <input
              type="checkbox"
              checked={form.isLocked}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  isLocked: event.target.checked,
                }))
              }
            />
            Locked
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-[#c8a35f]/10 bg-black/25 px-4 py-3 text-sm text-[#f8efe0]/65">
            <input
              type="checkbox"
              checked={form.isVisible}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  isVisible: event.target.checked,
                }))
              }
            />
            Visible
          </label>

          <input
            type="number"
            value={form.order}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                order: Number(event.target.value),
              }))
            }
            className={inputClass}
            min={1}
            placeholder="Order"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[#c8a35f] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e1bd75] disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
