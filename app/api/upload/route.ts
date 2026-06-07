import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { adminAuth } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  try {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!adminEmail) {
      return NextResponse.json(
        { error: "Admin email belum dikonfigurasi." },
        { status: 500 },
      );
    }

    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const token = authorization.replace("Bearer ", "");

    const decodedToken = await adminAuth.verifyIdToken(token);

    if (decodedToken.email?.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "File tidak ditemukan." },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File harus berupa gambar." },
        { status: 400 },
      );
    }

    const maxSize = 3 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Ukuran gambar maksimal 3MB." },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "orochi-products",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      secure_url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Upload gagal." }, { status: 500 });
  }
}
