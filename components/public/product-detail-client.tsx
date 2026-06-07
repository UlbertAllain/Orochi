"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { PublicNavbar } from "@/components/public/public-navbar";

type ProductDetailClientProps = {
  product: Product;
  relatedProducts: Product[];
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  return (
    <main className="min-h-screen bg-[#030201] text-[#f8efe0]">
      <PublicNavbar variant="solid" />
      <section className="relative overflow-hidden border-b border-[#c8a35f]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(200,163,95,0.16),transparent_38%)]" />

        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-24 pt-32 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              href="/"
              className="text-sm text-[#f8efe0]/45 hover:text-[#c8a35f]"
            >
              ← Kembali
            </Link>

            <p className="mt-12 text-xs uppercase tracking-[0.5em] text-[#c8a35f]">
              {product.element || "Orochi Variant"}
            </p>

            <div className="mt-5 flex items-start gap-5">
              <h1 className="font-serif text-6xl font-medium uppercase tracking-[-0.06em] text-[#fff7ea] md:text-8xl">
                {product.name}
              </h1>

              {product.kanji ? (
                <span className="font-serif text-5xl text-[#c8a35f]/25">
                  {product.kanji}
                </span>
              ) : null}
            </div>

            {product.meaning ? (
              <p className="mt-4 text-sm uppercase tracking-[0.32em] text-[#f8efe0]/38">
                {product.meaning}
              </p>
            ) : null}

            <p className="mt-8 max-w-xl text-sm leading-8 text-[#f8efe0]/58">
              {product.description || "Signature scent from Orochi."}
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {product.notes ? (
                <div className="rounded-[1.5rem] border border-[#c8a35f]/12 bg-[#070504] p-5">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#c8a35f]/70">
                    Notes
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#f8efe0]/58">
                    {product.notes}
                  </p>
                </div>
              ) : null}

              {product.mood ? (
                <div className="rounded-[1.5rem] border border-[#c8a35f]/12 bg-[#070504] p-5">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#c8a35f]/70">
                    Mood
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#f8efe0]/58">
                    {product.mood}
                  </p>
                </div>
              ) : null}
            </div>

            {product.sizes?.length ? (
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {product.sizes.map((size) => (
                  <div
                    key={size.label}
                    className="rounded-[1.25rem] border border-[#c8a35f]/12 bg-black/20 p-4"
                  >
                    <p className="text-xs text-[#f8efe0]/42">{size.label}</p>
                    <p className="mt-2 font-serif text-2xl text-[#c8a35f]">
                      {formatPrice(size.price)}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-[#c8a35f]/12 bg-[#070504] p-7"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,163,95,0.15),transparent_55%)]" />

            <div className="relative flex h-[460px] items-center justify-center md:h-[620px]">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={760}
                  height={900}
                  priority
                  className="h-full w-full object-contain drop-shadow-[0_45px_90px_rgba(0,0,0,0.85)]"
                />
              ) : (
                <span className="text-8xl text-[#c8a35f]/35">?</span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-[#c8a35f]">
                Related
              </p>
              <h2 className="mt-4 font-serif text-5xl uppercase text-[#fff7ea]">
                You May Also Like
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                href={`/produk/${related.slug}`}
                className="group overflow-hidden rounded-[1.75rem] border border-[#c8a35f]/12 bg-[#070504] p-4 transition hover:border-[#c8a35f]/45"
              >
                <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-[radial-gradient(circle_at_center,rgba(200,163,95,0.12),transparent_58%)]">
                  {related.imageUrl && !related.isLocked ? (
                    <Image
                      src={related.imageUrl}
                      alt={related.name}
                      width={360}
                      height={360}
                      className="h-full w-full object-contain p-4 transition group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-6xl text-[#c8a35f]/30">?</span>
                  )}
                </div>

                <h3 className="mt-5 font-serif text-2xl text-[#fff7ea]">
                  {related.name}
                </h3>

                <p className="mt-2 text-sm text-[#f8efe0]/42">
                  {related.meaning || related.element || "Orochi"}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
