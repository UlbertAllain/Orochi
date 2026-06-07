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
import type { CreateSeriesInput, Series } from "@/types/series";

export async function getSeriesBySlug(slug: string) {
  const q = query(
    collection(db, COLLECTIONS.SERIES),
    where("slug", "==", slug),
    where("isVisible", "==", true),
  );

  const snap = await getDocs(q);

  if (snap.empty) {
    return null;
  }

  const docSnap = snap.docs[0];

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as Series;
}

export async function getSeriesById(id: string) {
  const snap = await getDoc(doc(db, COLLECTIONS.SERIES, id));

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  } as Series;
}

export async function getVisibleSeries() {
  const q = query(
    collection(db, COLLECTIONS.SERIES),
    where("isVisible", "==", true),
    orderBy("order", "asc"),
  );

  const snap = await getDocs(q);

  return snap.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Series[];
}

export async function getMainSeries() {
  const q = query(
    collection(db, COLLECTIONS.SERIES),
    where("isMain", "==", true),
    where("isVisible", "==", true),
    orderBy("order", "asc"),
  );

  const snap = await getDocs(q);

  return snap.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Series[];
}

export async function createSeries(payload: CreateSeriesInput) {
  return addDoc(collection(db, COLLECTIONS.SERIES), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateSeries(
  id: string,
  payload: Partial<CreateSeriesInput>,
) {
  return updateDoc(doc(db, COLLECTIONS.SERIES, id), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteSeries(id: string) {
  return deleteDoc(doc(db, COLLECTIONS.SERIES, id));
}

export async function getAllSeries() {
  const q = query(collection(db, COLLECTIONS.SERIES), orderBy("order", "asc"));

  const snap = await getDocs(q);

  return snap.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as Series[];
}
