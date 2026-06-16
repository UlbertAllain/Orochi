"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const chapters = [
  {
    title: "The Awakening",
    year: "Chapter I",
    description:
      "Semuanya berawal dari sebuah pertanyaan sederhana: bagaimana jika aroma dapat membawa seseorang ke tempat, suasana, dan kenangan yang berbeda? Dari sanalah dunia Orochi mulai dibentuk.",
  },
  {
    title: "The Elements",
    year: "Chapter II",
    description:
      "Alam menjadi bahasa pertama kami. Petir, hujan, api, angin, dan cahaya bulan diterjemahkan menjadi karakter aroma yang hidup, masing-masing dengan kepribadian dan emosinya sendiri.",
  },
  {
    title: "The Stories",
    year: "Chapter III",
    description:
      "Di balik setiap botol terdapat sebuah chapter. Tsuki membawa ketenangan malam, Kaminari menghadirkan energi yang berani, sementara aroma lainnya menyimpan kisah yang menunggu untuk ditemukan.",
  },
  {
    title: "The Journey",
    year: "Chapter IV",
    description:
      "Orochi tidak dibangun untuk selesai dalam satu koleksi. Akan selalu ada cerita baru, elemen baru, dan chapter baru yang menunggu untuk dibuka di masa depan.",
  },
];

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative overflow-hidden border-y border-[#c8a35f]/10"
    >
      <Image
        src="/assets/philosophy/philosophy-bg.png"
        alt="Orochi Chronicle background"
        fill
        className="object-cover opacity-100"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#030201] via-[#030201]/72 to-[#030201]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(200,163,95,0.14),transparent_42%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.55em] text-[#c8a35f]">
            The Orochi Chronicle
          </p>

          <h2 className="mt-6 font-serif text-6xl uppercase leading-[0.9] tracking-[-0.06em] text-[#fff7ea] md:text-8xl">
            A Story
            <br />
            Still Unfolding
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-[#f8efe0]/58">
            Setiap aroma, series, dan chapter merupakan bagian dari dunia yang
            terus berkembang. Orochi bukan sekadar koleksi parfum, tetapi sebuah
            perjalanan yang terus ditulis.
          </p>
        </motion.div>

        <div className="relative mt-24">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#c8a35f]/30 to-transparent md:block" />

          <div className="space-y-20">
            {chapters.map((chapter, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={chapter.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute left-1/2 top-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border border-[#c8a35f]/50 bg-[#030201] shadow-[0_0_20px_rgba(200,163,95,0.35)] md:block" />

                  <div
                    className={`grid md:grid-cols-2 ${
                      isLeft ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    <div
                      className={`rounded-[1.5rem] border border-[#c8a35f]/10 bg-black/28 p-6 backdrop-blur-sm ${
                        isLeft
                          ? "md:mr-16 md:text-right"
                          : "md:ml-16 md:text-left"
                      }`}
                    >
                      <p className="text-[10px] uppercase tracking-[0.35em] text-[#c8a35f]/75">
                        {chapter.year}
                      </p>

                      <h3 className="mt-4 font-serif text-4xl text-[#fff7ea] md:text-5xl">
                        {chapter.title}
                      </h3>

                      <p className="mt-5 text-sm leading-8 text-[#f8efe0]/52">
                        {chapter.description}
                      </p>
                    </div>

                    <div />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
