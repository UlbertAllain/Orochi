"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/product";

export function ComingSoonSection({ products }: { products: Product[] }) {
  const mystery = products.slice(0, 8);

  if (mystery.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-t border-[#c8a35f]/10 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[#c8a35f]">
            Sealed Variants
          </p>

          <h2 className="mt-4 font-serif text-5xl uppercase tracking-[-0.05em] text-[#fff7ea] md:text-7xl">
            Awakening Soon
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-[#f8efe0]/50">
            Beberapa varian belum dibuka. Nama, elemen, dan komposisinya masih
            tersimpan sebagai chapter berikutnya dari dunia Orochi.
          </p>
        </div>
      </div>

      <div className="overflow-hidden border-y border-[#c8a35f]/10 bg-[#070504]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max"
        >
          {[...mystery, ...mystery].map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="flex h-32 w-[320px] shrink-0 items-center justify-between border-r border-[#c8a35f]/10 px-8"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#c8a35f]/70">
                  Classified
                </p>
                <h3 className="mt-2 font-serif text-3xl text-[#fff7ea]">
                  {product.name}
                </h3>
              </div>

              <span className="font-serif text-6xl text-[#c8a35f]/20">?</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
