"use client";

import { useEffect, useMemo, useState } from "react";
import { BrandPhilosophyBanner } from "@/components/public/home/brand-philosophy-banner";
import { CollectionsSection } from "@/components/public/home/collections-section";
import { CraftSection } from "@/components/public/home/craft-section";
import { GodaiVariantsSection } from "@/components/public/home/godai-variants-section";
import { HeroSection } from "@/components/public/home/hero-section";
import { NewsletterSection } from "@/components/public/home/newsletter-section";
import { SiteFooter } from "@/components/public/home/site-footer";
import { getVisibleProducts } from "@/services/product-service";
import { getVisibleSeries } from "@/services/series-service";
import type { Product } from "@/types/product";
import type { Series } from "@/types/series";

export default function HomePage() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const [seriesData, productData] = await Promise.all([
        getVisibleSeries(),
        getVisibleProducts(),
      ]);

      setSeriesList(seriesData);
      setProducts(productData);
      setLoading(false);
    }

    loadData();
  }, []);

  const mainSeries = useMemo(() => {
    return seriesList.find((series) => series.isMain) ?? seriesList[0] ?? null;
  }, [seriesList]);

  const productsBySeries = useMemo(() => {
    const map = new Map<string, Product[]>();

    for (const product of products) {
      const current = map.get(product.seriesId) ?? [];
      current.push(product);
      map.set(product.seriesId, current);
    }

    return map;
  }, [products]);

  const mainProducts = mainSeries
    ? (productsBySeries.get(mainSeries.id) ?? [])
    : [];

  const heroProduct =
    mainProducts.find((product) =>
      product.slug?.toLowerCase().includes("kaminari"),
    ) ??
    mainProducts.find((product) => !product.isLocked) ??
    null;

  return (
    <main className="min-h-screen overflow-hidden bg-[#030201] text-[#f8efe0]">
      <HeroSection
        mainSeries={mainSeries}
        heroProduct={heroProduct}
        loading={loading}
      />

      <GodaiVariantsSection
        series={mainSeries}
        products={mainProducts}
        loading={loading}
      />

      <CraftSection />

      <CollectionsSection
        seriesList={seriesList}
        productsBySeries={productsBySeries}
      />

      <BrandPhilosophyBanner />

      <NewsletterSection />

      <SiteFooter seriesList={seriesList} />
    </main>
  );
}
