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
const SHOPEE_URL = "https://shopee.co.id/";

function ProductCatalogCard({ product }: { product: Product }) {
  const card = (
    <article className="group relative min-h-[430px] overflow-hidden rounded-[0.35rem] border border-[#c8a35f]/25 bg-[#050403] transition duration-500 hover:-translate-y-1 hover:border-[#c8a35f]/60">
      <div className="relative h-[245px] overflow-hidden">
        {product.isLocked || !product.imageUrl ? (
          <div className="flex h-full items-center justify-center bg-[#070504]">
            <span className="font-serif text-7xl text-[#c8a35f]/35">??</span>
          </div>
        ) : (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050403] to-transparent" />
      </div>

      <div className="px-5 pb-5 pt-5">
        <p className="text-[10px] uppercase tracking-[0.34em] text-[#c8a35f]/75">
          {product.isLocked
            ? "Sealed Variant"
            : product.element || product.meaning || "Orochi"}
        </p>

        <h3 className="mt-3 font-serif text-3xl text-[#fff7ea]">
          {product.isLocked ? "???" : product.name}
        </h3>

        <p className="mt-3 min-h-[72px] line-clamp-3 text-sm leading-6 text-[#f8efe0]/45">
          {product.isLocked
            ? "Detail aroma masih tersegel sebagai bagian dari chapter berikutnya."
            : product.description ||
              product.notes ||
              "Godai variant from Orochi."}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#f8efe0]/32">
            {product.isLocked ? "Coming Soon" : "Released"}
          </span>

          {!product.isLocked ? (
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#c8a35f]">
              Discover →
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );

  if (product.isLocked) return card;

  return <Link href={`/produk/${product.slug}`}>{card}</Link>;
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  return (
    <main className="min-h-screen bg-[#030201] text-[#f8efe0]">
      <PublicNavbar variant="solid" />

      <section className="relative overflow-hidden border-b border-[#c8a35f]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(200,163,95,0.14),transparent_40%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:min-h-screen lg:grid-cols-[1fr_1fr] lg:pb-24 lg:pt-32">
          {/* ── LEFT: Info ── */}
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
              <h1 className="font-serif text-[3.5rem] font-medium uppercase tracking-[-0.06em] text-[#fff7ea] sm:text-6xl md:text-8xl">
                {product.name}
              </h1>

              {product.kanji ? (
                <span className="font-serif text-3xl text-[#c8a35f]/25 sm:text-5xl">
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
              <div className="mt-8">
                <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#c8a35f]">
                  Available Sizes
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  {product.sizes.map((size) => (
                    <div
                      key={size.label}
                      className="rounded-[1.5rem] border border-[#c8a35f]/12 bg-[#070504] p-5"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-[#f8efe0]/42">
                        {size.label}
                      </p>

                      <p className="mt-3 font-serif text-3xl text-[#c8a35f]">
                        {formatPrice(size.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-8 rounded-[1.75rem] border border-[#c8a35f]/14 bg-[#070504] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#c8a35f]/75">
                    Official Store
                  </p>

                  <p className="mt-2 text-sm leading-7 text-[#f8efe0]/50">
                    Checkout tersedia melalui official marketplace Orochi.
                  </p>
                </div>

                <a
                  href={SHOPEE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#c8a35f] px-7 text-[11px] font-bold uppercase tracking-[0.22em] text-black transition hover:bg-[#e1bd75]"
                >
                  Beli di Shopee →
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Product Image Showcase ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Kanji watermark di belakang */}
            {product.kanji ? (
              <div className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[10rem] leading-none text-[#c8a35f]/[0.04] sm:block sm:text-[14rem] lg:text-[18rem]">
                {product.kanji}
              </div>
            ) : null}

            {/* Glow ambient di belakang gambar */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(200,163,95,0.12),transparent_60%)]" />

            {/* Container gambar utama — aspect-ratio approach */}
            <div className="relative w-full max-w-[520px]">
              {product.imageUrl ? (
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.8rem] border border-[#c8a35f]/14 bg-[#050403]">
                  {/* Inner vignette */}
                  <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_50%_50%,transparent_40%,rgba(3,2,1,0.5)_100%)]" />

                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />

                  {/* Bottom gradient untuk info overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#030201] via-[#030201]/70 to-transparent pb-7 pt-20">
                    <div className="px-7">
                      <p className="text-[10px] uppercase tracking-[0.34em] text-[#c8a35f]/75">
                        {product.element || "Orochi Variant"}
                      </p>

                      <h2 className="mt-2 font-serif text-3xl text-[#fff7ea]">
                        {product.name}
                      </h2>

                      {product.meaning ? (
                        <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[#f8efe0]/38">
                          {product.meaning}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative flex aspect-[4/5] w-full items-center justify-center rounded-[1.8rem] border border-[#c8a35f]/14 bg-[#050403]">
                  <span className="text-8xl text-[#c8a35f]/35">?</span>
                </div>
              )}

              {/* Floating label badge di luar gambar */}
              {product.element ? (
                <div className="absolute left-4 top-4 z-30 sm:left-auto sm:right-4 rounded-full border border-[#c8a35f]/20 bg-[#070504]/90 px-4 py-2 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8a35f]">
                    {product.element}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Info strips di bawah gambar */}
            <div className="mt-6 flex w-full max-w-[520px] flex-col gap-3 px-1 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              {product.mood ? (
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1 w-1 rounded-full bg-[#c8a35f]/60" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#f8efe0]/40">
                    {product.mood}
                  </span>
                </div>
              ) : null}

              {product.sizes?.length ? (
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c8a35f]/60">
                  {product.sizes.length} Size
                  {product.sizes.length > 1 ? "s" : ""} Available
                </span>
              ) : null}
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
              <h2 className="mt-4 font-serif text-[2.5rem] uppercase text-[#fff7ea] sm:text-5xl">
                You May Also Like
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#f8efe0]/45">
              Rekomendasi varian lain dari chapter Orochi yang masih berada
              dalam atmosfer yang sama.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((related, index) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.48, delay: index * 0.05 }}
              >
                <ProductCatalogCard product={related} />
              </motion.div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
