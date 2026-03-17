"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={async (event) => {
        event.preventDefault();
        setState("loading");
        const form = event.currentTarget;
        const formData = new FormData(form);
        await fetch("/api/newsletter", {
          method: "POST",
          body: JSON.stringify({ email: formData.get("email") }),
          headers: { "Content-Type": "application/json" }
        });
        form.reset();
        setState("done");
      }}
    >
      <input
        required
        type="email"
        name="email"
        placeholder="correo@ejemplo.com"
        className="min-w-0 flex-1 rounded-full border border-[var(--brand-olive)]/15 bg-white/90 px-5 py-3 text-sm text-[var(--brand-olive)] outline-none ring-0 placeholder:text-[var(--brand-copy-muted)]"
      />
      <button
        type="submit"
        className="rounded-full bg-[var(--brand-earth)] px-5 py-3 text-sm font-semibold text-[var(--brand-cream)] transition hover:-translate-y-0.5"
      >
        {state === "loading" ? "Sending..." : state === "done" ? "Subscribed" : "Join"}
      </button>
    </form>
  );
}
