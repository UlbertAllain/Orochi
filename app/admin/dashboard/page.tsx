"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { AdminGuard } from "@/components/admin/admin-guard";
import { auth } from "@/lib/firebase/client";
import { getAllProducts, updateProduct } from "@/services/product-service";
import { getAllSeries } from "@/services/series-service";
import type { Product } from "@/types/product";
import type { Series } from "@/types/series";

export default function AdminDashboardPage() {
  const router = useRouter();

  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSeriesId, setSelectedSeriesId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const [seriesData, productData] = await Promise.all([
        getAllSeries(),
        getAllProducts(),
      ]);

      setSeriesList([...seriesData].sort((a, b) => a.order - b.order));
      setProducts([...productData].sort((a, b) => a.order - b.order));

      if (seriesData.length > 0) {
        setSelectedSeriesId(
          [...seriesData].sort((a, b) => a.order - b.order)[0].id,
        );
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const selectedSeries = useMemo(() => {
    return seriesList.find((series) => series.id === selectedSeriesId) ?? null;
  }, [seriesList, selectedSeriesId]);

  const productCountBySeries = useMemo(() => {
    const map = new Map<string, number>();

    for (const product of products) {
      map.set(product.seriesId, (map.get(product.seriesId) ?? 0) + 1);
    }

    return map;
  }, [products]);

  const selectedProducts = useMemo(() => {
    const keyword = searchQuery.toLowerCase().trim();

    return products
      .filter((product) => {
        const sameSeries = product.seriesId === selectedSeriesId;

        const matchSearch =
          !keyword ||
          product.name.toLowerCase().includes(keyword) ||
          product.slug.toLowerCase().includes(keyword) ||
          product.element?.toLowerCase().includes(keyword) ||
          product.meaning?.toLowerCase().includes(keyword);

        return sameSeries && matchSearch;
      })
      .sort((a, b) => a.order - b.order);
  }, [products, selectedSeriesId, searchQuery]);

  const totalVisibleProducts = products.filter(
    (product) => product.isVisible,
  ).length;

  const totalLockedProducts = products.filter(
    (product) => product.isLocked,
  ).length;

  async function handleLogout() {
    await signOut(auth);
    router.replace("/admin/login");
  }

  async function handleMoveProduct(product: Product, direction: "up" | "down") {
    const currentIndex = selectedProducts.findIndex(
      (item) => item.id === product.id,
    );

    if (currentIndex === -1) return;

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const targetProduct = selectedProducts[targetIndex];

    if (!targetProduct) return;

    await Promise.all([
      updateProduct(product.id, {
        order: targetProduct.order,
      }),
      updateProduct(targetProduct.id, {
        order: product.order,
      }),
    ]);

    setProducts((current) =>
      current
        .map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              order: targetProduct.order,
            };
          }

          if (item.id === targetProduct.id) {
            return {
              ...item,
              order: product.order,
            };
          }

          return item;
        })
        .sort((a, b) => a.order - b.order),
    );
  }

  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#030201] px-6 py-8 text-[#f8efe0]">
        <section className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#c8a35f]">
                Orochi Admin
              </p>

              <h1 className="mt-3 font-serif text-4xl font-medium">
                Catalog Control
              </h1>

              <p className="mt-2 text-sm text-[#f8efe0]/48">
                Kelola series, varian parfum, mystery item, dan asset
                Cloudinary.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/series/new"
                className="rounded-full border border-[#c8a35f]/25 px-5 py-2 text-sm text-[#f8efe0]/70 transition hover:border-[#c8a35f] hover:text-[#c8a35f]"
              >
                + Series
              </Link>

              <Link
                href={
                  selectedSeriesId
                    ? `/admin/products/new?seriesId=${selectedSeriesId}`
                    : "/admin/products/new"
                }
                className="rounded-full bg-[#c8a35f] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#e1bd75]"
              >
                + Product
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-full border border-white/10 px-5 py-2 text-sm text-[#f8efe0]/55 transition hover:border-white/25 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Series" value={seriesList.length} />
            <MetricCard label="Products" value={products.length} />
            <MetricCard label="Visible" value={totalVisibleProducts} />
            <MetricCard label="Sealed" value={totalLockedProducts} />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
            <aside className="rounded-[2rem] border border-[#c8a35f]/10 bg-[#070504] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl">Series</h2>
                  <p className="mt-1 text-sm text-[#f8efe0]/38">
                    {seriesList.length} chapters
                  </p>
                </div>

                <Link
                  href="/admin/series/new"
                  className="rounded-full border border-[#c8a35f]/20 px-4 py-2 text-xs text-[#c8a35f]"
                >
                  New
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                {loading ? (
                  <p className="text-sm text-[#f8efe0]/45">Memuat series...</p>
                ) : seriesList.length === 0 ? (
                  <p className="text-sm text-[#f8efe0]/45">Belum ada series.</p>
                ) : (
                  seriesList.map((series) => {
                    const active = series.id === selectedSeriesId;

                    return (
                      <div
                        key={series.id}
                        className={`rounded-[1.35rem] border transition ${
                          active
                            ? "border-[#c8a35f]/45 bg-[#c8a35f]/[0.06]"
                            : "border-white/10 bg-black/20 hover:border-[#c8a35f]/25"
                        }`}
                      >
                        <button
                          onClick={() => setSelectedSeriesId(series.id)}
                          className="w-full p-4 text-left"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-serif text-2xl">
                                {series.name}
                              </h3>

                              <p className="mt-1 text-xs text-[#f8efe0]/36">
                                /{series.slug}
                              </p>
                            </div>

                            <span className="rounded-full border border-[#c8a35f]/15 px-2 py-1 text-xs text-[#c8a35f]/70">
                              {productCountBySeries.get(series.id) ?? 0}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {series.isMain ? (
                              <span className="rounded-full bg-[#c8a35f] px-2 py-1 text-[10px] font-bold text-black">
                                MAIN
                              </span>
                            ) : null}

                            {!series.isVisible ? (
                              <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-[#f8efe0]/40">
                                HIDDEN
                              </span>
                            ) : null}
                          </div>
                        </button>

                        <div className="border-t border-white/10 px-4 py-3">
                          <Link
                            href={`/admin/series/${series.id}/edit`}
                            className="text-xs uppercase tracking-[0.18em] text-[#c8a35f]/75 hover:text-[#c8a35f]"
                          >
                            Edit Series →
                          </Link>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </aside>

            <section className="rounded-[2rem] border border-[#c8a35f]/10 bg-[#070504] p-5">
              {loading ? (
                <p className="text-sm text-[#f8efe0]/45">Memuat produk...</p>
              ) : !selectedSeries ? (
                <div className="flex min-h-[420px] items-center justify-center rounded-[1.5rem] border border-dashed border-[#c8a35f]/15">
                  <p className="text-sm text-[#f8efe0]/45">
                    Pilih series untuk melihat produk.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-5 md:flex-row md:items-center">
                    <div>
                      <p className="text-xs uppercase tracking-[0.34em] text-[#c8a35f]">
                        Selected Series
                      </p>

                      <h2 className="mt-2 font-serif text-4xl">
                        {selectedSeries.name}
                      </h2>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#f8efe0]/45">
                        {selectedSeries.description}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/admin/products/new?seriesId=${selectedSeries.id}`}
                        className="rounded-full bg-[#c8a35f] px-5 py-2 text-sm font-semibold text-black"
                      >
                        + Product
                      </Link>

                      <Link
                        href={`/admin/series/${selectedSeries.id}/edit`}
                        className="rounded-full border border-[#c8a35f]/20 px-5 py-2 text-sm text-[#c8a35f]"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <h3 className="font-serif text-2xl">Products</h3>
                      <p className="mt-1 text-sm text-[#f8efe0]/38">
                        {selectedProducts.length} item
                      </p>
                    </div>

                    <input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search product..."
                      className="w-full rounded-full border border-white/10 bg-black/25 px-5 py-3 text-sm text-[#f8efe0] outline-none transition placeholder:text-[#f8efe0]/28 focus:border-[#c8a35f]/40 md:max-w-xs"
                    />
                  </div>

                  {selectedProducts.length === 0 ? (
                    <div className="mt-6 flex min-h-[320px] items-center justify-center rounded-[1.5rem] border border-dashed border-[#c8a35f]/15">
                      <div className="text-center">
                        <p className="text-sm text-[#f8efe0]/45">
                          Tidak ada produk pada series ini.
                        </p>

                        <Link
                          href={`/admin/products/new?seriesId=${selectedSeries.id}`}
                          className="mt-5 inline-block rounded-full bg-[#c8a35f] px-5 py-2 text-sm font-semibold text-black"
                        >
                          Tambah Product
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {selectedProducts.map((product, index) => (
                        <Link
                          key={product.id}
                          href={`/admin/products/${product.id}`}
                          className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20 p-4 transition hover:border-[#c8a35f]/40 hover:bg-[#c8a35f]/[0.035]"
                        >
                          <div className="flex gap-4">
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1rem] bg-[radial-gradient(circle_at_center,rgba(200,163,95,0.12),transparent_60%)]">
                              {product.imageUrl && !product.isLocked ? (
                                <Image
                                  src={product.imageUrl}
                                  alt={product.name}
                                  width={96}
                                  height={96}
                                  className="h-full w-full object-contain p-2"
                                />
                              ) : (
                                <span className="text-4xl text-[#c8a35f]/35">
                                  ?
                                </span>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="truncate font-serif text-2xl">
                                  {product.name}
                                </h4>

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

                              <p className="mt-1 text-xs text-[#f8efe0]/35">
                                /{product.slug} · Order {product.order}
                              </p>

                              <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#f8efe0]/45">
                                {product.description ||
                                  product.notes ||
                                  "Tidak ada deskripsi."}
                              </p>

                              <div className="mt-3 flex items-center justify-between gap-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-[#c8a35f]/65 group-hover:text-[#c8a35f]">
                                  Edit Product →
                                </p>

                                <div
                                  className="flex gap-1"
                                  onClick={(event) => event.preventDefault()}
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleMoveProduct(product, "up")
                                    }
                                    disabled={index === 0}
                                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c8a35f]/15 text-xs text-[#c8a35f]/70 transition hover:border-[#c8a35f]/45 hover:text-[#c8a35f] disabled:cursor-not-allowed disabled:opacity-30"
                                    title="Move up"
                                  >
                                    ↑
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleMoveProduct(product, "down")
                                    }
                                    disabled={
                                      index === selectedProducts.length - 1
                                    }
                                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c8a35f]/15 text-xs text-[#c8a35f]/70 transition hover:border-[#c8a35f]/45 hover:text-[#c8a35f] disabled:cursor-not-allowed disabled:opacity-30"
                                    title="Move down"
                                  >
                                    ↓
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </section>
      </main>
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
