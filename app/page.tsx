import { AboutOrochiSection } from "@/components/public/home/about-orochi-section";
import { ComingSoonSection } from "@/components/public/home/coming-soon-section";
import { GodaiShowcase } from "@/components/public/home/godai-showcase";
import { HeroSection } from "@/components/public/home/hero-section";
import { PackagingShowcase } from "@/components/public/home/packaging-showcase";
import { PhilosophySection } from "@/components/public/home/philosophy-section";
import { SiteFooter } from "@/components/public/home/site-footer";
import { WhyOrochiSection } from "@/components/public/home/why-orochi-section";
import { getVisibleProducts } from "@/services/product-service";
import { getVisibleSeries } from "@/services/series-service";
import type { Product } from "@/types/product";
import type { Series } from "@/types/series";

function toPlainValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function groupProductsBySeries(products: Product[]) {
  const map = new Map<string, Product[]>();

  for (const product of products) {
    const current = map.get(product.seriesId) ?? [];
    current.push(product);
    map.set(product.seriesId, current);
  }

  return map;
}

export default async function HomePage() {
  const [seriesData, productData] = await Promise.all([
    getVisibleSeries(),
    getVisibleProducts(),
  ]);

  const seriesList = toPlainValue<Series[]>(seriesData);
  const products = toPlainValue<Product[]>(productData);

  const mainSeries =
    seriesList.find((series) => series.isMain) ?? seriesList[0] ?? null;

  const productsBySeries = groupProductsBySeries(products);

  const mainProducts = mainSeries
    ? (productsBySeries.get(mainSeries.id) ?? [])
    : [];

  const heroProduct =
    mainProducts.find((product) => !product.isLocked && product.imageUrl) ??
    mainProducts.find((product) => !product.isLocked) ??
    null;

  const lockedProducts = products.filter((item) => item.isLocked);

  return (
    <main className="min-h-screen overflow-hidden bg-[#030201] text-[#f8efe0]">
      <HeroSection
        mainSeries={mainSeries}
        heroProduct={heroProduct}
        loading={false}
      />

      <PackagingShowcase />

      <GodaiShowcase
        series={mainSeries}
        products={mainProducts}
        loading={false}
      />

      <WhyOrochiSection />

      <AboutOrochiSection />

      <PhilosophySection />

      <ComingSoonSection products={lockedProducts} />

      <SiteFooter />
    </main>
  );
}
