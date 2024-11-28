/*
  Warnings:

  - A unique constraint covering the columns `[inventoryId]` on the table `Batch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rawMaterialId]` on the table `Batch` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Batch_inventoryId_key" ON "Batch"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Batch_rawMaterialId_key" ON "Batch"("rawMaterialId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
