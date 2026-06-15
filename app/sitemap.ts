import type { MetadataRoute } from "next";
import { getAllProducts } from "@/services/product-service";
import { getAllSeries } from "@/services/series-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://orochiperfumery.vercel.app";

  const [products, series] = await Promise.all([
    getAllProducts(),
    getAllSeries(),
  ]);

  const productUrls: MetadataRoute.Sitemap = products
    .filter((product) => product.isVisible)
    .map((product) => ({
      url: `${baseUrl}/produk/${product.slug}`,
      lastModified: product.updatedAt?.toDate?.() ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const seriesUrls: MetadataRoute.Sitemap = series
    .filter((item) => item.isVisible)
    .map((item) => ({
      url: `${baseUrl}/series/${item.slug}`,
      lastModified: item.updatedAt?.toDate?.() ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    ...seriesUrls,
    ...productUrls,
  ];
}
