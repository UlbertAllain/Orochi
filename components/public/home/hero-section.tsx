"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PublicNavbar } from "@/components/public/public-navbar";
import type { Product } from "@/types/product";
import type { Series } from "@/types/series";

type HeroSectionProps = {
  mainSeries: Series | null;
  heroProduct: Product | null;
  loading: boolean;
};

function getBottleImage(product: Product | null) {
  if (!product) return "/assets/product/kaminari.png";

  const slug = product.slug?.toLowerCase();

  if (slug?.includes("suiryu")) return "/assets/product/suigetsu.png";
  if (slug?.includes("kaen")) return "/assets/product/kaen.png";
  if (slug?.includes("kaminari")) return "/assets/product/kaminari.png";

  return "/assets/product/kaminari.png";
}

function getKanji(product: Product | null) {
  return product?.kanji || "雷";
}

export function HeroSection({
  mainSeries,
  heroProduct,
  loading,
}: HeroSectionProps) {
  const bottleImage = getBottleImage(heroProduct);
  const kanji = getKanji(heroProduct);

  return (
    <section className="relative min-h-screen overflow-hidden border-b border-[#c8a35f]/10 bg-[#030201]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(200,163,95,0.18),transparent_34%),linear-gradient(180deg,#090604_0%,#030201_78%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030201] to-transparent" />

      <PublicNavbar />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-20 pt-28 lg:grid-cols-[0.95fr_1.05fr] lg:pb-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.5em] text-[#c8a35f]">
            Orochi Perfumes
          </p>

          <p className="mt-5 max-w-3xl font-serif text-5xl md:text-6xl xl:text-7xl font-medium uppercase leading-[0.95] tracking-[-0.045em] text-[#fff7ea] md:text-7xl">
            Fragrance sealed in myth.
          </p>

          <p className="mt-7 max-w-md text-sm leading-8 text-[#f8efe0]/60">
            Bukan sekadar parfum. Setiap varian lahir dari elemen, suasana, dan
            legenda yang dibangun sebagai dunia Orochi.
          </p>

          <div className="mt-10 flex items-center gap-10 border-t border-[#c8a35f]/10 pt-8">
            <div>
              <p className="font-serif text-3xl text-[#c8a35f]">03</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#f8efe0]/45">
                Active Variants
              </p>
            </div>

            <div>
              <p className="font-serif text-3xl text-[#c8a35f]">02</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#f8efe0]/45">
                Sealed Variants
              </p>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            {mainSeries ? (
              <Link
                href={`/series/${mainSeries.slug}`}
                className="rounded-full bg-[#c8a35f] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:bg-[#e1bd75]"
              >
                Explore Godai
              </Link>
            ) : null}

            <a
              href="#world"
              className="rounded-full border border-[#c8a35f]/35 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f8efe0] hover:border-[#c8a35f] hover:text-[#c8a35f]"
            >
              Other Series
            </a>
          </div>
        </motion.div>

        <div className="relative flex min-h-[520px] items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.45, 0.7, 0.45],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-[430px] w-[430px] rounded-full bg-[#c8a35f]/10 blur-3xl md:h-[560px] md:w-[560px]"
          />

          <motion.div
            animate={{
              opacity: [0.08, 0.16, 0.08],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute font-serif text-[16rem] leading-none text-[#c8a35f] md:text-[24rem]"
          >
            {kanji}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{
              opacity: 1,
              y: [0, -14, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeOut" },
              scale: { duration: 0.8, ease: "easeOut" },
              y: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="relative z-10"
          >
            {loading ? (
              <div className="h-[430px] w-[240px] animate-pulse rounded-[5rem] border border-[#c8a35f]/20 bg-white/[0.03]" />
            ) : (
              <Image
                src={bottleImage}
                alt={heroProduct?.name ?? "Orochi Perfume"}
                width={620}
                height={820}
                priority
                className="h-[480px] w-auto object-contain drop-shadow-[0_45px_95px_rgba(0,0,0,0.9)] md:h-[520px]"
              />
            )}
          </motion.div>

          {heroProduct ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="absolute bottom-4 right-0 z-20 max-w-xs rounded-[2rem] border border-[#c8a35f]/14 bg-black/30 p-5 backdrop-blur-xl"
            >
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#c8a35f]">
                Featured Variant
              </p>

              <h2 className="mt-3 font-serif text-4xl text-[#fff7ea]">
                {heroProduct.name}
              </h2>

              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[#f8efe0]/35">
                {heroProduct.meaning || heroProduct.element || "Orochi Variant"}
              </p>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
