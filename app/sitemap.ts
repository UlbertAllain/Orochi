import type { MetadataRoute } from "next";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";

const baseUrl = "https://orochiperfumery.vercel.app";

type SitemapDoc = {
  slug?: string;
  isVisible?: boolean;
  isLocked?: boolean;
  updatedAt?: {
    toDate?: () => Date;
  };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const [seriesSnap, productsSnap] = await Promise.all([
    adminDb.collection(COLLECTIONS.SERIES).get(),
    adminDb.collection(COLLECTIONS.PRODUCTS).get(),
  ]);

  const seriesRoutes: MetadataRoute.Sitemap = seriesSnap.docs
    .map((doc) => doc.data() as SitemapDoc)
    .filter((item) => item.isVisible && item.slug)
    .map((item) => ({
      url: `${baseUrl}/series/${item.slug}`,
      lastModified: item.updatedAt?.toDate?.() ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  const productRoutes: MetadataRoute.Sitemap = productsSnap.docs
    .map((doc) => doc.data() as SitemapDoc)
    .filter((item) => item.isVisible && !item.isLocked && item.slug)
    .map((item) => ({
      url: `${baseUrl}/produk/${item.slug}`,
      lastModified: item.updatedAt?.toDate?.() ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...seriesRoutes, ...productRoutes];
}
