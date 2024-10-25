/*
  Warnings:

  - You are about to drop the column `cpNum` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `manager` on the `Branch` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - A unique constraint covering the columns `[streetAddress]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `baranggay` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderStatus` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "cpNum",
DROP COLUMN "location",
DROP COLUMN "manager",
ADD COLUMN     "baranggay" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL,
ADD COLUMN     "zipCode" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "branchId" INTEGER NOT NULL,
ADD COLUMN     "orderStatus" BOOLEAN NOT NULL,
ADD COLUMN     "totalPrice" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "description" TEXT,
ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "totalExpensesPerDayId" INTEGER NOT NULL,
    "expenseAmount" INTEGER NOT NULL,
    "descriptionOfExpense" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "branchId" INTEGER NOT NULL,
    "rawMaterialId" INTEGER NOT NULL,
    "quantityInUnit" INTEGER NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "isReorderNeeded" BOOLEAN NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profit" (
    "id" SERIAL NOT NULL,
    "totalExpensesPerDayId" INTEGER NOT NULL,
    "brachId" INTEGER NOT NULL,
    "days" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dailySales" INTEGER NOT NULL,
    "dailyProfit" INTEGER NOT NULL,

    CONSTRAINT "Profit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawMaterial" (
    "id" SERIAL NOT NULL,
    "materialName" TEXT NOT NULL,
    "quantityInUnitPerItem" INTEGER NOT NULL,

    CONSTRAINT "RawMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "rawMaterialId" INTEGER NOT NULL,
    "quantityInUnitPcsNeeded" INTEGER NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TotalExpensesPerDay" (
    "id" SERIAL NOT NULL,
    "branchId" INTEGER NOT NULL,
    "days" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalExpenses" INTEGER NOT NULL,

    CONSTRAINT "TotalExpensesPerDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "amountPaid" INTEGER NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "batchQuantity" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "recievedDate" TIMESTAMP(3) NOT NULL,
    "daysUntilExpiration" INTEGER NOT NULL,
    "notifWarning" BOOLEAN NOT NULL,
    "isExpired" BOOLEAN NOT NULL,
    "isDisposed" BOOLEAN NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemNotification" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "notificationDate" TIMESTAMP(3) NOT NULL,
    "stauts" TEXT NOT NULL,
    "isSolved" BOOLEAN NOT NULL,

    CONSTRAINT "SystemNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Branch_streetAddress_key" ON "Branch"("streetAddress");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_totalExpensesPerDayId_fkey" FOREIGN KEY ("totalExpensesPerDayId") REFERENCES "TotalExpensesPerDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "RawMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profit" ADD CONSTRAINT "Profit_totalExpensesPerDayId_fkey" FOREIGN KEY ("totalExpensesPerDayId") REFERENCES "TotalExpensesPerDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profit" ADD CONSTRAINT "Profit_brachId_fkey" FOREIGN KEY ("brachId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "RawMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TotalExpensesPerDay" ADD CONSTRAINT "TotalExpensesPerDay_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemNotification" ADD CONSTRAINT "SystemNotification_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
