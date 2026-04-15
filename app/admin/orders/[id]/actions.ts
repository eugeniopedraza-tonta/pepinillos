"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function markAsShipped(orderId: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: {
      fulfillmentStatus: "shipped",
      shippedAt: new Date(),
    },
  });
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}
