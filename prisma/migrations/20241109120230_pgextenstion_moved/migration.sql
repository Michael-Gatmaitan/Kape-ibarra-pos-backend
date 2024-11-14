/*
  Warnings:

  - You are about to drop the column `amountPaid` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `change` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTendered` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vatAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vatableSales` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "totalPrice" SET DEFAULT 0,
ALTER COLUMN "totalPrice" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "quantityAmount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Profit" ALTER COLUMN "dailySales" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "dailyProfit" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "RawMaterial" ALTER COLUMN "rawPrice" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "rawCost" SET DEFAULT 0,
ALTER COLUMN "rawCost" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TotalExpensesPerDay" ALTER COLUMN "totalExpenses" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amountPaid",
ADD COLUMN     "change" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalTendered" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vatAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vatableSales" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Tax" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "taxPercent" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("id")
);
