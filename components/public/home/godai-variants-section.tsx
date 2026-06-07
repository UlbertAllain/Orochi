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

  if (slug.includes("kaen")) {
    return { image: "/assets/product/kaen.png", kanji: "炎", element: "Fire" };
  }

  if (slug.includes("suigetsu")) {
    return {
      image: "/assets/product/suigetsu.png",
      kanji: "水月",
      element: "Water",
    };
  }

  if (slug.includes("kaze")) {
    return { image: "/assets/product/kaze.png", kanji: "風", element: "Wind" };
  }

  if (slug.includes("yami")) {
    return {
      image: "/assets/product/yami.png",
      kanji: "闇",
      element: "Darkness",
    };
  }

  return {
    image: "/assets/product/kaminari.png",
    kanji: "雷",
    element: "Thunder",
  };
}

export function GodaiVariantsSection({ series, products, loading }: Props) {
  const sortedProducts = [...products].sort((a, b) => a.order - b.order);

  if (loading) {
    return (
      <section className="px-6 py-16 text-center text-sm text-[#f8efe0]/50">
        Memuat Godai Series...
      </section>
    );
  }

  if (!series) return null;

  return (
    <section id="godai" className="border-y border-[#c8a35f]/10 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-6">
          <div className="h-px flex-1 bg-[#c8a35f]/25" />
          <p className="text-xs uppercase tracking-[0.45em] text-[#c8a35f]">
            The Five Elements
          </p>
          <div className="h-px flex-1 bg-[#c8a35f]/25" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {sortedProducts.map((product, index) => {
            const visual = getProductVisual(product);

            const card = (
              <motion.article
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="group relative min-h-[330px] overflow-hidden rounded-[1.5rem] border border-[#c8a35f]/20 bg-[#070504] transition hover:-translate-y-1 hover:border-[#c8a35f]/60"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(200,163,95,0.13),transparent_55%)]" />
                <div className="absolute left-5 top-4 font-serif text-5xl text-[#c8a35f]/20">
                  {product.isLocked ? "?" : visual.kanji}
                </div>

                <div className="relative flex h-56 items-center justify-center px-5 pt-8">
                  {product.isLocked ? (
                    <span className="text-7xl text-[#c8a35f]/25">?</span>
                  ) : (
                    <Image
                      src={visual.image}
                      alt={product.name}
                      width={260}
                      height={360}
                      className="h-[210px] w-auto object-contain drop-shadow-[0_28px_55px_rgba(0,0,0,0.85)] transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="relative border-t border-[#c8a35f]/12 px-5 py-5 text-center">
                  <h3 className="font-serif text-3xl uppercase tracking-[0.04em] text-[#fff7ea]">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[#c8a35f]">
                    {product.isLocked
                      ? "Sealed"
                      : product.meaning || product.element || visual.element}
                  </p>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#f8efe0]/45">
                    {product.isLocked ? "Classified" : visual.element}
                  </p>
                </div>
              </motion.article>
            );

            if (product.isLocked) {
              return <div key={product.id}>{card}</div>;
            }

            return (
              <Link key={product.id} href={`/produk/${product.slug}`}>
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
