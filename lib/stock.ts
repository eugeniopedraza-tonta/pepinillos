import { prisma } from "@/lib/prisma";

export async function getAllStock(): Promise<Map<string, number>> {
  const rows = await prisma.productStock.findMany();
  const map = new Map<string, number>();
  for (const row of rows) {
    map.set(row.productId, row.quantity);
  }
  return map;
}

export async function getProductStock(productId: string): Promise<number> {
  const row = await prisma.productStock.findUnique({ where: { productId } });
  return row?.quantity ?? 0;
}

export async function setProductStock(productId: string, quantity: number): Promise<void> {
  await prisma.productStock.upsert({
    where: { productId },
    update: { quantity },
    create: { productId, quantity },
  });
}

export async function checkStockForCart(
  items: { productId: string; quantity: number }[]
): Promise<{ ok: boolean; violations: { productId: string; requested: number; available: number }[] }> {
  const stockMap = await getAllStock();
  const violations: { productId: string; requested: number; available: number }[] = [];

  for (const item of items) {
    const available = stockMap.get(item.productId) ?? 0;
    if (item.quantity > available) {
      violations.push({ productId: item.productId, requested: item.quantity, available });
    }
  }

  return { ok: violations.length === 0, violations };
}
