import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});
import { initializeApp, getApps } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
  throw new Error("Firebase env belum lengkap di .env.local");
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  const series = [
    {
      key: "godai",
      name: "Godai Series",
      slug: "godai-series",
      description: "Lima elemen dasar yang membentuk kekuatan Orochi.",
      isMain: true,
      isVisible: true,
      order: 1,
    },
    {
      key: "keshiki",
      name: "Keshiki Series",
      slug: "keshiki-series",
      description: "Aroma yang lahir dari suasana, lanskap, dan fragmen memori.",
      isMain: false,
      isVisible: true,
      order: 2,
    },
    {
      key: "kami",
      name: "Kami Series",
      slug: "kami-series",
      description: "Wewangian yang mengambil inspirasi dari mitologi para dewa.",
      isMain: false,
      isVisible: true,
      order: 3,
    },
  ];

  const seriesIds: Record<string, string> = {};

  for (const item of series) {
    const { key, ...payload } = item;

    const docRef = await addDoc(collection(db, "series"), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    seriesIds[key] = docRef.id;
    console.log(`Series created: ${payload.name}`);
  }

  const products = [
    {
      seriesId: seriesIds.godai,
      name: "Kaminari",
      slug: "kaminari",
      kanji: "雷",
      element: "Lightning",
      meaning: "Petir",
      notes: "Petrichor · Bergamot · Vetiver",
      mood: "Dominan",
      description: "Aroma petir yang membelah udara; tajam, bersih, dan memerintah.",
      imageUrl: "",
      cloudinaryPublicId: "",
      sizes: [
        { label: "30ml", price: 35000 },
        { label: "50ml", price: 50000 },
        { label: "100ml", price: 70000 },
      ],
      isLocked: false,
      isVisible: true,
      order: 1,
    },
    {
      seriesId: seriesIds.godai,
      name: "Suiryu",
      slug: "suiryu",
      kanji: "水",
      element: "Water",
      meaning: "Air",
      notes: "Teratai Biru · Es · Cedar",
      mood: "Dingin",
      description: "Aroma air yang tenang di permukaan, namun dalam dan berbahaya.",
      imageUrl: "",
      cloudinaryPublicId: "",
      sizes: [
        { label: "30ml", price: 35000 },
        { label: "50ml", price: 50000 },
        { label: "100ml", price: 70000 },
      ],
      isLocked: false,
      isVisible: true,
      order: 2,
    },
    {
      seriesId: seriesIds.godai,
      name: "Kaen",
      slug: "kaen",
      kanji: "火",
      element: "Fire",
      meaning: "Api",
      notes: "Lada Hitam · Oud Asap · Kulit",
      mood: "Agresif",
      description: "Aroma api yang membakar pelan, tebal, gelap, dan tidak mudah padam.",
      imageUrl: "",
      cloudinaryPublicId: "",
      sizes: [
        { label: "30ml", price: 35000 },
        { label: "50ml", price: 50000 },
        { label: "100ml", price: 70000 },
      ],
      isLocked: false,
      isVisible: true,
      order: 3,
    },
    {
      seriesId: seriesIds.godai,
      name: "???",
      slug: "godai-mystery-1",
      isLocked: true,
      isVisible: true,
      order: 4,
      sizes: [],
    },
    {
      seriesId: seriesIds.godai,
      name: "???",
      slug: "godai-mystery-2",
      isLocked: true,
      isVisible: true,
      order: 5,
      sizes: [],
    },

    {
      seriesId: seriesIds.keshiki,
      name: "Ame",
      slug: "ame",
      kanji: "雨",
      element: "Rain",
      meaning: "Hujan",
      isLocked: true,
      isVisible: true,
      order: 1,
      sizes: [],
    },
    {
      seriesId: seriesIds.keshiki,
      name: "Yoru",
      slug: "yoru",
      kanji: "夜",
      element: "Night",
      meaning: "Malam",
      isLocked: true,
      isVisible: true,
      order: 2,
      sizes: [],
    },
    {
      seriesId: seriesIds.keshiki,
      name: "Hana",
      slug: "hana",
      kanji: "花",
      element: "Flower",
      meaning: "Bunga",
      isLocked: true,
      isVisible: true,
      order: 3,
      sizes: [],
    },
    {
      seriesId: seriesIds.keshiki,
      name: "???",
      slug: "keshiki-mystery-1",
      isLocked: true,
      isVisible: true,
      order: 4,
      sizes: [],
    },

    {
      seriesId: seriesIds.kami,
      name: "Amaterasu",
      slug: "amaterasu",
      kanji: "天",
      element: "Sun",
      meaning: "Matahari",
      isLocked: true,
      isVisible: true,
      order: 1,
      sizes: [],
    },
    {
      seriesId: seriesIds.kami,
      name: "Susanoo",
      slug: "susanoo",
      kanji: "須",
      element: "Storm",
      meaning: "Badai",
      isLocked: true,
      isVisible: true,
      order: 2,
      sizes: [],
    },
    {
      seriesId: seriesIds.kami,
      name: "???",
      slug: "kami-mystery-1",
      isLocked: true,
      isVisible: true,
      order: 3,
      sizes: [],
    },
  ];

  for (const product of products) {
    await addDoc(collection(db, "products"), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log(`Product created: ${product.name}`);
  }

  console.log("Seed selesai.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});