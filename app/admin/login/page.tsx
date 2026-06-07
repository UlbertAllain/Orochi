"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";
import { isAdminEmail } from "@/lib/admin";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (!isAdminEmail(credential.user.email)) {
        setErrorMessage("Email ini bukan admin Orochi.");
        return;
      }

      router.replace("/admin/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("Login gagal. Cek email dan password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            Orochi Admin
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Masuk Dashboard</h1>
          <p className="mt-2 text-sm text-white/50">
            Login hanya untuk pengelola katalog Orochi.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-white/70">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-white/30"
              placeholder="admin@orochi.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-white/30"
              placeholder="••••••••"
              required
            />
          </div>

          {errorMessage ? (
            <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Memproses..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}
