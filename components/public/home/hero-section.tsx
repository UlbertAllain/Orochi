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
    <section className="relative overflow-hidden border-b border-[#c8a35f]/20 bg-[#030201]">
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

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-8 px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <div className="mb-6 flex items-center gap-4 sm:mb-7">
            <span className="h-px w-12 bg-[#c8a35f] sm:w-16" />
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#c8a35f] sm:text-xs sm:tracking-[0.42em]">
              Godai Series
            </p>
          </div>

          <h1 className="max-w-4xl font-serif text-[3.15rem] font-medium uppercase leading-[0.88] tracking-[-0.055em] text-[#fff7ea] sm:text-6xl md:text-7xl">
            Fragrance
            <br />
            Sealed In Myth.
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-[#f8efe0]/68 sm:mt-7 sm:leading-8">
            Born from the five elements and timeless legends. Each scent is a
            chapter of nature’s power, captured in its purest form.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            {mainSeries ? (
              <Link
                href={`/series/${mainSeries.slug}`}
                className="rounded-md bg-[#c8a35f] px-6 py-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-black transition hover:bg-[#e1bd75] sm:px-8"
              >
                Discover Tsuki →
              </Link>
            ) : null}

            <a
              href="#godai"
              className="rounded-md border border-[#c8a35f]/45 px-6 py-4 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#f8efe0] transition hover:border-[#c8a35f] hover:text-[#c8a35f] sm:px-8"
            >
              Explore The Series
            </a>
          </div>

          <div className="mt-9 grid max-w-lg grid-cols-3 gap-3 sm:mt-11 sm:gap-5">
            {[
              ["05", "Elements"],
              ["15+", "Signatures"],
              ["01", "Philosophy"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-l border-[#c8a35f]/30 pl-3 sm:pl-4"
              >
                <p className="font-serif text-2xl text-[#c8a35f] sm:text-3xl">
                  {value}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[#f8efe0]/50 sm:text-[10px] sm:tracking-[0.24em]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[600px]">
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
                  className="h-[320px] w-auto object-contain drop-shadow-[0_35px_80px_rgba(0,0,0,0.95)] sm:h-[390px] lg:h-[420px]"
                />
              ) : null}
            </motion.div>

            <div className="absolute right-0 top-8 hidden writing-mode-vertical text-sm tracking-[0.35em] text-[#c8a35f]/70 xl:block">
              五大の力、香りに宿る。
            </div>
          </div>

          <div className="relative z-10 mx-auto -mt-10 w-full max-w-[340px] rounded-[1.35rem] border border-[#c8a35f]/25 bg-black/65 p-5 backdrop-blur-md sm:-mt-14 sm:max-w-[380px] sm:p-6 lg:absolute lg:right-0 lg:top-1/2 lg:mx-0 lg:mt-0 lg:w-[250px] lg:-translate-y-1/2">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8a35f]">
              Featured
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#fff7ea] sm:text-4xl">
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
        </div>
      </div>
    </section>
  );
}
