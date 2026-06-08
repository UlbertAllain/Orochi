"use client";

import { Suspense, useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { ProductForm } from "@/components/admin/product-form";
import { createProduct } from "@/services/product-service";
import { getAllSeries } from "@/services/series-service";
import type { Series } from "@/types/series";

type ProductFormValues = Parameters<
  ComponentProps<typeof ProductForm>["onSubmit"]
>[0];

function NewProductPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSeriesId = searchParams.get("seriesId") ?? "";

  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSeries() {
      setLoading(true);

      try {
        const data = await getAllSeries();
        setSeriesList(data);
      } finally {
        setLoading(false);
      }
    }

    loadSeries();
  }, []);

  async function handleCreate(values: ProductFormValues) {
    const sizes = values.isLocked
      ? []
      : values.availableSizes.map((size) => {
          switch (size) {
            case "30ml":
              return {
                label: "30ml",
                price: Number(values.price30),
              };

            case "50ml":
              return {
                label: "50ml",
                price: Number(values.price50),
              };

            case "100ml":
              return {
                label: "100ml",
                price: Number(values.price100),
              };

            default:
              return {
                label: "30ml",
                price: Number(values.price30),
              };
          }
        });

    await createProduct({
      seriesId: values.seriesId,
      name: values.name,
      slug: values.slug,
      kanji: values.kanji,
      element: values.element,
      meaning: values.meaning,
      notes: values.notes,
      mood: values.mood,
      description: values.description,
      imageUrl: values.imageUrl,
      cloudinaryPublicId: values.cloudinaryPublicId,
      sizes,
      isLocked: values.isLocked,
      isVisible: values.isVisible,
      order: Number(values.order),
    });

    router.replace("/admin/dashboard");
  }

  return (
    <AdminGuard>
      <AdminPageShell
        title="Tambah Product"
        description="Tambahkan varian parfum baru ke salah satu series Orochi."
      >
        {loading ? (
          <p className="text-sm text-[#f8efe0]/50">Memuat series...</p>
        ) : (
          <ProductForm
            seriesList={seriesList}
            initialSeriesId={initialSeriesId}
            submitLabel="Tambah Product"
            onSubmit={handleCreate}
          />
        )}
      </AdminPageShell>
    </AdminGuard>
  );
}

export default function NewProductPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030201] px-6 py-10 text-sm text-[#f8efe0]/60">
          Memuat halaman tambah product...
        </div>
      }
    >
      <NewProductPageContent />
    </Suspense>
  );
}
