"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "Long Lasting",
    value: "6–8 Hours",
    description:
      "Dirancang untuk bertahan sepanjang aktivitas tanpa kehilangan karakter aroma utamanya.",
  },
  {
    title: "Eau de Parfum",
    value: "High Concentration",
    description:
      "Konsentrasi racikan dari fragrance oil yang lebih tinggi untuk aroma yang lebih kaya, bervariasi, dan tahan lama.",
  },
  {
    title: "Japanese Inspired",
    value: "Myth & Elements",
    description:
      "Setiap varian lahir dari elemen, legenda, dan suasana yang terinspirasi dari budaya Jepang.",
  },
  {
    title: "Affordable Luxury",
    value: "Rp55.000",
    description:
      "Karakter premium tanpa harga berlebihan. Dibuat agar dapat dinikmati oleh lebih banyak orang.",
  },
];

export function WhyOrochiSection() {
  return (
    <section className="relative overflow-hidden border-y border-[#c8a35f]/10 px-6 py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,163,95,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.55em] text-[#c8a35f]">
            Why Orochi
          </p>

          <h2 className="mt-5 font-serif text-5xl uppercase tracking-[-0.05em] text-[#fff7ea] md:text-7xl">
            Crafted For
            <br />
            Everyday Legends
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-[#f8efe0]/50">
            Perpaduan antara karakter aroma yang kuat, identitas visual yang
            unik, dan inspirasi dari mitologi Jepang menjadikan Orochi lebih
            dari sekadar parfum harian.
          </p>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="rounded-[2rem] border border-[#c8a35f]/12 bg-[#070504] p-6"
            >
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#c8a35f]/70">
                {item.title}
              </p>

              <h3 className="mt-4 font-serif text-3xl text-[#fff7ea]">
                {item.value}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#f8efe0]/48">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
