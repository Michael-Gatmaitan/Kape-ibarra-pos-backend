/*
  Warnings:

  - Added the required column `reorderLevel` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "reorderLevel" INTEGER NOT NULL;
