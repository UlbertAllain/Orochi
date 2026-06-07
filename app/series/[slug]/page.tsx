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
    return {
      title: "Series tidak ditemukan | Orochi Perfumes",
    };
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
    <main className="min-h-screen bg-[#030201] text-[#f8efe0]">
      <PublicNavbar variant="solid" />
      <section className="relative overflow-hidden border-b border-[#c8a35f]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_30%,rgba(200,163,95,0.16),transparent_36%)]" />
        <div className="absolute right-10 top-20 font-serif text-[18rem] leading-none text-[#c8a35f]/5">
          {symbol}
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32">
          <Link
            href="/"
            className="text-sm text-[#f8efe0]/45 hover:text-[#c8a35f]"
          >
            ← Kembali
          </Link>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-[#c8a35f]">
                Orochi Series
              </p>

              <h1 className="mt-5 font-serif text-6xl font-medium uppercase tracking-[-0.06em] text-[#fff7ea] md:text-8xl">
                {series.name}
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-8 text-[#f8efe0]/58">
                {series.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-[#c8a35f]/12 bg-[#070504] p-5">
                <p className="font-serif text-4xl text-[#c8a35f]">
                  {products.length}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[#f8efe0]/45">
                  Variants
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-[#c8a35f]/12 bg-[#070504] p-5">
                <p className="font-serif text-4xl text-[#c8a35f]">
                  {activeProducts.length}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[#f8efe0]/45">
                  Released
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-[#c8a35f]/12 bg-[#070504] p-5">
                <p className="font-serif text-4xl text-[#c8a35f]">
                  {lockedProducts.length}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-[#f8efe0]/45">
                  Sealed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-[#c8a35f]">
              Collection
            </p>

            <h2 className="mt-4 font-serif text-5xl uppercase text-[#fff7ea]">
              Variants
            </h2>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-[2rem] border border-dashed border-[#c8a35f]/15">
            <p className="text-sm text-[#f8efe0]/45">
              Series ini belum memiliki produk.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const card = (
                <article className="group overflow-hidden rounded-[2rem] border border-[#c8a35f]/12 bg-[#070504] p-5 transition hover:border-[#c8a35f]/45">
                  <div className="flex aspect-[4/5] items-center justify-center rounded-[1.5rem] bg-[radial-gradient(circle_at_center,rgba(200,163,95,0.14),transparent_58%)]">
                    {product.imageUrl && !product.isLocked ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={520}
                        height={700}
                        className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-8xl text-[#c8a35f]/30">?</span>
                    )}
                  </div>

                  <div className="pt-6">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-[#c8a35f]/70">
                      {product.isLocked
                        ? "Sealed Variant"
                        : product.meaning || product.element || "Orochi"}
                    </p>

                    <h3 className="mt-3 font-serif text-4xl text-[#fff7ea]">
                      {product.name}
                    </h3>

                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#f8efe0]/52">
                      {product.isLocked
                        ? "Detail aroma masih tersegel."
                        : product.description ||
                          product.notes ||
                          "Signature scent from Orochi."}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.22em] text-[#f8efe0]/35">
                        {product.isLocked ? "Classified" : "Released"}
                      </span>

                      {!product.isLocked ? (
                        <span className="text-xs uppercase tracking-[0.22em] text-[#c8a35f]">
                          View →
                        </span>
                      ) : null}
                    </div>
                  </div>
                </article>
              );

              if (product.isLocked) return <div key={product.id}>{card}</div>;

              return (
                <Link key={product.id} href={`/produk/${product.slug}`}>
                  {card}
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
