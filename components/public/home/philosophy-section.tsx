"use client";

import { motion } from "framer-motion";

const chapters = [
  {
    title: "The Awakening",
    year: "Chapter I",
    description:
      "Dunia Orochi dimulai dari sebuah gagasan sederhana. Bahwa aroma bukan hanya wangi, tetapi sebuah pengalaman yang mampu membangkitkan suasana, kenangan, dan identitas.",
  },
  {
    title: "The Elements",
    year: "Chapter II",
    description:
      "Godai menjadi fondasi pertama. Petir, air, api, dan elemen lainnya diterjemahkan menjadi karakter yang dapat dikenakan melalui aroma.",
  },
  {
    title: "The Myth",
    year: "Chapter III",
    description:
      "Setiap series membawa simbol, cerita, dan atmosfer yang berbeda. Bukan sekadar produk, melainkan chapter yang memperluas dunia Orochi.",
  },
  {
    title: "The Future",
    year: "Chapter IV",
    description:
      "Masih ada varian yang tersegel. Masih ada chapter yang belum dibuka. Perjalanan Orochi baru saja dimulai.",
  },
];

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative overflow-hidden border-y border-[#c8a35f]/10 px-6 py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,163,95,0.06),transparent_40%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.55em] text-[#c8a35f]">
            The Orochi Chronicle
          </p>

          <h2 className="mt-6 font-serif text-6xl uppercase tracking-[-0.06em] text-[#fff7ea] md:text-8xl">
            A Story
            <br />
            Still Unfolding
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-[#f8efe0]/50">
            Setiap aroma, series, dan chapter merupakan bagian dari dunia yang
            terus berkembang. Orochi bukan sekadar koleksi parfum, tetapi sebuah
            perjalanan yang terus ditulis.
          </p>
        </div>

        <div className="relative mt-24">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#c8a35f]/25 to-transparent md:block" />

          <div className="space-y-24">
            {chapters.map((chapter, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={chapter.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute left-1/2 top-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border border-[#c8a35f]/40 bg-[#030201] md:block" />

                  <div
                    className={`grid md:grid-cols-2 ${
                      isLeft ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    <div
                      className={`${
                        isLeft
                          ? "md:pr-20 md:text-right"
                          : "md:pl-20 md:text-left"
                      }`}
                    >
                      <p className="text-[10px] uppercase tracking-[0.35em] text-[#c8a35f]/75">
                        {chapter.year}
                      </p>

                      <h3 className="mt-4 font-serif text-4xl text-[#fff7ea] md:text-5xl">
                        {chapter.title}
                      </h3>

                      <p className="mt-5 text-sm leading-8 text-[#f8efe0]/48">
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
