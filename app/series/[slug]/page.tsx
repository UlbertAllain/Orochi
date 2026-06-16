import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PublicNavbar } from "@/components/public/public-navbar";
import { getProductsBySeriesId } from "@/services/product-service";
import { getSeriesBySlug } from "@/services/series-service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function getSeriesSymbol(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("godai")) return "五";
  if (lower.includes("keshiki")) return "景";
  if (lower.includes("kami")) return "神";

  return "蛇";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);

  if (!series) {
    return { title: "Series tidak ditemukan | Orochi Perfumes" };
  }

  return {
    title: `${series.name} | Orochi Perfumes`,
    description: series.description,
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);

  if (!series) {
    notFound();
  }

  const products = await getProductsBySeriesId(series.id);
  const symbol = getSeriesSymbol(series.name);

  const activeProducts = products.filter((product) => !product.isLocked);
  const lockedProducts = products.filter((product) => product.isLocked);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030201] text-[#f8efe0]">
      <PublicNavbar variant="solid" />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[#c8a35f]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_30%,rgba(200,163,95,0.10),transparent_40%)]" />

        <div className="pointer-events-none absolute -right-16 top-20 select-none font-serif text-[12rem] leading-none text-[#c8a35f]/[0.035] sm:-right-10 sm:text-[16rem] md:top-0 md:text-[20rem]">
          {symbol}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-[#f8efe0]/45 transition hover:text-[#c8a35f]"
          >
            <span className="transition group-hover:-translate-x-1">←</span>
            Kembali
          </Link>

          <div className="mt-12 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.42em] text-[#c8a35f] sm:tracking-[0.6em]">
                Orochi Series
              </p>

              <h1 className="mt-4 font-serif text-[3.25rem] font-medium uppercase leading-[0.9] tracking-[-0.045em] text-[#fff7ea] sm:text-6xl md:text-8xl">
                {series.name}
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-[#f8efe0]/55 sm:leading-8">
                {series.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-[#c8a35f]/15 pt-5 md:flex md:items-center md:gap-6 md:border-l md:border-t-0 md:py-0 md:pl-6">
              <div>
                <p className="font-serif text-3xl text-[#c8a35f]">
                  {products.length}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#f8efe0]/35 sm:tracking-[0.25em]">
                  Variants
                </p>
              </div>

              <div className="hidden h-8 w-px bg-[#c8a35f]/15 md:block" />

              <div>
                <p className="font-serif text-3xl text-[#c8a35f]">
                  {activeProducts.length}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#f8efe0]/35 sm:tracking-[0.25em]">
                  Released
                </p>
              </div>

              <div className="hidden h-8 w-px bg-[#c8a35f]/15 md:block" />

              <div>
                <p className="font-serif text-3xl text-[#c8a35f]/50">
                  {lockedProducts.length}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#f8efe0]/35 sm:tracking-[0.25em]">
                  Sealed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION GRID */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {products.length === 0 ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] border border-dashed border-[#c8a35f]/15 px-6 text-center">
            <p className="text-sm text-[#f8efe0]/45">
              Series ini belum memiliki produk.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => {
              const isFirst = index === 0;

              const cardContent = (
                <article
                  className={[
                    "group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#c8a35f]/10 bg-[#050403] transition duration-500 hover:border-[#c8a35f]/40",
                    isFirst ? "lg:col-span-2 lg:row-span-2" : "",
                  ].join(" ")}
                >
                  <div className="absolute inset-0">
                    {product.imageUrl && !product.isLocked ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="scale-105 object-cover transition duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#070504]">
                        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-[#c8a35f]/20">
                          <div className="absolute h-16 w-px bg-[#c8a35f]/30" />
                          <div className="absolute h-px w-16 bg-[#c8a35f]/30" />
                          <span className="font-serif text-5xl text-[#c8a35f]/25">
                            ?
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />

                  {product.isLocked ? (
                    <div className="absolute inset-0 z-10 overflow-hidden">
                      <div className="absolute inset-0 bg-[#030201]/70 backdrop-blur-[2px]" />

                      <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, #c8a35f 0, #c8a35f 1px, transparent 0, transparent 50%)",
                          backgroundSize: "20px 20px",
                        }}
                      />

                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="border border-[#c8a35f]/20 px-6 py-3">
                          <p className="text-[10px] uppercase tracking-[0.5em] text-[#c8a35f]/60">
                            Classified
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#030201] via-[#030201]/80 to-transparent px-5 pb-6 pt-24 sm:px-6 sm:pb-7">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8a35f]/80 sm:tracking-[0.35em]">
                      {product.isLocked
                        ? "Sealed Variant"
                        : product.element || product.meaning || "Orochi"}
                    </p>

                    <h3
                      className={[
                        "mt-2 font-serif uppercase leading-none text-[#fff7ea]",
                        isFirst ? "text-4xl lg:text-5xl" : "text-3xl",
                      ].join(" ")}
                    >
                      {product.name}
                    </h3>

                    <p className="mt-3 line-clamp-2 max-w-md text-sm leading-7 text-[#f8efe0]/50">
                      {product.isLocked
                        ? "Detail aroma masih tersegel sebagai bagian dari chapter berikutnya."
                        : product.description ||
                          product.notes ||
                          "Signature scent from Orochi."}
                    </p>

                    {!product.isLocked ? (
                      <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#c8a35f]">
                        <span className="h-px w-5 bg-[#c8a35f]/50 transition duration-500 group-hover:w-10" />
                        <span>Explore</span>
                      </div>
                    ) : null}
                  </div>
                </article>
              );

              if (product.isLocked) {
                return (
                  <div key={product.id} className="block">
                    {cardContent}
                  </div>
                );
              }

              return (
                <Link
                  key={product.id}
                  href={`/produk/${product.slug}`}
                  className="block"
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
