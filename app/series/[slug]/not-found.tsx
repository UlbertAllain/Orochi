import Link from "next/link";

export default function SeriesNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Series tidak ditemukan</h1>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-black"
        >
          Kembali
        </Link>
      </div>
    </main>
  );
}
