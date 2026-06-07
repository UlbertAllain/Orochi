import { auth } from "@/lib/firebase/client";

export async function deleteCloudinaryImage(
  publicId: string
) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("Admin belum login");
  }

  const token = await currentUser.getIdToken();

  const response = await fetch("/api/delete-image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      publicId,
    }),
  });

  if (!response.ok) {
    throw new Error("Gagal hapus image");
  }
}