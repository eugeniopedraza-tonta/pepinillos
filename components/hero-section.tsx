"use client";

import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import type { Locale } from "@/lib/i18n";
  
const storyCopy = {
  es: {
    kicker: "Nuestra historia",
    headline: "Una historia que cruzó continentes",
    subheadline:
      "Herbert's nace como un homenaje a una historia de resiliencia, tradición y legado familiar.",
    origin: {
      label: "Berlín, 1906",
      title: "El origen",
      body: "La marca toma su nombre de Herbert Baschwitz Alexander, nacido en Berlín, Alemania, el 18 de febrero de 1906.",
    },
    journey: {
      label: "Veracruz, 1939",
      title: "Un nuevo comienzo",
      body: "Ante la Segunda Guerra Mundial, Herbert y su esposa Margot llegaron a México en 1939 por el puerto de Veracruz, donde encontraron refugio y una nueva oportunidad de vida.",
    },
    roots: {
      label: "Monterrey, Nuevo León",
      title: "Raíces en México",
      body: "Heriberto —nombre adoptado tras su naturalización— se estableció en Monterrey como catedrático en la UANL, fundó el laboratorio dental \"HERBA\" y fue miembro del Club de Leones de Santiago.",
    },
    legacy: {
      label: "El legado",
      title: "Una tradición culinaria",
      body: "Sus pepinillos agridulces, elaborados con paciencia, se convirtieron en símbolo de unión familiar y memoria viva, transmitidos con cariño generación tras generación. ",
    },
    closing:
      "Hoy, su nieto y familia retoman esa tradición con el mismo espíritu con el que fue creada, transformándola en una marca que honra sus raíces. Herbert's no es solo un producto, es una historia que cruzó continentes, que sobrevivió al tiempo y que hoy se comparte en cada frasco.",
    quote:
      "Herbert's no es solo un producto, es una historia que cruzó continentes, que sobrevivió al tiempo y que hoy se comparte en cada frasco. ",
    yearsBadge: "años de tradición",
    jarLabel: "Frasco por frasco",
  },
  en: {
    kicker: "Our story",
    headline: "A story that crossed continents",
    subheadline:
      "Herbert's is born as a tribute to a story of resilience, tradition, and family legacy.",
    origin: {
      label: "Berlin, 1906",
      title: "The origin",
      body: "The brand takes its name from Herbert Baschwitz Alexander, born in Berlin, Germany, on February 18, 1906.",
    },
    journey: {
      label: "Veracruz, 1939",
      title: "A new beginning",
      body: "As WWII began, Herbert and his wife Margot arrived in Mexico in 1939 through the port of Veracruz, finding refuge and a new life.",
    },
    roots: {
      label: "Monterrey, Nuevo León",
      title: "Roots in Mexico",
      body: "Heriberto settled in Monterrey as a professor at UANL, founded the dental laboratory \"HERBA\", and joined the Lions Club of Santiago.",
    },
    legacy: {
      label: "The legacy",
      title: "A culinary tradition",
      body: "His sweet-and-sour pickles, made with patience and dedication, became a symbol of family unity and living memory passed down through generations.",
    },
    closing:
      "Today, his grandson and family revive that tradition with the same spirit it was created with, transforming it into a brand that honors its roots. Herbert's is not just a product — it is a story that crossed continents, survived time, and today is shared in every jar.",
    quote:
      "Herbert's is not just a product — it is a story that crossed continents, survived time, and today is shared in every jar.",
    yearsBadge: "years of tradition",
    jarLabel: "Jar by jar",
  },
} as const;

// ── Header visuals ──────────────────────────────────────────────

const HeaderHeadline = () => (
  <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden rounded-xl bg-[var(--brand-olive)]">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-[var(--brand-brass)]/20"
        style={{ width: 80 + i * 60, height: 80 + i * 60 }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
      />
    ))}
    <img src="/herberts-name.png" alt="Herbert's" className="relative z-10 w-auto h-full" />
  </div>
);

const HeaderYear = ({ year }: { year: string }) => (
  <div className="flex h-full w-full flex-1 items-end overflow-hidden rounded-xl bg-[var(--surface-muted)] p-4">
    <motion.span
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
      className="font-['Big_Caslon','Baskerville','Palatino_Linotype',serif] text-6xl font-bold leading-none text-[var(--brand-olive)]/20 select-none"
    >
      {year}
    </motion.span>
  </div>
);

const HeaderSunrise = () => (
  <div className="relative flex h-full w-full flex-1 items-end overflow-hidden rounded-xl bg-gradient-to-b from-[#1a2e3a] via-[#4a3020] to-[var(--brand-earth)]">
    {/* Stars */}
    {[...Array(18)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-0.5 w-0.5 rounded-full bg-white"
        style={{ left: `${(i * 17 + 5) % 95}%`, top: `${(i * 13 + 5) % 55}%` }}
        animate={{ opacity: [0.2, 0.9, 0.2] }}
        transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
      />
    ))}
    {/* Sun rising */}
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[var(--brand-brass)]"
      style={{ bottom: "-40%" }}
      animate={{ bottom: ["-40%", "18%", "14%"] }}
      transition={{ duration: 3, ease: [0.25, 0, 0, 1], repeat: Infinity, repeatDelay: 2 }}
    >
      <div className="h-20 w-20 rounded-full bg-gradient-to-b from-[#f5d06a] to-[var(--brand-brass)] opacity-90" />
    </motion.div>
    {/* Horizon glow */}
    <motion.div
      className="absolute bottom-0 left-0 h-12 w-full rounded-b-xl"
      style={{ background: "linear-gradient(to top, rgba(184,154,74,0.5), transparent)" }}
      animate={{ opacity: [0.4, 0.9, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
    />
    {/* Sea */}
    <div className="absolute bottom-0 h-8 w-full overflow-hidden rounded-b-xl">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 rounded-full bg-[#4a7a8a]/50"
          style={{ width: `${40 + i * 20}%`, bottom: `${i * 10}px`, left: `${i * 10}%` }}
          animate={{ x: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </div>
  </div>
);

type GeoFeature = { type: "Feature"; properties: Record<string, unknown>; geometry: { type: string; coordinates: unknown } };
type GeoCollection = { type: "FeatureCollection"; features: GeoFeature[] };

const GEOJSON_URL = "https://raw.githubusercontent.com/strotgen/mexico-leaflet/master/states.geojson";
const MONTERREY: [number, number] = [-100.3161, 25.6866];

const HeaderMap = () => {
  const [geoData, setGeoData] = useState<GeoCollection | null>(null);

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((r) => r.json())
      .then(setGeoData)
      .catch(() => null);
  }, []);

  const { pathGenerator, dot } = useMemo(() => {
    const projection = geoMercator().center([-102, 23.5]).scale(1150).translate([450, 300]);
    return {
      pathGenerator: geoPath(projection),
      dot: projection(MONTERREY),
    };
  }, []);

  return (
    <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden rounded-xl bg-[var(--surface)]">
      {!geoData ? (
        <span className="text-xs text-[var(--brand-copy-muted)]">…</span>
      ) : (
        <svg viewBox="000 -80 1000 700" aria-label="Mexico map">
          <g>
            {geoData.features.map((feat, i) => {
              const d = pathGenerator(feat as Parameters<typeof pathGenerator>[0]);
              return d ? (
                <path key={i} d={d} fill="var(--surface-muted)" stroke="var(--brand-olive)" strokeWidth={0.8} />
              ) : null;
            })}
          </g>
          {dot && (
            <g>
              <motion.circle
                cx={dot[0]} cy={dot[1]} r={10}
                fill="none" stroke="var(--brand-brass)" strokeWidth={1.5}
                animate={{ r: [6, 16, 6], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <circle cx={dot[0]} cy={dot[1]} r={5} fill="var(--brand-olive)" />
              <text x={dot[0] + 10} y={dot[1] - 8} fontSize="14" fill="var(--brand-olive)" fontFamily="serif">
                Monterrey
              </text>
            </g>
          )}
        </svg>
      )}
    </div>
  );
};

const ingredientCells = [
  { label: "IRRESISTIBLE", bg: "bg-[var(--brand-olive)]", span: "col-span-1", text: "text-[var(--brand-cream)]" },
  { label: "UNICO", bg: "bg-[var(--brand-brass)]/80", span: "col-span-1", text: "text-[var(--brand-olive)]" },
  { label: "ADICTIVO", bg: "bg-[var(--surface-muted)]", span: "col-span-1", text: "text-[var(--brand-olive)]" },
  { label: "AUTÉNTICO", bg: "bg-[var(--brand-moss)]/60", span: "col-span-1", text: "text-[var(--brand-cream)]" },
  { label: "TRADICIONAL", bg: "bg-[var(--brand-brass)]/90", span: "col-span-2", text: "text-[var(--brand-cream)]" },
];

const HeaderJar = () => (
  <div className="grid h-full w-full flex-1 grid-cols-2 overflow-hidden rounded-xl gap-1.5">
    {ingredientCells.map((cell, i) => (
      <motion.div
        key={cell.label}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.07, duration: 0.35, ease: [0.25, 0, 0, 1] }}
        className={`${cell.bg} ${cell.span} flex items-center justify-center rounded-lg px-2 py-3`}
      >
        <span className={`${cell.text} text-xs font-semibold uppercase tracking-[0.18em]`}>
          {cell.label}
        </span>
      </motion.div>
    ))}
  </div>
);

const HeaderBadge = () => (
  <div className="flex h-full w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-xl bg-[var(--brand-brass)]">
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
      className="font-['Big_Caslon','Baskerville','Palatino_Linotype',serif] text-7xl font-bold leading-none text-[var(--brand-olive)]"
    >
      80+
    </motion.span>
  </div>
);

const HeaderQuote = () => (
  <div className="flex h-full w-full flex-1 items-center overflow-hidden rounded-xl bg-[var(--brand-olive)] px-6">
    <span className="font-['Big_Caslon','Baskerville','Palatino_Linotype',serif] text-6xl text-[var(--brand-brass)]/30 select-none">
      &ldquo;
    </span>
  </div>
);

// ── Text helpers (override neutral colors) ────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs uppercase tracking-[0.24em] text-[var(--brand-brass)]">
      {children}
    </span>
  );
}

function Title({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`font-['Big_Caslon','Baskerville','Palatino_Linotype',serif] text-xl font-semibold ${
        light ? "text-[var(--brand-cream)]" : "text-[var(--brand-olive)]"
      }`}
    >
      {children}
    </span>
  );
}

function Body({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`text-xs leading-6 ${light ? "text-[var(--brand-cream)]/75" : "text-[var(--brand-copy-muted)]"}`}>
      {children}
    </span>
  );
}

// ── Page component ────────────────────────────────────────────

export function HeroSection({ locale }: { locale: Locale }) {
  const c = storyCopy[locale];

  const items = [
    // 1 — Headline (2 cols)
    {
      header: <HeaderHeadline />,
      title: (
        <span className="flex flex-col gap-1">
          <Label>{c.kicker}</Label>
          <Title light>{c.headline}</Title>
        </span>
      ),
      description: <Body light>{c.subheadline}</Body>,
      className: "md:col-span-2 !bg-[var(--brand-olive)] !border-[var(--brand-brass)]/10",
    },
    // 2 — Origin (1 col)
    {
      header: <HeaderYear year="1906" />,
      title: (
        <span className="flex flex-col gap-1">
          <Label>{c.origin.label}</Label>
          <Title>{c.origin.title}</Title>
        </span>
      ),
      description: <Body>{c.origin.body}</Body>,
      className: "md:col-span-1",
    },
    // 3 — Journey (1 col)
    {
      header: <HeaderSunrise />,
      title: (
        <span className="flex flex-col gap-1">
          <Label>{c.journey.label}</Label>
          <Title light>{c.journey.title}</Title>
        </span>
      ),
      description: <Body light>{c.journey.body}</Body>,
      className: "md:col-span-1 !bg-[var(--brand-earth)] !border-[var(--brand-brass)]/10",
    },
    // 4 — Roots (2 cols)
    {
      header: <HeaderMap />,
      title: (
        <span className="flex flex-col gap-1">
          <Label>{c.roots.label}</Label>
          <Title>{c.roots.title}</Title>
        </span>
      ),
      description: <Body>{c.roots.body}</Body>,
      className: "md:col-span-2",
    },
    // 5 — 80+ badge (1 col)
    {
      header: <HeaderBadge />,
      title: <Title>{c.yearsBadge}</Title>,
      description: null,
      className: "md:col-span-1 !bg-[var(--brand-brass)]/10 !border-[var(--brand-brass)]/20",
    },
    // 6 — Legacy (1 col)
    {
      header: <HeaderJar />,
      title: (
        <span className="flex flex-col gap-1">
          <Label>{c.legacy.label}</Label>
          <Title light>{c.legacy.title}</Title>
        </span>
      ),
      description: <Body light>{c.legacy.body}</Body>,
      className: "md:col-span-1 !bg-[var(--brand-sage)] !border-[var(--brand-sage)]",
    },
    // 7 — Closing (1 col)
    {
      header: null,
      title: <Title>{c.jarLabel}</Title>,
      description: <Body>{c.closing}</Body>,
      className: "md:col-span-1 !bg-[var(--surface)]",
    }
  ];

  return (
    <BentoGrid className="md:auto-rows-[22rem]">
      {items.map((item, i) => (
        <BentoGridItem
            key={i}
            index={i}
            header={item.header}
            title={item.title}
            description={item.description}
            className={item.className}
          />
        ))}
    </BentoGrid>
  );
}
