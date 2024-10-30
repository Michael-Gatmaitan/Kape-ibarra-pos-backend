/*
  Warnings:

  - You are about to drop the column `catergoryId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_catergoryId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "orderStatus" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "catergoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
