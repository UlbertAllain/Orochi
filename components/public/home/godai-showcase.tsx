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

function getProductVisual(product: Product) {
  const slug = product.slug?.toLowerCase() ?? "";

  if (slug.includes("suigetsu")) {
    return {
      image: "/assets/product/suigetsu.png",
      kanji: product.kanji || "水",
      fallback: "S",
    };
  }

  if (slug.includes("kaen")) {
    return {
      image: "/assets/product/kaen.png",
      kanji: product.kanji || "火",
      fallback: "K",
    };
  }

  if (slug.includes("kaminari")) {
    return {
      image: "/assets/product/kaminari.png",
      kanji: product.kanji || "雷",
      fallback: "K",
    };
  }

  return {
    image: "",
    kanji: product.kanji || "蛇",
    fallback: "?",
  };
}

function VariantCard({ product }: { product: Product }) {
  const visual = getProductVisual(product);

  const card = (
    <article className="group relative min-h-[390px] overflow-hidden rounded-[2rem] border border-[#c8a35f]/10 bg-[#070504] p-5 transition hover:-translate-y-1 hover:border-[#c8a35f]/45">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(200,163,95,0.13),transparent_48%)]" />

      <div className="absolute right-5 top-3 font-serif text-[7rem] leading-none text-[#c8a35f]/[0.06] transition group-hover:text-[#c8a35f]/[0.1]">
        {visual.kanji}
      </div>

      <div className="relative flex h-[230px] items-center justify-center">
        {product.isLocked || !visual.image ? (
          <motion.div
            animate={{ opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-32 w-32 items-center justify-center rounded-full border border-[#c8a35f]/20 bg-black/20 text-6xl text-[#c8a35f]/35"
          >
            ?
          </motion.div>
        ) : (
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Image
              src={visual.image}
              alt={product.name}
              width={260}
              height={360}
              className="h-[220px] w-auto object-contain drop-shadow-[0_28px_50px_rgba(0,0,0,0.8)]"
            />
          </motion.div>
        )}
      </div>

      <div className="relative z-10 border-t border-[#c8a35f]/10 pt-5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8a35f]/70">
          {product.isLocked
            ? "Sealed Variant"
            : product.meaning || product.element}
        </p>

        <h3 className="mt-3 font-serif text-3xl text-[#fff7ea]">
          {product.name}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#f8efe0]/46">
          {product.isLocked
            ? "Detail aroma masih tersegel sebagai bagian dari chapter berikutnya."
            : product.description ||
              product.notes ||
              "Godai variant from Orochi."}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#f8efe0]/32">
            {product.isLocked ? "Classified" : "Released"}
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

export function GodaiShowcase({ series, products, loading }: Props) {
  if (loading) {
    return (
      <section className="px-6 py-24 text-center text-sm text-[#f8efe0]/50">
        Memuat Godai Series...
      </section>
    );
  }

  if (!series) return null;

  const featured =
    products.find((product) =>
      product.slug?.toLowerCase().includes("kaminari"),
    ) ??
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
              Dimulai dari elemen pertama, Godai membuka dunia Orochi melalui
              aroma yang terikat pada petir, air, api, dan varian tersegel yang
              belum dibangkitkan.
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
                      className="h-[380px] w-auto object-contain drop-shadow-[0_42px_90px_rgba(0,0,0,0.9)]"
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
              Setiap varian membawa elemen dan atmosfer yang berbeda. Beberapa
              telah dirilis, sisanya masih tersegel.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.48, delay: index * 0.05 }}
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
