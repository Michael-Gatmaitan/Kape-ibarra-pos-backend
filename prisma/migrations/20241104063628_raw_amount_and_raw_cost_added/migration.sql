/*
  Warnings:

  - Added the required column `rawPrice` to the `RawMaterial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rawCost` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RawMaterial" ADD COLUMN     "rawPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "rawCost" INTEGER NOT NULL;
