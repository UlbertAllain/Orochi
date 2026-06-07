import { getAllProducts } from "@/services/product-service";
import { getAllSeries } from "@/services/series-service";

export async function getAdminAnalytics() {
  const [series, products] = await Promise.all([
    getAllSeries(),
    getAllProducts(),
  ]);

  return {
    totalSeries: series.length,
    totalProducts: products.length,
    activeProducts: products.filter((product) => product.isVisible).length,
    mysteryProducts: products.filter((product) => product.isLocked).length,
    uploadedImages: products.filter((product) => product.cloudinaryPublicId)
      .length,
  };
}