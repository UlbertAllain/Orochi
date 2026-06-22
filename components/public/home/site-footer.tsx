import Link from "next/link";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/",
  },
  {
    label: "Shopee",
    href: "https://shopee.co.id/",
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#c8a35f]/10 px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(200,163,95,0.07),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <h2 className="font-serif text-4xl tracking-[0.28em] text-[#fff7ea]">
              OROCHI
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-8 text-[#f8efe0]/48">
              Fragrance sealed in myth. Dibangun dari elemen, suasana, simbol,
              dan legenda yang hidup di dalam aroma.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#c8a35f]/14 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-[#f8efe0]/45 transition hover:border-[#c8a35f]/55 hover:text-[#c8a35f]"
                >
                  {item.label}
                </a>
              ))}
            </div>

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
                href="#philosophy"
                className="block transition hover:text-[#c8a35f]"
              >
                Chronicle
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8a35f]/70">
              Series
            </p>

            <div className="mt-5 space-y-3 text-sm text-[#f8efe0]/50">
              <Link
                href="/series/godai"
                className="block transition hover:text-[#c8a35f]"
              >
                Godai Series
              </Link>

              <span className="block text-[#f8efe0]/25">
                Keshiki Series — Coming Soon
              </span>

              <span className="block text-[#f8efe0]/25">
                Kami Series — Coming Soon
              </span>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[#c8a35f]/10 bg-[#070504] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c8a35f]/70">
              Official Store
            </p>

            <p className="mt-5 text-sm leading-7 text-[#f8efe0]/48">
              Temukan produk Orochi melalui official marketplace dan channel
              sosial resmi.
            </p>

            <a
              href="https://shopee.co.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-[#c8a35f] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black transition hover:bg-[#e1bd75]"
            >
              Visit Shopee →
            </a>
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
