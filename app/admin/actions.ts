"use server";

import { revalidatePath } from "next/cache";
import { setProductStock } from "@/lib/stock";

export async function updateStock(productId: string, quantity: number) {
  if (!Number.isInteger(quantity) || quantity < 0) return;
  await setProductStock(productId, quantity);
  revalidatePath("/admin");
  revalidatePath("/", "layout");
}
