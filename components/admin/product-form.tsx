"use client";

import { useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/admin/image-upload";
import type { Product } from "@/types/product";
import type { Series } from "@/types/series";

type ProductSizeLabel = "30ml" | "50ml" | "100ml";

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
  availableSizes: ProductSizeLabel[];
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

const SIZE_OPTIONS: ProductSizeLabel[] = ["30ml", "50ml", "100ml"];

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
  availableSizes: ["30ml"],
  price30: 55000,
  price50: 0,
  price100: 0,
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

function getSizePrice(product: Product | undefined, label: ProductSizeLabel) {
  return product?.sizes?.find((item) => item.label === label)?.price ?? 0;
}

function getInitialAvailableSizes(product?: Product): ProductSizeLabel[] {
  if (!product?.sizes?.length) return ["30ml"];

  const labels = product.sizes
    .map((size) => size.label)
    .filter((label): label is ProductSizeLabel =>
      SIZE_OPTIONS.includes(label as ProductSizeLabel),
    );

  return labels.length > 0 ? labels : ["30ml"];
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
    availableSizes: getInitialAvailableSizes(product),
    price30: getSizePrice(product, "30ml") || 55000,
    price50: getSizePrice(product, "50ml"),
    price100: getSizePrice(product, "100ml"),
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

  function toggleSize(size: ProductSizeLabel, checked: boolean) {
    setForm((current) => {
      if (checked) {
        if (current.availableSizes.includes(size)) return current;

        return {
          ...current,
          availableSizes: [...current.availableSizes, size],
        };
      }

      return {
        ...current,
        availableSizes: current.availableSizes.filter((item) => item !== size),
      };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.isLocked && form.availableSizes.length === 0) {
      alert("Pilih minimal satu ukuran yang tersedia.");
      return;
    }

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
          <div className="rounded-[1.5rem] border border-[#c8a35f]/10 bg-black/20 p-4">
            <p className="text-sm text-[#f8efe0]/60">Ukuran Tersedia</p>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {SIZE_OPTIONS.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-3 rounded-2xl border border-[#c8a35f]/10 bg-black/25 px-4 py-3 text-sm text-[#f8efe0]/65"
                >
                  <input
                    type="checkbox"
                    checked={form.availableSizes.includes(size)}
                    onChange={(event) => toggleSize(size, event.target.checked)}
                  />
                  {size}
                </label>
              ))}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {form.availableSizes.includes("30ml") ? (
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
                  min={0}
                  placeholder="Harga 30ml"
                  required
                />
              ) : null}

              {form.availableSizes.includes("50ml") ? (
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
                  min={0}
                  placeholder="Harga 50ml"
                  required
                />
              ) : null}

              {form.availableSizes.includes("100ml") ? (
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
                  min={0}
                  placeholder="Harga 100ml"
                  required
                />
              ) : null}
            </div>
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
