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
      <div className="mx-auto mt-6 flex h-56 w-40 flex-col items-center justify-end rounded-t-[40px] border border-white/45 bg-[#d4c589]/20 pb-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] backdrop-blur-sm">
        <div className="h-8 w-20 rounded-t-2xl bg-[linear-gradient(180deg,_#c0ac69_0%,_#8e7b3b_100%)]" />
        <div className="mt-2 flex h-40 w-30 flex-col items-center justify-center rounded-[26px] border border-[var(--brand-brass)]/50 bg-[var(--brand-olive)] px-3 text-center text-[var(--brand-cream)] shadow-[0_10px_25px_rgba(18,35,24,0.15)]">
          <span className="font-[family-name:var(--font-display)] text-lg tracking-[0.08em] text-[var(--brand-brass)]">
            HERBERT&apos;S
          </span>
          <span className="mt-2 border-t border-[var(--brand-brass)]/50 pt-2 text-[8px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-cream)]/90">
            Pepinillos Gourmet
          </span>
          <span className="mt-3 font-[family-name:var(--font-script)] text-lg leading-none text-[var(--brand-cream)]">
            Tradicionales
          </span>
        </div>
      </div>
    </div>
  );
}
