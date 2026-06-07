"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import type { Series } from "@/types/series";

type Props = {
  seriesList: Series[];
  productsBySeries: Map<string, Product[]>;
};

function getSeriesMeta(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("godai")) {
    return {
      icon: "五",
      desc: "The five elements. Five forces of nature.",
    };
  }

  if (lower.includes("keshiki")) {
    return {
      icon: "景",
      desc: "Scents inspired by Japan's hidden landscapes.",
    };
  }

  if (lower.includes("kami")) {
    return {
      icon: "神",
      desc: "Honoring the spirits that watch over all.",
    };
  }

  return {
    icon: "蛇",
    desc: "A sealed chapter from the world of Orochi.",
  };
}

export function CollectionsSection({ seriesList }: Props) {
  return (
    <section id="world" className="border-b border-[#c8a35f]/10 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-6">
          <div className="h-px flex-1 bg-[#c8a35f]/25" />
          <p className="text-xs uppercase tracking-[0.45em] text-[#c8a35f]">
            Our Collections
          </p>
          <div className="h-px flex-1 bg-[#c8a35f]/25" />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {seriesList.map((series) => {
            const meta = getSeriesMeta(series.name);

            return (
              <Link
                key={series.id}
                href={`/series/${series.slug}`}
                className="group relative min-h-[260px] overflow-hidden rounded-[1.5rem] border border-[#c8a35f]/20 bg-[#070504] p-8 transition hover:-translate-y-1 hover:border-[#c8a35f]/55"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(200,163,95,0.14),transparent_55%)]" />
                <div className="absolute right-8 top-6 font-serif text-8xl text-[#c8a35f]/10">
                  {meta.icon}
                </div>

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c8a35f]/25 text-[#c8a35f]">
                      {meta.icon}
                    </div>

                    <h3 className="mt-10 font-serif text-4xl uppercase text-[#fff7ea]">
                      {series.name}
                    </h3>

                    <p className="mt-4 max-w-xs text-sm leading-7 text-[#f8efe0]/55">
                      {meta.desc}
                    </p>
                  </div>

                  <p className="mt-8 text-xs uppercase tracking-[0.24em] text-[#c8a35f]">
                    Explore →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
