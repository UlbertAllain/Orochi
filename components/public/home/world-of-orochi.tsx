// "use client";

// import useEmblaCarousel from "embla-carousel-react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import type { Product } from "@/types/product";
// import type { Series } from "@/types/series";

// type Props = {
//   seriesList: Series[];
//   productsBySeries: Map<string, Product[]>;
// };

// function getSeriesTone(name: string, index: number) {
//   const lower = name.toLowerCase();

//   if (lower.includes("godai")) {
//     return {
//       chapter: "Chapter 01",
//       label: "Elemental Origin",
//       symbol: "五",
//       tagline: "The beginning of Orochi, born from primal elements.",
//       gradient: "from-[#c8a35f]/18 via-transparent to-[#5b3a17]/20",
//     };
//   }

//   if (lower.includes("keshiki")) {
//     return {
//       chapter: "Chapter 02",
//       label: "Landscape Memory",
//       symbol: "景",
//       tagline: "A series shaped by rain, night, flowers, and passing moments.",
//       gradient: "from-[#8aa0a8]/16 via-transparent to-[#1b2a2e]/22",
//     };
//   }

//   if (lower.includes("kami")) {
//     return {
//       chapter: "Chapter 03",
//       label: "Divine Myth",
//       symbol: "神",
//       tagline: "Fragrance inspired by deities, rituals, and sacred presence.",
//       gradient: "from-[#c8a35f]/16 via-transparent to-[#2b1b0c]/24",
//     };
//   }

//   return {
//     chapter: `Chapter ${String(index + 1).padStart(2, "0")}`,
//     label: "Orochi Chapter",
//     symbol: "蛇",
//     tagline: "A sealed world waiting to be awakened.",
//     gradient: "from-[#c8a35f]/14 via-transparent to-[#111]/20",
//   };
// }

// export function WorldOfOrochi({ seriesList, productsBySeries }: Props) {
//   const [emblaRef, emblaApi] = useEmblaCarousel({
//     align: "start",
//     loop: false,
//   });

//   return (
//     <section
//       id="world"
//       className="relative overflow-hidden border-y border-[#c8a35f]/10 py-28"
//     >
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(200,163,95,0.08),transparent_40%)]" />

//       <div className="relative mx-auto max-w-7xl px-6">
//         <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
//           <div>
//             <p className="text-xs uppercase tracking-[0.5em] text-[#c8a35f]">
//               The World
//             </p>

//             <h2 className="mt-4 font-serif text-5xl uppercase tracking-[-0.05em] text-[#fff7ea] md:text-7xl">
//               Of Orochi
//             </h2>

//             <p className="mt-5 max-w-xl text-sm leading-8 text-[#f8efe0]/52">
//               Setiap series adalah chapter. Bukan kategori produk, tapi dunia
//               kecil dengan atmosfer, elemen, dan mitologi yang berbeda.
//             </p>
//           </div>

//           <div className="flex gap-3">
//             <button
//               onClick={() => emblaApi?.scrollPrev()}
//               className="h-11 w-11 rounded-full border border-[#c8a35f]/25 text-[#c8a35f] transition hover:bg-[#c8a35f] hover:text-black"
//               aria-label="Previous series"
//             >
//               ←
//             </button>

//             <button
//               onClick={() => emblaApi?.scrollNext()}
//               className="h-11 w-11 rounded-full border border-[#c8a35f]/25 text-[#c8a35f] transition hover:bg-[#c8a35f] hover:text-black"
//               aria-label="Next series"
//             >
//               →
//             </button>
//           </div>
//         </div>

//         <div ref={emblaRef} className="mt-14 overflow-hidden">
//           <div className="flex gap-5">
//             {seriesList.map((series, index) => {
//               const products = productsBySeries.get(series.id) ?? [];
//               const tone = getSeriesTone(series.name, index);

//               return (
//                 <motion.div
//                   key={series.id}
//                   initial={{ opacity: 0, y: 24 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-80px" }}
//                   transition={{ duration: 0.55, delay: index * 0.08 }}
//                   className="min-w-0 flex-[0_0_90%] md:flex-[0_0_58%] lg:flex-[0_0_42%]"
//                 >
//                   <Link
//                     href={`/series/${series.slug}`}
//                     className="group relative block min-h-[440px] overflow-hidden rounded-[2.4rem] border border-[#c8a35f]/12 bg-[#070504] p-8 transition hover:-translate-y-1 hover:border-[#c8a35f]/45"
//                   >
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-br ${tone.gradient}`}
//                     />

//                     <div className="absolute right-8 top-8 font-serif text-[9rem] leading-none text-[#c8a35f]/[0.07] transition group-hover:text-[#c8a35f]/[0.12]">
//                       {tone.symbol}
//                     </div>

//                     <div className="relative flex min-h-[376px] flex-col justify-between">
//                       <div>
//                         <div className="flex items-center justify-between gap-4">
//                           <p className="text-[10px] uppercase tracking-[0.32em] text-[#c8a35f]/70">
//                             {tone.chapter}
//                           </p>

//                           <p className="text-[10px] uppercase tracking-[0.24em] text-[#f8efe0]/30">
//                             {products.length} variants
//                           </p>
//                         </div>

//                         <p className="mt-8 text-[10px] uppercase tracking-[0.32em] text-[#c8a35f]/70">
//                           {tone.label}
//                         </p>

//                         <h3 className="mt-4 font-serif text-5xl leading-none text-[#fff7ea]">
//                           {series.name}
//                         </h3>

//                         <p className="mt-5 max-w-sm text-sm leading-7 text-[#f8efe0]/52">
//                           {tone.tagline}
//                         </p>

//                         <p className="mt-5 max-w-sm text-xs leading-6 text-[#f8efe0]/36">
//                           {series.description}
//                         </p>
//                       </div>

//                       <div>
//                         <div className="flex flex-wrap gap-2">
//                           {products.slice(0, 6).map((product) => (
//                             <span
//                               key={product.id}
//                               className="rounded-full border border-[#c8a35f]/14 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#f8efe0]/45"
//                             >
//                               {product.isLocked ? "???" : product.name}
//                             </span>
//                           ))}
//                         </div>

//                         <div className="mt-8 flex items-center justify-between border-t border-[#c8a35f]/10 pt-5">
//                           <span className="text-xs uppercase tracking-[0.22em] text-[#f8efe0]/34">
//                             Enter Chapter
//                           </span>

//                           <span className="text-xs uppercase tracking-[0.22em] text-[#c8a35f]">
//                             Explore →
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
