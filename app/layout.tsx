import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/cormorant-garamond/wght.css";

export const metadata: Metadata = {
  title: {
    default: "Orochi Perfumes",
    template: "%s | Orochi Perfumes",
  },
  description:
    "Orochi Perfumes adalah katalog parfum berbasis series dengan tema elemen, suasana, dan mitologi.",
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
