import type { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";

function formatPrice(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProductCard({ product }: { product: Product }) {
  const locked = product.isLocked;

  return (
   <Link href={`/produk/${product.slug}`} className="group relative block overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#0d0d0d] p-5 shadow-2xl shadow-black/50 transition duration-500 hover:-translate-y-1 hover:border-white/20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_42%)]" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-black">
        <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/45 backdrop-blur">
          {locked ? "Sealed" : product.element || "Orochi"}
        </div>

        <div className="flex aspect-[4/5] items-center justify-center px-8 py-10">
          {locked || !product.imageUrl ? (
            <div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-7xl font-semibold text-white/20 shadow-inner">
              ?
            </div>
          ) : (
            <Image
  src={product.imageUrl}
  alt={product.name}
  width={500}
  height={700}
  className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
/>
          )}
        </div>
      </div>

      <div className="relative pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
              {locked ? "Mystery Variant" : product.meaning || product.mood}
            </p>

            <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
              {product.name}
            </h3>
          </div>

          {product.kanji ? (
            <span className="text-3xl text-white/15">{product.kanji}</span>
          ) : null}
        </div>

        <p className="mt-4 min-h-12 text-sm leading-6 text-white/48">
          {locked
            ? "Varian ini masih tersegel. Detail aroma akan dibuka pada perilisan berikutnya."
            : product.description || product.notes || "Signature scent from Orochi."}
        </p>

        {!locked && product.notes ? (
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/32">
            {product.notes}
          </p>
        ) : null}

        {!locked && product.sizes?.length ? (
          <div className="mt-5 grid grid-cols-3 gap-2">
            {product.sizes.map((size) => (
              <div
                key={size.label}
                className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3 text-center"
              >
                <p className="text-xs text-white/45">{size.label}</p>
                <p className="mt-1 text-[11px] font-semibold text-white/75">
                  {formatPrice(size.price)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/35">
            Coming soon
          </div>
        )}
      </div>
    </Link>
  );
}