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
    "Orochi Perfumery adalah brand parfum niche Indonesia yang terinspirasi elemen, mitologi, dan estetika Jepang.",

  verification: {
    google: "14CtT8QLP2STOD4_zwrFYOpl5oOc1CT3mUnHVHNATHA",
  },

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
      "Brand parfum niche Indonesia terinspirasi elemen, mitologi, dan estetika Jepang.",
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
      "Brand parfum niche Indonesia terinspirasi elemen, mitologi, dan estetika Jepang.",
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
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Orochi Perfumery",
    url: siteUrl,
    logo: `${siteUrl}/assets/title.png`,
    sameAs: [
      "https://www.instagram.com/orochi.fragrance?igsh=bW1qMjVuMnNncWE3",
      "https://shopee.co.id/",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Orochi Perfumery",
    url: siteUrl,
    description:
      "Brand parfum niche Indonesia terinspirasi elemen, mitologi, dan estetika Jepang.",
  };

  return (
    <html lang="id" className="antialiased">
      <body className="overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        {children}
      </body>
    </html>
  );
}
