"use client";

import { useRouter } from "next/navigation";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminPageShell } from "@/components/admin/admin-page-shell";
import { SeriesForm } from "@/components/admin/series-form";
import { createSeries } from "@/services/series-service";

export default function NewSeriesPage() {
  const router = useRouter();

  return (
    <AdminGuard>
      <AdminPageShell
        title="Tambah Series"
        description="Buat chapter baru untuk katalog Orochi."
      >
        <SeriesForm
          submitLabel="Tambah Series"
          onSubmit={async (values) => {
            await createSeries(values);
            router.replace("/admin/dashboard");
          }}
        />
      </AdminPageShell>
    </AdminGuard>
  );
}
