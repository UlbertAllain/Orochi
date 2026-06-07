import Link from "next/link";

type AdminPageShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

export function AdminPageShell({
  title,
  description,
  children,
  action,
}: AdminPageShellProps) {
  return (
    <main className="min-h-screen bg-[#030201] px-6 py-8 text-[#f8efe0]">
      <section className="mx-auto max-w-4xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <Link
              href="/admin/dashboard"
              className="text-sm text-[#f8efe0]/45 hover:text-[#c8a35f]"
            >
              ← Dashboard
            </Link>

            <p className="mt-8 text-xs uppercase tracking-[0.4em] text-[#c8a35f]">
              Orochi Admin
            </p>

            <h1 className="mt-3 font-serif text-4xl font-medium text-[#fff7ea]">
              {title}
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-7 text-[#f8efe0]/48">
              {description}
            </p>
          </div>

          {action}
        </div>

        <div className="mt-8">{children}</div>
      </section>
    </main>
  );
}
