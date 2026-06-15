import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { sessionOptions, type SessionData } from "@/lib/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f8f3e6]">
      <header className="sticky top-0 z-10 border-b border-[#21402d]/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-display)] text-xl text-[#21402d]">Herbert&apos;s</span>
            <span className="rounded-full bg-[#21402d]/8 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#21402d]">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-[#516154] hover:text-[#21402d]">
              Ver sitio
            </Link>
            <Link
              href="/admin/logout"
              className="rounded-full border border-[#21402d]/15 px-4 py-1.5 text-sm font-medium text-[#21402d] transition-colors hover:bg-[#21402d]/5"
            >
              Cerrar sesión
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
    </div>
  );
}
