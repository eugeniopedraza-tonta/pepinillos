"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface-muted)]">
      <div className="w-full max-w-sm rounded-[28px] bg-white p-8 shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.10)]">
        {/* Logo */}
        <div className="mb-8 text-center">
          <p className="font-['Big_Caslon','Baskerville','Palatino_Linotype',serif] text-3xl font-bold text-[var(--brand-olive)]">
            {"HERBERT'S"}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[var(--brand-brass)]">
            Panel de administración
          </p>
        </div>

        <form action={action} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-olive)] mb-1.5"
            >
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-[var(--brand-olive)]/20 bg-[var(--surface-muted)] px-4 py-2.5 text-sm text-[var(--brand-olive)] outline-none transition focus:border-[var(--brand-brass)] focus:ring-2 focus:ring-[var(--brand-brass)]/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-olive)] mb-1.5"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-[var(--brand-olive)]/20 bg-[var(--surface-muted)] px-4 py-2.5 text-sm text-[var(--brand-olive)] outline-none transition focus:border-[var(--brand-brass)] focus:ring-2 focus:ring-[var(--brand-brass)]/20"
            />
          </div>

          {state?.error && (
            <p className="rounded-xl bg-red-50 px-4 py-2.5 text-xs text-red-600">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full rounded-xl bg-[var(--brand-olive)] px-4 py-3 text-sm font-semibold text-[var(--brand-cream)] transition hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
