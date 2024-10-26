/*
  Warnings:

  - You are about to drop the column `quanityAmount` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `quantityAmount` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "totalPrice" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "quanityAmount",
ADD COLUMN     "quantityAmount" INTEGER NOT NULL;
