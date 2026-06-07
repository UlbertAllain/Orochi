"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase/client";
import { deleteCloudinaryImage } from "@/services/cloudinary-service";

type Props = {
  currentPublicId?: string;
  onUploaded: (data: {
    imageUrl: string;
    publicId: string;
  }) => void;
};

export default function ImageUpload({ currentPublicId, onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);
    setErrorMessage("");

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setErrorMessage("Admin belum login.");
        return;
      }

      if (currentPublicId) {
        await deleteCloudinaryImage(currentPublicId);
      }

      const token = await currentUser.getIdToken();

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Upload gagal.");
        return;
      }

      onUploaded({
        imageUrl: data.secure_url,
        publicId: data.public_id,
      });

      event.target.value = "";
    } catch (error) {
      console.error(error);
      setErrorMessage("Upload gagal.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full text-sm text-white/60 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black disabled:cursor-not-allowed disabled:opacity-60"
      />

      {uploading ? (
        <p className="text-sm text-white/60">Uploading...</p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}