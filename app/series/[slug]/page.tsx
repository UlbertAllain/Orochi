import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsBySeriesId } from "@/services/product-service";
import { getSeriesBySlug } from "@/services/series-service";
import { PublicNavbar } from "@/components/public/public-navbar";

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

  const activeProducts = products.filter((p) => !p.isLocked);
  const lockedProducts = products.filter((p) => p.isLocked);

  return (
    <main className="min-h-screen bg-[#030201] text-[#f8efe0]">
      <PublicNavbar variant="solid" />

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden border-b border-[#c8a35f]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_30%,rgba(200,163,95,0.10),transparent_40%)]" />

        {/* Watermark Kanji */}
        <div className="absolute -right-10 top-10 select-none font-serif text-[20rem] leading-none text-[#c8a35f]/[0.03] md:top-0">
          {symbol}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-[#f8efe0]/45 transition hover:text-[#c8a35f]"
          >
            <span className="transition group-hover:-translate-x-1">←</span>
            Kembali
          </Link>

          <div className="mt-14 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.6em] text-[#c8a35f]">
                Orochi Series
              </p>

              <h1 className="mt-4 font-serif text-6xl font-medium uppercase tracking-[-0.04em] text-[#fff7ea] md:text-8xl">
                {series.name}
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-8 text-[#f8efe0]/55">
                {series.description}
              </p>
            </div>

            {/* Minimalist Stats Bar */}
            <div className="flex items-center gap-6 border-t border-[#c8a35f]/15 pt-5 md:border-t-0 md:border-l md:py-0 md:pl-6">
              <div>
                <p className="font-serif text-3xl text-[#c8a35f]">
                  {products.length}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#f8efe0]/35">
                  Variants
                </p>
              </div>
              <div className="h-8 w-px bg-[#c8a35f]/15" />
              <div>
                <p className="font-serif text-3xl text-[#c8a35f]">
                  {activeProducts.length}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#f8efe0]/35">
                  Released
                </p>
              </div>
              <div className="h-8 w-px bg-[#c8a35f]/15" />
              <div>
                <p className="font-serif text-3xl text-[#c8a35f]/50">
                  {lockedProducts.length}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#f8efe0]/35">
                  Sealed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTION GRID ── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        {products.length === 0 ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] border border-dashed border-[#c8a35f]/15">
            <p className="text-sm text-[#f8efe0]/45">
              Series ini belum memiliki produk.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => {
              const isFirst = index === 0;

              const cardContent = (
                <article
                  className={`group relative overflow-hidden rounded-2xl border border-[#c8a35f]/10 bg-[#050403] transition duration-500 hover:border-[#c8a35f]/40 ${
                    isFirst ? "md:aspect-[4/5] md:row-span-2" : "aspect-[4/5]"
                  }`}
                >
                  {/* Image Layer (Full Bleed) */}
                  <div className="absolute inset-0">
                    {product.imageUrl && !product.isLocked ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-700 scale-105 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#070504]">
                        {/* Abstract geometric for locked */}
                        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-[#c8a35f]/20">
                          <div className="absolute h-16 w-px bg-[#c8a35f]/30" />
                          <div className="absolute w-16 h-px bg-[#c8a35f]/30" />
                          <span className="font-serif text-5xl text-[#c8a35f]/25">
                            ?
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />

                  {/* Locked Redaction Overlay */}
                  {product.isLocked && (
                    <div className="absolute inset-0 z-10 overflow-hidden">
                      <div className="absolute inset-0 bg-[#030201]/70 backdrop-blur-[2px]" />
                      {/* Diagonal stripes aesthetic */}
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
                  )}

                  {/* Bottom Gradient & Text Layer */}
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#030201] via-[#030201]/80 to-transparent pb-7 pt-24 px-6">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#c8a35f]/80">
                      {product.isLocked
                        ? "Sealed Variant"
                        : product.element || product.meaning || "Orochi"}
                    </p>

                    <h3
                      className={`mt-2 font-serif uppercase text-[#fff7ea] ${
                        isFirst ? "text-5xl" : "text-3xl"
                      }`}
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

                    {/* Action Line */}
                    {!product.isLocked && (
                      <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#c8a35f]">
                        <span className="h-px w-5 bg-[#c8a35f]/50 transition duration-500 group-hover:w-10" />
                        <span>Explore</span>
                      </div>
                    )}
                  </div>
                </article>
              );

              if (product.isLocked) {
                return <div key={product.id}>{cardContent}</div>;
              }

              return (
                <Link key={product.id} href={`/produk/${product.slug}`}>
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
