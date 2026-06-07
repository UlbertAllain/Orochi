"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { SeriesForm } from "@/components/admin/series-form";
import { getProductsBySeriesId } from "@/services/product-service";
import {
  deleteSeries,
  getSeriesById,
  updateSeries,
} from "@/services/series-service";
import type { Product } from "@/types/product";
import type { Series } from "@/types/series";

export default function EditSeriesPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);
  const [series, setSeries] = useState<Series | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSeries() {
      setLoading(true);

      const data = await getSeriesById(params.id);

      if (data) {
        const relatedProducts = await getProductsBySeriesId(data.id);
        setProducts(relatedProducts);
      }

      setSeries(data);
      setLoading(false);
    }

    loadSeries();
  }, [params.id]);

  const releasedProducts = useMemo(
    () => products.filter((product) => !product.isLocked),
    [products],
  );

  const sealedProducts = useMemo(
    () => products.filter((product) => product.isLocked),
    [products],
  );

  async function handleDelete() {
    if (!series) return;

    if (products.length > 0) {
      alert(
        `Series ini masih punya ${products.length} produk. Hapus atau pindahkan produknya dulu.`,
      );
      return;
    }

    const confirmed = window.confirm(`Hapus "${series.name}" permanen?`);

    if (!confirmed) return;

    setDeleting(true);

    try {
      await deleteSeries(series.id);
      router.replace("/admin/dashboard");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <AdminGuard>
      <AdminPageShell
        title={series ? `Edit ${series.name}` : "Edit Series"}
        description="Ubah chapter series, status utama, visibilitas, dan urutan tampil."
        action={
          series ? (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-full border border-red-500/25 px-5 py-2 text-sm text-red-200 transition hover:border-red-500/60 disabled:opacity-50"
            >
              {deleting ? "Menghapus..." : "Hapus Series"}
            </button>
          ) : null
        }
      >
        {loading ? (
          <p className="text-sm text-[#f8efe0]/50">Memuat series...</p>
        ) : !series ? (
          <p className="text-sm text-[#f8efe0]/50">Series tidak ditemukan.</p>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <MetricCard label="Products" value={products.length} />
              <MetricCard label="Released" value={releasedProducts.length} />
              <MetricCard label="Sealed" value={sealedProducts.length} />
              <MetricCard label="Order" value={series.order} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
              <section className="rounded-[2rem] border border-[#c8a35f]/10 bg-[#070504] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8a35f]/70">
                      Series Products
                    </p>
                    <h2 className="mt-2 font-serif text-3xl text-[#fff7ea]">
                      {series.name}
                    </h2>
                  </div>

                  <Link
                    href={`/admin/products/new?seriesId=${series.id}`}
                    className="rounded-full bg-[#c8a35f] px-4 py-2 text-xs font-semibold text-black"
                  >
                    + Product
                  </Link>
                </div>

                <div className="mt-5 space-y-3">
                  {products.length === 0 ? (
                    <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-[#c8a35f]/15">
                      <p className="text-sm text-[#f8efe0]/42">
                        Belum ada produk.
                      </p>
                    </div>
                  ) : (
                    products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/admin/products/${product.id}`}
                        className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-[#c8a35f]/35"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-serif text-2xl text-[#fff7ea]">
                              {product.name}
                            </h3>
                            <p className="mt-1 text-xs text-[#f8efe0]/35">
                              /{product.slug} · Order {product.order}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            {product.isLocked ? (
                              <span className="rounded-full border border-[#c8a35f]/20 px-2 py-1 text-[10px] text-[#c8a35f]/70">
                                SEALED
                              </span>
                            ) : null}

                            {!product.isVisible ? (
                              <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-[#f8efe0]/40">
                                HIDDEN
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </section>

              <SeriesForm
                initialData={series}
                submitLabel="Simpan Perubahan"
                onSubmit={async (values) => {
                  await updateSeries(series.id, values);
                  router.replace("/admin/dashboard");
                }}
              />
            </div>
          </div>
        )}
      </AdminPageShell>
    </AdminGuard>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-[#c8a35f]/10 bg-[#070504] p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8a35f]/70">
        {label}
      </p>
      <p className="mt-3 font-serif text-4xl text-[#fff7ea]">{value}</p>
    </div>
  );
}
