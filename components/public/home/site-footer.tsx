import Link from "next/link";
import type { Series } from "@/types/series";

export function SiteFooter({ seriesList }: { seriesList: Series[] }) {
  return (
    <footer className="relative overflow-hidden border-t border-[#c8a35f]/10 px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,163,95,0.06),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <h2 className="font-serif text-4xl tracking-[0.28em] text-[#fff7ea]">
              OROCHI
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-8 text-[#f8efe0]/48">
              Fragrance sealed in myth. Dibangun dari elemen, suasana, simbol,
              dan legenda yang hidup di dalam aroma.
            </p>

            <p className="mt-8 text-[10px] uppercase tracking-[0.28em] text-[#c8a35f]/60">
              Luxury Fragrance Concept
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8a35f]/70">
              Navigation
            </p>

            <div className="mt-5 space-y-3 text-sm text-[#f8efe0]/50">
              <a
                href="#godai"
                className="block transition hover:text-[#c8a35f]"
              >
                Godai
              </a>
              <a
                href="#world"
                className="block transition hover:text-[#c8a35f]"
              >
                World Of Orochi
              </a>
              <a
                href="#philosophy"
                className="block transition hover:text-[#c8a35f]"
              >
                Philosophy
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8a35f]/70">
              Series
            </p>

            <div className="mt-5 space-y-3 text-sm text-[#f8efe0]/50">
              {seriesList.map((series) => (
                <Link
                  key={series.id}
                  href={`/series/${series.slug}`}
                  className="block transition hover:text-[#c8a35f]"
                >
                  {series.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-[#c8a35f]/10 pt-7 text-[10px] uppercase tracking-[0.26em] text-[#f8efe0]/30 md:flex-row">
          <p>© 2026 Orochi Perfumes</p>
          <p>Designed as a mythic fragrance universe</p>
        </div>
      </div>
    </footer>
  );
}
