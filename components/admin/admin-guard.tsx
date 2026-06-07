"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAdminAuth } from "@/hooks/use-admin-auth";

type AdminGuardProps = {
  children: React.ReactNode;
};

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { loading, isAdmin } = useAdminAuth();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/admin/login");
    }
  }, [loading, isAdmin, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <p className="text-sm text-white/60">Memeriksa akses admin...</p>
      </main>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}