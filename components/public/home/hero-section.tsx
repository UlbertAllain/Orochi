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

export function HeroSection({
  mainSeries,
  heroProduct,
  loading,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden border-b border-[#c8a35f]/20 bg-[#030201]">
      <Image
        src="/assets/collections/keshiki-bg.png"
        alt="Keshiki background"
        fill
        priority
        className="object-cover opacity-70"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#030201] via-[#030201]/70 to-[#030201]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030201] via-transparent to-[#030201]/70" />

      <PublicNavbar />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-20 pt-28 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-16 bg-[#c8a35f]" />
            <p className="text-xs uppercase tracking-[0.42em] text-[#c8a35f]">
              Godai Series
            </p>
          </div>

          <h1 className="max-w-4xl font-serif text-6xl font-medium uppercase leading-[0.86] tracking-[-0.06em] text-[#fff7ea] md:text-7xl">
            Fragrance
            <br />
            Sealed In Myth.
          </h1>

          <p className="mt-7 max-w-md text-sm leading-8 text-[#f8efe0]/68">
            Born from the five elements and timeless legends. Each scent is a
            chapter of nature’s power, captured in its purest form.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            {mainSeries ? (
              <Link
                href={`/series/${mainSeries.slug}`}
                className="rounded-md bg-[#c8a35f] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-black transition hover:bg-[#e1bd75]"
              >
                Discover Tsuki →
              </Link>
            ) : null}

            <a
              href="#godai"
              className="rounded-md border border-[#c8a35f]/45 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f8efe0] transition hover:border-[#c8a35f] hover:text-[#c8a35f]"
            >
              Explore The Series
            </a>
          </div>

          <div className="mt-11 grid max-w-lg grid-cols-3 gap-5">
            {[
              ["05", "Elements"],
              ["15+", "Signatures"],
              ["01", "Philosophy"],
            ].map(([value, label]) => (
              <div key={label} className="border-l border-[#c8a35f]/30 pl-4">
                <p className="font-serif text-3xl text-[#c8a35f]">{value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#f8efe0]/50">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {!loading ? (
              <Image
                src="/assets/product/tsuki.png"
                alt={heroProduct?.name ?? "tsuki"}
                width={620}
                height={820}
                className="h-[420px] w-auto object-contain drop-shadow-[0_50px_110px_rgba(0,0,0,0.95)]"
              />
            ) : null}
          </motion.div>

          <div className="absolute right-0 top-1/2 hidden w-[250px] -translate-y-1/2 rounded-[1.5rem] border border-[#c8a35f]/25 bg-black/45 p-6 backdrop-blur-md lg:block">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8a35f]">
              Featured
            </p>
            <h2 className="mt-3 font-serif text-4xl text-[#fff7ea]">
              {heroProduct?.name ?? "Tsuki"}
            </h2>
            <div className="mt-5 space-y-4 text-xs leading-6 text-[#f8efe0]/58">
              <p>
                <span className="text-[#c8a35f]">Element</span>
                <br />
                Moon
              </p>
              <p>
                <span className="text-[#c8a35f]">Mood</span>
                <br />
                Sweet · Water · Fresh
              </p>
            </div>
          </div>

          <p className="absolute right-0 top-8 hidden writing-mode-vertical text-sm tracking-[0.35em] text-[#c8a35f]/70 xl:block">
            五大の力、香りに宿る。
          </p>
        </div>
      </div>
    </section>
  );
}
