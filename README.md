# Orochi — Brand Website & Product Management

Website brand parfum Orochi dengan katalog publik berbasis data serta halaman administrasi produk dan seri. Berbeda dari showcase statis `Orochi-Perfumes`, repository ini memuat service data, autentikasi admin, dan upload media.

## Area sistem

- Website publik: hero, seri utama, katalog, packaging, profil brand, dan produk yang akan datang.
- Admin: pengelolaan produk/seri, image upload, dan akses terproteksi.
- Backend terintegrasi dengan Firebase serta Cloudinary.

Homepage mengambil produk dan seri dari `services/product-service.ts` dan `services/series-service.ts`, lalu mengelompokkannya berdasarkan `seriesId`.

## Stack

Next.js, React, TypeScript, Firebase, Firebase Admin SDK, Cloudinary, Framer Motion, dan font lokal.

## Local setup

```bash
npm install
npm run dev
```

Sebelum membuka halaman yang memerlukan data, lengkapi konfigurasi Firebase dan Cloudinary sesuai modul `lib/firebase/` dan `lib/cloudinary.ts`.

## Struktur

```text
app/                 Public/admin routes dan metadata
components/public/   Website brand dan katalog
components/admin/    Form dan shell administrasi
services/            Query dan operasi produk/seri
lib/firebase/        Firebase client/server
lib/cloudinary.ts    Media integration
scripts/             Seed dan maintenance tools
types/               Entity contracts
```

## Validasi

```bash
npm run build
```

Periksa kompatibilitas skrip `lint` di `package.json` sebelum menggunakannya sebagai quality gate. Script seed dan upload memerlukan kredensial environment yang tepat; jangan jalankan terhadap data produksi tanpa backup dan review perubahan.
