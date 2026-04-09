# Herbert's — Design & Code Guidelines

> Reference for animation, UI/UX, and codebase conventions.  
> Stack: Next.js 16 · Tailwind v4 · shadcn/ui (radix-maia) · Framer Motion · HugeIcons

---

## 1. Color System

All colors come from CSS variables in `app/globals.css`. Never use raw hex values in components.

| Token | Value | Use |
|---|---|---|
| `--background` | #f2eedf | Page background |
| `--foreground` | #1f3425 | Body text |
| `--surface` | #faf6ec | Cards, panels |
| `--surface-muted` | #ece3cf | Borders, dividers |
| `--brand-olive` | #163726 | Primary buttons, navbar |
| `--brand-sage` | #6c7642 | Secondary actions |
| `--brand-brass` | #b89a4a | Accents, highlights, gold |
| `--brand-earth` | #866a39 | Warm accents |
| `--brand-cream` | #f5efdf | Light text on dark bg |
| `--brand-copy-muted` | #55614f | Subdued labels |

**In Tailwind:** use `bg-[var(--brand-olive)]` or define utilities in `globals.css`.  
**In shadcn components:** CSS variable mapping is in `globals.css` — edit there, not in component files.

---

## 2. Typography

```
Display headings  → font-family: var(--font-display)    [Big Caslon / Baskerville]
Body text         → font-family: var(--font-sans-body)  [Optima / Avenir Next]
Script / accents  → font-family: var(--font-script)     [Snell Roundhand]
```

**Rules:**
- Product names → display font, sentence case
- UI labels, nav, buttons → body font, uppercase tracking for small labels
- Script font → hero taglines only, sparingly

---

## 3. Animation (Framer Motion)

### Principles
- **Purpose over decoration** — every animation communicates something (load, state change, hierarchy)
- **Fast entries, slower exits** — enter: 300–400ms, exit: 200ms
- **Ease out for entrances, ease in for exits**
- Respect `prefers-reduced-motion` — always provide a fallback

### Standard Variants

```tsx
// Fade + slide up — use for sections, cards
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

// Stagger children — use for product grids
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// Scale on hover — use for product cards
const cardHover = {
  rest: { scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  hover: { scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", transition: { duration: 0.2 } },
}
```

### When to use `whileInView`
- Sections below the fold: `<motion.section whileInView="visible" initial="hidden" viewport={{ once: true, amount: 0.2 }}>`
- Hero: animate on mount (`useEffect` + `animate`), not `whileInView`

### Glassmorphism navbar (on scroll)
```tsx
// Detect scroll in site-header.tsx
const [scrolled, setScrolled] = useState(false)
useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 40)
  window.addEventListener("scroll", handler, { passive: true })
  return () => window.removeEventListener("scroll", handler)
}, [])

// Apply class conditionally
className={cn(
  "transition-all duration-300",
  scrolled && "backdrop-blur-md bg-[var(--background)]/80 shadow-sm"
)}
```

---

## 4. UI/UX Design

### Layout Grid
| Breakpoint | Columns | Gutter |
|---|---|---|
| Mobile `< 768px` | 1 col | 16px |
| Tablet `768–1024px` | 2 col | 24px |
| Desktop `> 1024px` | 3–4 col | 32px |

### Component Conventions

**Buttons:**
- Primary: `bg-[var(--brand-olive)] text-[var(--brand-cream)]` — "Comprar ahora"
- Secondary: outlined with `border-[var(--brand-olive)]`
- Hover: fill transition 200ms ease
- Min tap target: 44×44px on mobile

**Cards:**
- Background: `var(--surface)`
- Border: 1px `var(--surface-muted)`
- Border radius: `rounded-2xl` (16px)
- Shadow: subtle on rest, elevated on hover

**Spacing:**
- Section padding: `py-16 md:py-24`
- Inner card padding: `p-5 md:p-6`
- Component gap: multiples of 4px (Tailwind scale)

### Accessibility
- All interactive elements must have `:focus-visible` rings
- Color contrast ≥ 4.5:1 for body text
- Images: always include `alt` text
- Cart drawer and mobile sheet must trap focus when open
- Carousels must support keyboard navigation (shadcn Carousel handles this)

---

## 5. shadcn/ui Usage

Config: `components.json` — style `radix-maia`, icons `hugeicons`, CSS variables enabled.

**Rules:**
- All shadcn components live in `components/ui/` — never edit these files directly
- Customize via `className` prop or CSS variable overrides in `globals.css`
- Use `cn()` from `@/lib/utils` for conditional class merging

**Component map for this project:**
| shadcn component | Used in |
|---|---|
| `Button` | All CTAs |
| `Card` | Product grid |
| `Carousel` | Mobile product swipe |
| `Sheet` | Mobile nav hamburger |
| `NavigationMenu` | Desktop navbar |
| `Badge` | Flavor notes, product tags |
| `Sonner` | "Agregado al carrito" toast |
| `Skeleton` | Loading states |
| `Separator` | Section dividers |
| `Accordion` | FAQ page |
| `Dialog` | Product quick-view (Phase 5) |

---

## 6. Codebase Conventions

### File Structure
```
app/
  [locale]/         ← all pages live here (bilingual)
  globals.css       ← single source of truth for tokens
components/
  ui/               ← shadcn primitives (do not edit)
  *.tsx             ← project components
lib/
  data/site.ts      ← all copy/content (bilingual)
  shopify/          ← Shopify API helpers
  i18n.ts           ← locale types and helpers
```

### Naming
- Components: `PascalCase.tsx`
- Utilities/helpers: `kebab-case.ts`
- CSS classes: Tailwind utilities only, no custom class names unless adding a utility to `globals.css`

### Data Flow
- Products come from Shopify (live) or `lib/data/site.ts` (fallback)
- All user-facing copy must exist in both `es` and `en` in `lib/data/site.ts`
- Cart state: `useCart()` hook from `cart-provider.tsx`

### Dos and Don'ts
| Do | Don't |
|---|---|
| Use CSS variables for all colors | Hardcode hex in components |
| Add copy to `lib/data/site.ts` | Write strings directly in JSX |
| Use `next/image` for all images | Use `<img>` tags |
| Use `cn()` for conditional classes | String concatenation for classes |
| Animate with Framer Motion | CSS `transition` for complex animations |
| Use shadcn `Button` for all CTAs | Create custom button elements |

---

## 7. Development Phases (from plan)

| # | Phase | Status |
|---|---|---|
| 1 | Setup: Next.js + Tailwind + shadcn + Framer Motion | ✅ Done |
| 2 | Base: Navbar + Hero + Footer | ⬜ Pending |
| 3 | Products: Grid + Product page | ⬜ Pending *(falta descripción de productos)* |
| 4 | Brand: "¿Por qué Herbert's?" + Social feed | ⬜ Pending |
| 5 | Detail: Individual product page | ⬜ Pending |
| 6 | Sales: Shopify / Amazon integration | ⬜ Pending |
| 7 | Launch: SEO + Performance + Deploy | ⬜ Pending |

---

*Herbert's © 2026 · Updated April 2026*
