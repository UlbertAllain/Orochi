"use client";

import { motion } from "framer-motion";

export function BrandPhilosophyBanner() {
  return (
    <section
      id="philosophy"
      className="relative overflow-hidden border-b border-[#c8a35f]/10 px-6 py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(200,163,95,0.1),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[2rem] border border-[#c8a35f]/20 bg-[#070504] px-6 py-20 text-center md:px-14"
        >
          <p className="text-xs uppercase tracking-[0.55em] text-[#c8a35f]">
            Philosophy
          </p>

          <h2 className="mx-auto mt-6 max-w-5xl font-serif text-6xl uppercase leading-[0.88] tracking-[-0.06em] text-[#fff7ea] md:text-8xl">
            Where Nature
            <br />
            Becomes Legend
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-[#f8efe0]/55">
            Orochi is born where elemental forces meet ancient myth. Each scent
            is crafted as a ritual — a bridge between memory, atmosphere, and
            identity.
          </p>

          <div className="mx-auto mt-12 grid max-w-3xl gap-5 md:grid-cols-3">
            {[
              ["Nature", "Elements as the origin."],
              ["Myth", "Stories sealed in scent."],
              ["Ritual", "Fragrance as identity."],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-[1.25rem] border border-[#c8a35f]/12 bg-black/20 p-5"
              >
                <p className="font-serif text-3xl text-[#c8a35f]">✦</p>
                <h3 className="mt-3 font-serif text-2xl text-[#fff7ea]">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-[#f8efe0]/45">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
