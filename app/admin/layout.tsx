export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--surface-muted)]">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-[var(--brand-olive)]/10 bg-[var(--brand-olive)] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <span className="font-['Big_Caslon','Baskerville','Palatino_Linotype',serif] text-xl font-bold text-[var(--brand-cream)]">
              {"HERBERT'S"}
            </span>
            <span className="ml-3 text-xs uppercase tracking-[0.2em] text-[var(--brand-brass)]">
              Admin
            </span>
          </div>
          <form action="/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-cream)] transition hover:border-white/40 hover:bg-white/10"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>

      {/* Page content */}
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
