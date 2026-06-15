"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f3e6] px-4">
      <div className="w-full max-w-sm rounded-3xl border border-[#21402d]/10 bg-white p-8 shadow-[0_16px_48px_rgba(33,64,45,0.12)]">
        <p className="text-xs uppercase tracking-[0.24em] text-[#7a4e25]">Admin</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#21402d]">
          Herbert&apos;s
        </h1>

        <form action={action} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-[#21402d]">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-xl border border-[#21402d]/15 bg-[#f8f3e6] px-4 py-2.5 text-sm text-[#21402d] outline-none focus:border-[#21402d]/40 focus:ring-2 focus:ring-[#21402d]/10"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-[#21402d]">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="rounded-xl border border-[#21402d]/15 bg-[#f8f3e6] px-4 py-2.5 text-sm text-[#21402d] outline-none focus:border-[#21402d]/40 focus:ring-2 focus:ring-[#21402d]/10"
            />
          </div>

          {state?.error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-xl bg-[#21402d] py-2.5 text-sm font-semibold text-[#f8f3e6] transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {pending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
