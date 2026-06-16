export function AboutOrochiSection() {
  return (
    <section className="relative overflow-hidden border-t border-[#c8a35f]/10 bg-[#030201] py-28">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(200,163,95,0.08),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(200,163,95,0.05),transparent_35%)]" />

      {/* Watermark */}
      <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[18rem] leading-none text-[#c8a35f]/[0.03] lg:block">
        五大
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          <p className="text-[10px] uppercase tracking-[0.6em] text-[#c8a35f]">
            The Orochi Philosophy
          </p>

          <h2 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.9] tracking-[-0.04em] text-[#fff7ea] sm:text-6xl lg:text-7xl">
            More Than Fragrance.
            <br />A Myth Sealed In Every Bottle.
          </h2>

          <p className="mt-8 max-w-3xl text-base leading-8 text-[#f8efe0]/65">
            Orochi Perfumery adalah brand parfum niche Indonesia yang
            terinspirasi oleh filosofi Jepang, elemen alam, dan kisah-kisah
            mitologi yang hidup melampaui waktu. Setiap koleksi dirancang bukan
            hanya untuk menghadirkan aroma, tetapi untuk menyampaikan karakter,
            suasana, dan identitas yang dapat dikenakan.
          </p>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 h-px w-20 bg-[#c8a35f]/40" />

            <p className="text-sm leading-8 text-[#f8efe0]/60">
              Melalui seri Godai, Orochi menerjemahkan filosofi lima elemen
              Jepang ke dalam dunia wewangian modern. Air, api, angin, petir,
              dan bulan diwujudkan menjadi aroma dengan karakter yang berbeda,
              menciptakan pengalaman yang lebih personal dibanding parfum
              komersial pada umumnya.
            </p>

            <p className="mt-6 text-sm leading-8 text-[#f8efe0]/60">
              Setiap parfum dikembangkan sebagai sebuah chapter yang berdiri
              sendiri. Dari ketenangan Tsuki, energi Kaminari, intensitas Kaen,
              hingga kesegaran Suigetsu, setiap botol membawa cerita dan emosi
              yang berbeda bagi pemakainya.
            </p>
          </div>

          <div>
            <div className="mb-6 h-px w-20 bg-[#c8a35f]/40" />

            <p className="text-sm leading-8 text-[#f8efe0]/60">
              Bagi kami, parfum bukan sekadar produk. Parfum adalah artefak yang
              menyimpan memori, suasana, dan identitas. Karena itu setiap detail
              Orochi dirancang dengan pendekatan yang sama seperti membangun
              sebuah dunia: mulai dari konsep, nama, simbol, hingga karakter
              aroma yang berada di dalamnya.
            </p>

            <p className="mt-6 text-sm leading-8 text-[#f8efe0]/60">
              Dengan memadukan estetika Jepang, seni peracikan modern, dan
              storytelling yang kuat, Orochi menghadirkan pengalaman parfum yang
              lebih personal, imajinatif, dan berkarakter.
            </p>
          </div>
        </div>

        {/* Bottom Highlights */}
        <div className="mt-20 grid grid-cols-2 gap-4 border-t border-[#c8a35f]/10 pt-10 md:grid-cols-4">
          <div>
            <p className="font-serif text-3xl text-[#c8a35f]">05</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[#f8efe0]/40">
              Elements
            </p>
          </div>

          <div>
            <p className="font-serif text-3xl text-[#c8a35f]">04</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[#f8efe0]/40">
              Released
            </p>
          </div>

          <div>
            <p className="font-serif text-3xl text-[#c8a35f]">JP</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[#f8efe0]/40">
              Inspired
            </p>
          </div>

          <div>
            <p className="font-serif text-3xl text-[#c8a35f]">∞</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[#f8efe0]/40">
              Stories
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
