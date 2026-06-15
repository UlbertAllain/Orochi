"use client";

import { useState } from "react";
import Link from "next/link";

type PublicNavbarProps = {
  variant?: "transparent" | "solid";
};

const NAV_ITEMS = [
  { label: "Godai", href: "/#godai" },
  { label: "Series", href: "/#world" },
  { label: "Philosophy", href: "/#philosophy" },
];

export function PublicNavbar({ variant = "transparent" }: PublicNavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-[#c8a35f]/10 backdrop-blur-xl ${
        variant === "solid" ? "bg-[#030201]/90" : "bg-[#030201]/65"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-lg tracking-[0.28em] text-[#fff7ea] sm:text-xl sm:tracking-[0.34em]"
          onClick={() => setOpen(false)}
        >
          OROCHI
        </Link>

        <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.22em] text-[#f8efe0]/50 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[#c8a35f]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c8a35f]/25 bg-black/30 text-[#f8efe0] md:hidden"
          aria-label="Toggle navigation"
        >
          <span className="text-lg">{open ? "×" : "☰"}</span>
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[#c8a35f]/10 bg-[#030201]/95 px-4 pb-5 pt-2 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[#c8a35f]/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#f8efe0]/70 transition hover:border-[#c8a35f]/35 hover:text-[#c8a35f]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
