import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/public/product-detail-client";
import {
  getProductBySlug,
  getProductsBySeriesId,
} from "@/services/product-service";
import type { Product } from "@/types/product";

const baseUrl = "https://orochiperfumery.vercel.app";
const shopeeUrl = "https://shopee.co.id/";

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

function getLowestPrice(product: Product) {
  const prices = product.sizes?.map((size) => size.price).filter(Boolean) ?? [];
  return prices.length ? Math.min(...prices) : 0;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || product.isLocked) {
    return {
      title: "Produk tidak tersedia | Orochi Perfumery",
      description: "Produk Orochi ini belum tersedia atau belum dirilis.",
    };
  }

  const description =
    product.description ||
    product.notes ||
    `${product.name} adalah varian parfum dari Orochi Perfumery.`;

  return {
    title: `${product.name} | Orochi Perfumery`,
    description,
    alternates: {
      canonical: `${baseUrl}/produk/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Orochi Perfumery`,
      description,
      url: `${baseUrl}/produk/${product.slug}`,
      siteName: "Orochi Perfumery",
      images: product.imageUrl ? [product.imageUrl] : [],
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Orochi Perfumery`,
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

  const lowestPrice = getLowestPrice(product);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description ||
      product.notes ||
      `${product.name} adalah varian parfum dari Orochi Perfumery.`,
    image: product.imageUrl ? [product.imageUrl] : [],
    brand: {
      "@type": "Brand",
      name: "Orochi Perfumery",
    },
    category: "Perfume",
    sku: product.slug,
    offers: lowestPrice
      ? {
          "@type": "Offer",
          url: shopeeUrl,
          priceCurrency: "IDR",
          price: lowestPrice,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        }
      : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.name,
        item: `${baseUrl}/produk/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <ProductDetailClient
        product={toClientProduct(product)}
        relatedProducts={relatedProducts.slice(0, 4).map(toClientProduct)}
      />
    </>
  );
}
