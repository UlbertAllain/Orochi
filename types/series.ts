import type { Timestamp } from "firebase/firestore";

export type Series = {
  id: string;
  name: string;
  slug: string;
  description: string;
  isMain: boolean;
  isVisible: boolean;
  order: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type CreateSeriesInput = Omit<Series, "id" | "createdAt" | "updatedAt">;