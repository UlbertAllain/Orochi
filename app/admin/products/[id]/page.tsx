"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { ProductForm } from "@/components/admin/product-form";
import { deleteCloudinaryImage } from "@/services/cloudinary-service";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/services/product-service";
import { getAllSeries } from "@/services/series-service";
import type { Product } from "@/types/product";
import type { Series } from "@/types/series";

type ProductFormValues = Parameters<
  React.ComponentProps<typeof ProductForm>["onSubmit"]
>[0];

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const [productData, seriesData] = await Promise.all([
        getProductById(params.id),
        getAllSeries(),
      ]);

      setProduct(productData);
      setSeriesList(seriesData);
      setLoading(false);
    }

    loadData();
  }, [params.id]);

  const productSeries = useMemo(() => {
    if (!product) return null;
    return seriesList.find((series) => series.id === product.seriesId) ?? null;
  }, [product, seriesList]);

  async function handleUpdate(values: ProductFormValues) {
    if (!product) return;

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

    await updateProduct(product.id, {
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

  async function handleDelete() {
    if (!product) return;

    const confirmed = window.confirm(
      `Hapus "${product.name}" secara permanen? Asset Cloudinary juga akan dihapus.`,
    );

    if (!confirmed) return;

    setDeleting(true);

    try {
      if (product.cloudinaryPublicId) {
        await deleteCloudinaryImage(product.cloudinaryPublicId);
      }

      await deleteProduct(product.id);
      router.replace("/admin/dashboard");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminGuard>
      <AdminPageShell
        title={product ? `Edit ${product.name}` : "Edit Product"}
        description="Ubah detail parfum, gambar, harga, status rilis, dan urutan tampil."
        action={
          product ? (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-full border border-red-500/25 px-5 py-2 text-sm text-red-200 transition hover:border-red-500/60 disabled:opacity-50"
            >
              {deleting ? "Menghapus..." : "Hapus Product"}
            </button>
          ) : null
        }
      >
        {loading ? (
          <p className="text-sm text-[#f8efe0]/50">Memuat produk...</p>
        ) : !product ? (
          <p className="text-sm text-[#f8efe0]/50">Produk tidak ditemukan.</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <aside className="h-fit rounded-[2rem] border border-[#c8a35f]/10 bg-[#070504] p-5">
              <div className="flex aspect-square items-center justify-center rounded-[1.5rem] bg-[radial-gradient(circle_at_center,rgba(200,163,95,0.14),transparent_60%)]">
                {product.imageUrl && !product.isLocked ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-contain p-5"
                  />
                ) : (
                  <span className="text-7xl text-[#c8a35f]/35">?</span>
                )}
              </div>

              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8a35f]/70">
                  Product Preview
                </p>

                <h2 className="mt-2 font-serif text-4xl text-[#fff7ea]">
                  {product.name}
                </h2>

                <p className="mt-2 text-sm text-[#f8efe0]/45">
                  {productSeries?.name ?? "Unknown Series"}
                </p>

                <div className="mt-5 grid gap-3">
                  <StatusRow label="Slug" value={`/${product.slug}`} />
                  <StatusRow
                    label="Status"
                    value={product.isVisible ? "Visible" : "Hidden"}
                  />
                  <StatusRow
                    label="Release"
                    value={product.isLocked ? "Sealed" : "Released"}
                  />
                  <StatusRow label="Order" value={String(product.order)} />
                </div>
              </div>
            </aside>

            <ProductForm
              seriesList={seriesList}
              initialData={product}
              submitLabel="Simpan Perubahan"
              onSubmit={handleUpdate}
            />
          </div>
        )}
      </AdminPageShell>
    </AdminGuard>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#c8a35f]/10 bg-black/20 px-4 py-3">
      <span className="text-xs text-[#f8efe0]/42">{label}</span>
      <span className="text-xs font-medium text-[#f8efe0]/70">{value}</span>
    </div>
  );
}
