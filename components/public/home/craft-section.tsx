"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const specs = [
  ["Origin", "Made in Japan"],
  ["Concentration", "Eau de Parfum"],
  ["Philosophy", "Nature. Myth. Balance."],
  ["Volume", "30ml / 50ml / 100ml"],
];

export function CraftSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#c8a35f]/10">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[560px] px-6 py-20 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(200,163,95,0.11),transparent_50%)]" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.65 }}
            className="relative z-10 max-w-lg"
          >
            <p className="text-xs uppercase tracking-[0.45em] text-[#c8a35f]">
              Our Craft
            </p>

            <h2 className="mt-5 font-serif text-5xl uppercase leading-[0.95] tracking-[-0.05em] text-[#fff7ea] md:text-7xl">
              Crafted Through
              <br />
              Element & Legend
            </h2>

            <p className="mt-7 text-sm leading-8 text-[#f8efe0]/55">
              We blend rare ingredients with ancient wisdom, honoring the
              harmony between man and nature. Every drop is a ritual. Every
              scent, a story.
            </p>

            <div className="mt-10 space-y-5">
              <Note title="Top Notes" value="Bergamot, Sichuan Pepper, Ozone" />
              <Note
                title="Heart Notes"
                value="Jasmine, Violet Leaf, Cedarwood"
              />
              <Note title="Base Notes" value="Ambergris, Musk, Vetiver" />
            </div>
          </motion.div>
        </div>

        <div className="relative min-h-[560px] overflow-hidden border-t border-[#c8a35f]/10 lg:border-l lg:border-t-0">
          <Image
            src="/assets/kaminari_pack.png"
            alt="Orochi craft"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#030201]/20 to-[#030201]/80" />

          <div className="absolute right-0 top-0 h-full w-full max-w-[300px] border-l border-[#c8a35f]/10 bg-black/55 p-8 backdrop-blur-xs">
            <div className="flex h-full flex-col justify-center gap-8">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#c8a35f]">
                    {label}
                  </p>
                  <p className="mt-2 text-sm text-[#f8efe0]/62">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Note({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.28em] text-[#c8a35f]">
        {title}
      </p>
      <p className="mt-1 text-sm text-[#f8efe0]/58">{value}</p>
    </div>
  );
}
