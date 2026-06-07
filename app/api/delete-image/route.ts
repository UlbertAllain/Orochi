import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { adminAuth } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  try {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authorization.replace("Bearer ", "");

    const decoded = await adminAuth.verifyIdToken(token);

    if (decoded.email?.toLowerCase() !== adminEmail?.toLowerCase()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    const publicId = body.publicId;

    if (!publicId) {
      return NextResponse.json(
        { error: "Public ID wajib diisi" },
        { status: 400 },
      );
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Gagal menghapus image",
      },
      {
        status: 500,
      },
    );
  }
}
