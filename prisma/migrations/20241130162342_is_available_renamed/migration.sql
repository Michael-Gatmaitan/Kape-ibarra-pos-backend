/*
  Warnings:

  - You are about to drop the column `isAvalable` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isAvalable",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT false;
