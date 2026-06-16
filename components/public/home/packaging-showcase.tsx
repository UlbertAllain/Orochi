"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function PackagingShowcase() {
  return (
    <section className="relative overflow-hidden border-y border-[#c8a35f]/10 bg-[#030201]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:min-h-[720px] lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, x: -34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative order-2 min-h-[420px] sm:min-h-[520px] lg:order-1 lg:min-h-[720px]"
        >
          <div
            className="absolute inset-y-0 left-0 right-0 lg:right-[-140px]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 74%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, black 0%, black 74%, transparent 100%)",
            }}
          >
            <Image
              src="/assets/kaminari_pack.png"
              alt="Orochi Kaminari packaging"
              fill
              className="object-cover"
              priority={false}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#030201]/10 via-transparent to-[#030201]/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030201] via-transparent to-transparent" />
          </div>

          <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-40 bg-gradient-to-r from-transparent to-[#030201] lg:block" />

          <div className="absolute bottom-6 left-6 rounded-full border border-[#c8a35f]/25 bg-black/35 px-5 py-2 backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c8a35f]">
              Our Packaging
            </p>
          </div>
        </motion.div>

        <div className="relative order-1 flex items-center px-4 py-16 sm:px-10 lg:order-2 lg:px-14 lg:py-24">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#c8a35f]/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-10 h-56 w-56 rounded-full bg-[#c8a35f]/5 blur-[100px]" />

          <motion.div
            initial={{ opacity: 0, x: 34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-xl"
          >
            <p className="text-[10px] uppercase tracking-[0.38em] text-[#c8a35f] sm:text-xs sm:tracking-[0.5em]">
              Crafted As An Artifact
            </p>

            <h2 className="mt-6 font-serif text-[2.75rem] font-medium uppercase leading-[0.9] tracking-[-0.055em] text-[#fff7ea] sm:text-6xl md:text-7xl">
              Beyond
              <br />
              The Bottle
            </h2>

            <p className="mt-7 max-w-md text-sm leading-7 text-[#f8efe0]/62 sm:mt-8 sm:leading-8">
              Orochi dirancang bukan hanya sebagai aroma, tetapi sebagai
              artefak. Setiap botol dan kemasan membawa karakter elemen, simbol,
              dan suasana dari series nya.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/series/godai-series"
                className="rounded-full bg-[#c8a35f] px-6 py-3 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-black transition hover:bg-[#e1bd75] sm:px-7"
              >
                Discover Godai Series
              </Link>

              <a
                href="#godai"
                className="rounded-full border border-[#c8a35f]/35 px-6 py-3 text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#f8efe0] transition hover:border-[#c8a35f] hover:text-[#c8a35f] sm:px-7"
              >
                View Variants
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
