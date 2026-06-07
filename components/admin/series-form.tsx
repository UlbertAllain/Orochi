"use client";

import { useState } from "react";
import type { Series } from "@/types/series";

type SeriesFormValues = {
  name: string;
  slug: string;
  description: string;
  isMain: boolean;
  isVisible: boolean;
  order: number;
};

type SeriesFormProps = {
  initialData?: Series;
  submitLabel: string;
  onSubmit: (values: SeriesFormValues) => Promise<void>;
};

const emptyForm: SeriesFormValues = {
  name: "",
  slug: "",
  description: "",
  isMain: false,
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

export function SeriesForm({
  initialData,
  submitLabel,
  onSubmit,
}: SeriesFormProps) {
  const [form, setForm] = useState<SeriesFormValues>(
    initialData
      ? {
          name: initialData.name,
          slug: initialData.slug,
          description: initialData.description,
          isMain: initialData.isMain,
          isVisible: initialData.isVisible,
          order: initialData.order,
        }
      : emptyForm,
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
          <label className="mb-2 block text-sm text-[#f8efe0]/60">
            Nama Series
          </label>
          <input
            value={form.name}
            onChange={(event) => handleNameChange(event.target.value)}
            className={inputClass}
            placeholder="Godai Series"
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
            placeholder="godai-series"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-[#f8efe0]/60">
            Deskripsi
          </label>
          <textarea
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            className={`${inputClass} min-h-32 resize-none`}
            placeholder="Deskripsi series..."
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-[#f8efe0]/60">Urutan</label>
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
            required
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-3 rounded-2xl border border-[#c8a35f]/10 bg-black/25 px-4 py-3 text-sm text-[#f8efe0]/65">
            <input
              type="checkbox"
              checked={form.isMain}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  isMain: event.target.checked,
                }))
              }
            />
            Main Series
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
