import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/cormorant-garamond/wght.css";

const siteUrl = "https://orochiperfumery.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Orochi Perfumery | Fragrance Sealed In Myth",
    template: "%s | Orochi Perfumery",
  },

  description:
    "Orochi Perfumery adalah brand parfum niche Indonesia yang terinspirasi dari elemen, suasana, dan mitologi Jepang.",

  keywords: [
    "Orochi Perfumery",
    "Orochi Perfumes",
    "Orochi perfume",
    "Orochi parfum",
    "parfum niche Indonesia",
    "parfum Jepang",
    "parfum mitologi Jepang",
    "parfum aesthetic",
    "parfum lokal premium",
    "Kaminari perfume",
    "Kaen perfume",
    "Suigetsu perfume",
  ],

  authors: [{ name: "Orochi Perfumery" }],
  creator: "Orochi Perfumery",
  publisher: "Orochi Perfumery",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Orochi Perfumery",
    title: "Orochi Perfumery | Fragrance Sealed In Myth",
    description:
      "Brand parfum niche Indonesia terinspirasi elemen, suasana, dan mitologi Jepang.",
    images: [
      {
        url: "/assets/og/orochi-og.png",
        width: 1200,
        height: 630,
        alt: "Orochi Perfumery",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Orochi Perfumery | Fragrance Sealed In Myth",
    description:
      "Brand parfum niche Indonesia terinspirasi elemen, suasana, dan mitologi Jepang.",
    images: ["/assets/og/orochi-og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/assets/title.png",
    shortcut: "/assets/title.png",
    apple: "/assets/title.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
