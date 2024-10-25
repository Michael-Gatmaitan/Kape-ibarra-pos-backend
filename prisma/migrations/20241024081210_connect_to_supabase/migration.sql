/*
  Warnings:

  - You are about to drop the column `shopId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Shop` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `branchId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_shopId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "shopId",
ADD COLUMN     "branchId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Shop";

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "cpNum" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
