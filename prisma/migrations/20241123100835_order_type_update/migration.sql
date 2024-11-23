/*
  Warnings:

  - Added the required column `orderType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderType" TEXT NOT NULL,
ADD COLUMN     "proofOfPaymentImg" TEXT,
ALTER COLUMN "orderStatus" SET DEFAULT 'preparing',
ALTER COLUMN "orderStatus" SET DATA TYPE TEXT;
