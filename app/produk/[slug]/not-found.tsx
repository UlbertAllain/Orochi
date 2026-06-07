import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/35">
          Orochi Perfumes
        </p>

        <h1 className="mt-4 text-4xl font-semibold">Produk tidak tersedia</h1>

        <p className="mt-3 text-sm text-white/50">
          Produk ini belum dirilis atau tidak ditemukan.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
        >
          Kembali
        </Link>
      </div>
    </main>
  );
}
