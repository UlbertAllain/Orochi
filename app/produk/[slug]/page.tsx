import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/public/product-detail-client";
import {
  getProductBySlug,
  getProductsBySeriesId,
} from "@/services/product-service";
import type { Product } from "@/types/product";
type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function toClientProduct(product: Product): Product {
  return {
    id: product.id,
    seriesId: product.seriesId,
    name: product.name,
    slug: product.slug,
    kanji: product.kanji ?? "",
    element: product.element ?? "",
    meaning: product.meaning ?? "",
    notes: product.notes ?? "",
    mood: product.mood ?? "",
    description: product.description ?? "",
    imageUrl: product.imageUrl ?? "",
    cloudinaryPublicId: product.cloudinaryPublicId ?? "",
    sizes: product.sizes ?? [],
    isLocked: product.isLocked,
    isVisible: product.isVisible,
    order: product.order,
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || product.isLocked) {
    return {
      title: "Produk tidak tersedia | Orochi Perfumes",
      description: "Produk Orochi ini belum tersedia atau belum dirilis.",
    };
  }

  const description =
    product.description ||
    product.notes ||
    `${product.name} adalah varian parfum dari Orochi Perfumes.`;

  return {
    title: `${product.name} | Orochi Perfumes`,
    description,
    openGraph: {
      title: `${product.name} | Orochi Perfumes`,
      description,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Orochi Perfumes`,
      description,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product || product.isLocked) {
    notFound();
  }

  const relatedProducts = await getProductsBySeriesId(
    product.seriesId,
    product.id,
  );

  return (
    <ProductDetailClient
      product={toClientProduct(product)}
      relatedProducts={relatedProducts.slice(0, 4).map(toClientProduct)}
    />
  );
}
