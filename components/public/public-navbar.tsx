import Link from "next/link";

type PublicNavbarProps = {
  variant?: "transparent" | "solid";
};

export function PublicNavbar({ variant = "transparent" }: PublicNavbarProps) {
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-[#c8a35f]/10 backdrop-blur-xl ${
        variant === "solid" ? "bg-[#030201]/85" : "bg-[#030201]/45"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.34em] text-[#fff7ea]"
        >
          OROCHI
        </Link>

        <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.22em] text-[#f8efe0]/50 md:flex">
          <Link href="/#godai" className="transition hover:text-[#c8a35f]">
            Godai
          </Link>

          <Link href="/#world" className="transition hover:text-[#c8a35f]">
            Series
          </Link>

          <Link href="/#philosophy" className="transition hover:text-[#c8a35f]">
            Philosophy
          </Link>

          <Link href="/admin/login" className="transition hover:text-[#c8a35f]">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
