import type { Product } from "@/types/product";
import type { Series } from "@/types/series";
import { ProductCard } from "./product-card";
import Link from "next/link";

type SeriesBlockProps = {
  series: Series;
  products: Product[];
  compact?: boolean;
};

export function SeriesBlock({
  series,
  products,
  compact = false,
}: SeriesBlockProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.45em] text-white/30">
            Orochi Series
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            {series.name}
          </h2>

          <p className="mt-5 text-base leading-7 text-white/50">
            {series.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm text-white/35">
            {products.length} variant{products.length > 1 ? "s" : ""}
          </p>

          <Link
            href={`/series/${series.slug}`}
            className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
          >
            Lihat Series
          </Link>
        </div>
      </div>

      <div
        className={
          compact
            ? "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            : "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
