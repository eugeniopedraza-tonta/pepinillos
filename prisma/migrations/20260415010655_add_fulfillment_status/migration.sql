-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "locale" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "subtotalAmount" INTEGER NOT NULL,
    "stripeCheckoutSessionId" TEXT,
    "stripeCustomerId" TEXT,
    "stripePaymentIntentId" TEXT,
    "customerEmail" TEXT,
    "shippingName" TEXT,
    "shippingPhone" TEXT,
    "shippingAddressJson" TEXT,
    "fulfillmentStatus" TEXT NOT NULL DEFAULT 'unfulfilled',
    "shippedAt" DATETIME,
    "paidAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Order" ("createdAt", "currency", "customerEmail", "id", "locale", "paidAt", "shippingAddressJson", "shippingName", "shippingPhone", "status", "stripeCheckoutSessionId", "stripeCustomerId", "stripePaymentIntentId", "subtotalAmount", "updatedAt") SELECT "createdAt", "currency", "customerEmail", "id", "locale", "paidAt", "shippingAddressJson", "shippingName", "shippingPhone", "status", "stripeCheckoutSessionId", "stripeCustomerId", "stripePaymentIntentId", "subtotalAmount", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_stripeCheckoutSessionId_key" ON "Order"("stripeCheckoutSessionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
