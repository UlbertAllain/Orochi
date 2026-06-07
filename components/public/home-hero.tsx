type HomeHeroProps = {
  showOtherSeries: boolean;
  onToggleOtherSeries: () => void;
};

export function HomeHero({
  showOtherSeries,
  onToggleOtherSeries,
}: HomeHeroProps) {
  return (
    <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.14),transparent_42%)]" />
      <div className="absolute right-10 top-32 -z-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 -z-10 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <div className="max-w-5xl">
        <p className="text-xs uppercase tracking-[0.55em] text-white/35">
          Orochi Perfumes
        </p>

        <h1 className="mt-7 text-6xl font-semibold tracking-[-0.07em] md:text-8xl lg:text-9xl">
          Fragrance sealed in myth.
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
          Orochi bukan sekadar parfum tunggal. Setiap series membawa elemen,
          suasana, dan mitologi yang berbeda.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#godai"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Lihat Godai Series
          </a>

          <button
            onClick={onToggleOtherSeries}
            className="rounded-full border border-white/10 px-7 py-3 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
          >
            {showOtherSeries ? "Sembunyikan Series Lain" : "Lihat Series Lain"}
          </button>
        </div>
      </div>
    </section>
  );
}