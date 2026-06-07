"use client";

import { motion } from "framer-motion";

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#c8a35f]/10 px-6 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(200,163,95,0.08),transparent_40%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.65 }}
        >
          <p className="text-xs uppercase tracking-[0.5em] text-[#c8a35f]">
            Stay Connected
          </p>

          <h2 className="mt-5 font-serif text-5xl uppercase leading-[0.95] tracking-[-0.05em] text-[#fff7ea] md:text-7xl">
            New Scents.
            <br />
            Rituals.
            <br />
            Legends.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="rounded-[2rem] border border-[#c8a35f]/16 bg-[#070504] p-6 md:p-8"
        >
          <p className="text-sm leading-8 text-[#f8efe0]/55">
            Receive early access to future Orochi chapters, sealed variant
            reveals, and limited fragrance releases.
          </p>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="min-h-12 flex-1 rounded-full border border-[#c8a35f]/16 bg-black/25 px-5 text-sm text-[#f8efe0] outline-none placeholder:text-[#f8efe0]/32 focus:border-[#c8a35f]/45"
            />

            <button
              type="submit"
              className="min-h-12 rounded-full bg-[#c8a35f] px-7 text-xs font-bold uppercase tracking-[0.22em] text-black transition hover:bg-[#e1bd75]"
            >
              Join
            </button>
          </form>

          <p className="mt-4 text-xs leading-6 text-[#f8efe0]/35">
            No spam. Only chapter updates, product releases, and ritual notes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
