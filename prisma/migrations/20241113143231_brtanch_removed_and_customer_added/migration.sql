/*
  Warnings:

  - You are about to drop the column `branchId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `Profit` table. All the data in the column will be lost.
  - You are about to drop the column `totalExpensesPerDayId` on the `Profit` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Branch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TotalExpensesPerDay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_totalExpensesPerDayId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Profit" DROP CONSTRAINT "Profit_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Profit" DROP CONSTRAINT "Profit_totalExpensesPerDayId_fkey";

-- DropForeignKey
ALTER TABLE "TotalExpensesPerDay" DROP CONSTRAINT "TotalExpensesPerDay_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_branchId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_branchId_fkey";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "branchId";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "branchId",
ADD COLUMN     "customerId" UUID;

-- AlterTable
ALTER TABLE "Profit" DROP COLUMN "branchId",
DROP COLUMN "totalExpensesPerDayId";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "branchId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "branchId";

-- DropTable
DROP TABLE "Branch";

-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "TotalExpensesPerDay";

-- CreateTable
CREATE TABLE "Customer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
