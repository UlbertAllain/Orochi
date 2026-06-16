"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import type { Series } from "@/types/series";

type Props = {
  series: Series | null;
  products: Product[];
  loading: boolean;
};

const GODAI_SLOT_COUNT = 3;

function getProductVisual(product: Product) {
  const slug = product.slug?.toLowerCase() ?? "";

  if (slug.includes("suigetsu")) {
    return {
      image: "/assets/product/suigetsu.png",
      kanji: product.kanji || "水",
    };
  }

  if (slug.includes("kaen")) {
    return {
      image: "/assets/product/kaen.png",
      kanji: product.kanji || "火",
    };
  }

  if (slug.includes("tsuki")) {
    return {
      image: "/assets/product/tsuki.png",
      kanji: product.kanji || "月",
    };
  }

  return {
    image: "",
    kanji: product.kanji || "蛇",
  };
}

function createSealedProduct(index: number, seriesId: string): Product {
  return {
    id: `sealed-${index}`,
    seriesId,
    name: "???",
    slug: `sealed-${index}`,
    kanji: "蛇",
    element: "Sealed Variant",
    meaning: "Sealed Variant",
    notes: "",
    mood: "",
    description: "",
    imageUrl: "",
    cloudinaryPublicId: "",
    sizes: [],
    isLocked: true,
    isVisible: true,
    order: index + 1,
  };
}

function VariantCard({ product }: { product: Product }) {
  const card = (
    <article className="group flex h-full min-h-[430px] flex-col overflow-hidden rounded-[0.35rem] border border-[#c8a35f]/25 bg-[#050403] transition duration-500 hover:-translate-y-1 hover:border-[#c8a35f]/60">
      <div className="relative h-[245px] shrink-0 overflow-hidden">
        {product.isLocked || !product.imageUrl ? (
          <div className="flex h-full items-center justify-center bg-[#070504]">
            <span className="font-serif text-7xl text-[#c8a35f]/35">??</span>
          </div>
        ) : (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050403] to-transparent" />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
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

        <div className="mt-auto flex items-center justify-between pt-5">
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

  return (
    <Link href={`/produk/${product.slug}`} className="block h-full">
      {card}
    </Link>
  );
}

export function GodaiShowcase({ series, products, loading }: Props) {
  if (loading) {
    return (
      <section className="px-6 py-24 text-center text-sm text-[#f8efe0]/50">
        Memuat Godai Series...
      </section>
    );
  }

  if (!series) return null;

  const revealedProducts = [...products]
    .filter((product) => !product.isLocked)
    .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));

  const sealedProducts = Array.from({
    length: Math.max(0, GODAI_SLOT_COUNT - revealedProducts.length),
  }).map((_, index) =>
    createSealedProduct(revealedProducts.length + index, series.id),
  );

  const lineupProducts = [...revealedProducts, ...sealedProducts];

  const featured =
    products.find((product) => product.slug?.toLowerCase().includes("tsuki")) ??
    products.find((product) => !product.isLocked) ??
    products[0];

  const featuredVisual = featured ? getProductVisual(featured) : null;

  return (
    <section id="godai" className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(200,163,95,0.08),transparent_42%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-[0.5em] text-[#c8a35f]">
              The First Chapter
            </p>

            <h2 className="mt-5 font-serif text-5xl font-medium uppercase leading-[0.95] tracking-[-0.05em] text-[#fff7ea] md:text-7xl">
              {series.name}
            </h2>

            <p className="mt-7 max-w-md text-sm leading-8 text-[#f8efe0]/56">
              {series.description}
            </p>

            <p className="mt-7 max-w-md text-sm leading-8 text-[#f8efe0]/44">
              Karya pertama kami yang lahir dari filosofi lima elemen Jepang.
              Setiap varian membawa karakter dan atmosfer yang berbeda,
              menciptakan pengalaman yang lebih personal dibanding parfum
              komersial pada umumnya.
            </p>

            <div className="mt-10">
              <Link
                href={`/series/${series.slug}`}
                className="rounded-full border border-[#c8a35f]/35 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f8efe0] transition hover:border-[#c8a35f] hover:text-[#c8a35f]"
              >
                Explore Full Series
              </Link>
            </div>
          </motion.div>

          {featured && featuredVisual ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="relative min-h-[560px] overflow-hidden rounded-[2.6rem] border border-[#c8a35f]/12 bg-[#070504]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(200,163,95,0.18),transparent_56%)]" />

              <motion.div
                animate={{ opacity: [0.08, 0.14, 0.08] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[22rem] leading-none text-[#c8a35f]"
              >
                {featuredVisual.kanji}
              </motion.div>

              <div className="relative z-10 flex min-h-[560px] flex-col items-center justify-center px-6 py-10 text-center">
                {!featured.isLocked && featuredVisual.image ? (
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src={featuredVisual.image}
                      alt={featured.name}
                      width={520}
                      height={720}
                      className="h-[480px] w-auto object-contain drop-shadow-[0_42px_90px_rgba(0,0,0,0.9)]"
                    />
                  </motion.div>
                ) : (
                  <span className="text-8xl text-[#c8a35f]/35">?</span>
                )}

                <div className="mt-5">
                  <p className="text-[10px] uppercase tracking-[0.34em] text-[#c8a35f]/75">
                    Featured Godai
                  </p>

                  <h3 className="mt-3 font-serif text-5xl text-[#fff7ea]">
                    {featured.name}
                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-[#f8efe0]/38">
                    {featured.meaning || featured.element || "Orochi Variant"}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>

        <div className="mt-20">
          <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-[#c8a35f]">
                Variants
              </p>

              <h3 className="mt-4 font-serif text-5xl uppercase text-[#fff7ea]">
                Godai Lineup
              </h3>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#f8efe0]/45">
              Setiap varian membawa aroma sesuai elemen mereka yang berbeda.
              Beberapa telah dirilis, sisanya masih tersegel.
            </p>
          </div>

          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {lineupProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.48, delay: index * 0.05 }}
                className="h-full"
              >
                <VariantCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
