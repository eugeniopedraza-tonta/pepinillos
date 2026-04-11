import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const getCheckoutConfirmation = vi.fn();

vi.mock("@/lib/orders", () => ({
  getCheckoutConfirmation
}));

vi.mock("@/components/clear-cart-on-mount", () => ({
  ClearCartOnMount: () => null
}));

describe("checkout result pages", () => {
  beforeEach(() => {
    vi.resetModules();
    getCheckoutConfirmation.mockReset();
  });

  it("renders the success page missing-session state", async () => {
    getCheckoutConfirmation.mockResolvedValue({
      state: "missing",
      order: null
    });
    const { default: SuccessPage } = await import(
      "@/app/[locale]/checkout/success/page"
    );

    const html = renderToStaticMarkup(
      await SuccessPage({
        params: Promise.resolve({ locale: "es" }),
        searchParams: Promise.resolve({})
      })
    );

    expect(html).toContain("Falta el identificador de la sesión");
    expect(html).toContain("Volver a la tienda");
  });

  it("renders the success page processing state", async () => {
    getCheckoutConfirmation.mockResolvedValue({
      state: "processing",
      order: null
    });
    const { default: SuccessPage } = await import(
      "@/app/[locale]/checkout/success/page"
    );

    const html = renderToStaticMarkup(
      await SuccessPage({
        params: Promise.resolve({ locale: "en" }),
        searchParams: Promise.resolve({ session_id: "cs_test_123" })
      })
    );

    expect(html).toContain("We are confirming your payment");
    expect(html).toContain("Back to shop");
  });

  it("renders the cancel page", async () => {
    const { default: CancelPage } = await import("@/app/[locale]/checkout/cancel/page");

    const html = renderToStaticMarkup(
      await CancelPage({
        params: Promise.resolve({ locale: "en" })
      })
    );

    expect(html).toContain("Checkout canceled");
    expect(html).toContain("Back to catalog");
  });
});
