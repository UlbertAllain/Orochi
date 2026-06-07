import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

console.log("Cloudinary env check:", {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY ? "ADA" : "KOSONG",
  apiSecret: process.env.CLOUDINARY_API_SECRET ? "ADA" : "KOSONG",
});

async function test() {
  const { default: cloudinary } = await import("../lib/cloudinary");

  console.log(await cloudinary.api.ping());
}

test();