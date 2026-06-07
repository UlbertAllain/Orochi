import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { CreateProductInput, Product } from "@/types/product";

export async function getProductBySlug(slug: string) {
  const q = query(
    collection(db, COLLECTIONS.PRODUCTS),
    where("slug", "==", slug),
    where("isVisible", "==", true),
  );

  const snap = await getDocs(q);

  if (snap.empty) return null;

  const item = snap.docs[0];

  return {
    id: item.id,
    ...item.data(),
  } as Product;
}

export async function getProductsBySeriesId(
  seriesId: string,
  excludeProductId?: string,
) {
  const q = query(
    collection(db, COLLECTIONS.PRODUCTS),
    where("seriesId", "==", seriesId),
    where("isVisible", "==", true),
  );

  const snap = await getDocs(q);

  const products = snap.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Product[];

  if (!excludeProductId) {
    return products;
  }

  return products.filter((product) => product.id !== excludeProductId);
}

export async function getProductById(id: string) {
  const snap = await getDoc(doc(db, COLLECTIONS.PRODUCTS, id));

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  } as Product;
}

export async function getVisibleProducts() {
  const q = query(
    collection(db, COLLECTIONS.PRODUCTS),
    where("isVisible", "==", true),
    orderBy("order", "asc"),
  );

  const snap = await getDocs(q);

  return snap.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Product[];
}

export async function getProductsBySeries(seriesId: string) {
  const q = query(
    collection(db, COLLECTIONS.PRODUCTS),
    where("seriesId", "==", seriesId),
    where("isVisible", "==", true),
    orderBy("order", "asc"),
  );

  const snap = await getDocs(q);

  return snap.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Product[];
}

export async function createProduct(payload: CreateProductInput) {
  return addDoc(collection(db, COLLECTIONS.PRODUCTS), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateProduct(
  id: string,
  payload: Partial<CreateProductInput>,
) {
  return updateDoc(doc(db, COLLECTIONS.PRODUCTS, id), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id: string) {
  return deleteDoc(doc(db, COLLECTIONS.PRODUCTS, id));
}
export async function getAllProducts() {
  const q = query(
    collection(db, COLLECTIONS.PRODUCTS),
    orderBy("order", "asc"),
  );

  const snap = await getDocs(q);

  return snap.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Product[];
}
