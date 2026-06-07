import type { Product } from "@/types/product";

export function lockProductForTeaser(product: Product): Product {
  return {
    ...product,
    name: product.name || "???",
    imageUrl: "",
    cloudinaryPublicId: "",
    sizes: [],
    isLocked: true,
  };
}

export function lockProductsForTeaser(products: Product[]) {
  return products.map(lockProductForTeaser);
}