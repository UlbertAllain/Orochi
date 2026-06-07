import type { Timestamp } from "firebase/firestore";

export type ProductSize = {
  label: string;
  price: number;
};

export type Product = {
  id: string;
  seriesId: string;
  name: string;
  slug: string;
  kanji?: string;
  element?: string;
  meaning?: string;
  notes?: string;
  mood?: string;
  description?: string;
  imageUrl?: string;
  cloudinaryPublicId?: string;
  sizes: ProductSize[];
  isLocked: boolean;
  isVisible: boolean;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;