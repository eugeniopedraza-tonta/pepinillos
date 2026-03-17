type JarArtworkProps = {
  accent: string;
  badge: string;
};

export function JarArtwork({ accent, badge }: JarArtworkProps) {
  return (
    <div className={`relative overflow-hidden rounded-[32px] bg-gradient-to-br ${accent} p-6`}>
      <div className="absolute right-4 top-4 rounded-full bg-[var(--brand-cream)]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-olive)]">
        {badge}
      </div>
      <div className="mx-auto mt-6 flex h-56 w-40 flex-col items-center justify-end rounded-t-[40px] border border-white/45 bg-[#efe0b5]/30 pb-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] backdrop-blur-sm">
        <div className="h-8 w-20 rounded-t-2xl bg-[var(--brand-olive)]" />
        <div className="mt-2 flex h-36 w-28 items-center justify-center rounded-[26px] bg-[var(--brand-cream)] px-4 text-center font-[family-name:var(--font-display)] text-xl tracking-[0.02em] text-[var(--brand-olive)] shadow-[0_10px_25px_rgba(18,35,24,0.15)]">
          Herbet
        </div>
      </div>
    </div>
  );
}
