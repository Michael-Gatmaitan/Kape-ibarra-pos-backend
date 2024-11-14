CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- CreateTable
CREATE TABLE "Branch" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "streetAddress" TEXT NOT NULL,
    "baranggay" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "province" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,


CONSTRAINT "Branch_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Expense" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "totalExpensesPerDayId" UUID NOT NULL,
    "expenseAmount" INTEGER NOT NULL,
    "descriptionOfExpense" TEXT NOT NULL,


CONSTRAINT "Expense_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Inventory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "branchId" UUID NOT NULL,
    "rawMaterialId" UUID NOT NULL,
    "quantityInUnit" INTEGER NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "isReorderNeeded" BOOLEAN NOT NULL,


CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orderedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branchId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "customerNumber" SERIAL NOT NULL,
    "totalPrice" INTEGER NOT NULL DEFAULT 0,
    "orderStatus" BOOLEAN NOT NULL DEFAULT false,


CONSTRAINT "Order_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orderId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "quantityAmount" INTEGER NOT NULL,


CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "categoryName" TEXT NOT NULL,


CONSTRAINT "Category_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "categoryId" UUID NOT NULL,
    "productName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,


CONSTRAINT "Product_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Profit" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "totalExpensesPerDayId" UUID NOT NULL,
    "branchId" UUID NOT NULL,
    "days" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dailySales" INTEGER NOT NULL,
    "dailyProfit" INTEGER NOT NULL,


CONSTRAINT "Profit_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "RawMaterial" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "materialName" TEXT NOT NULL,
    "quantityInUnitPerItem" INTEGER NOT NULL,
    "rawPrice" INTEGER NOT NULL,


CONSTRAINT "RawMaterial_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Recipe" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "rawMaterialId" UUID NOT NULL,
    "quantityInUnitPcsNeeded" INTEGER NOT NULL,
    "rawCost" INTEGER NOT NULL DEFAULT 0,


CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roleName" TEXT NOT NULL,


CONSTRAINT "Role_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "TotalExpensesPerDay" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "branchId" UUID NOT NULL,
    "days" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalExpenses" INTEGER NOT NULL,


CONSTRAINT "TotalExpensesPerDay_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Transaction" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "orderId" UUID NOT NULL,
    "branchId" UUID NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "amountPaid" INTEGER NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,


CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roleId" UUID NOT NULL,
    "branchId" UUID NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "cpNum" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,


CONSTRAINT "User_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "Batch" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventoryId" UUID NOT NULL,
    "batchQuantity" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "recievedDate" TIMESTAMP(3) NOT NULL,
    "daysUntilExpiration" INTEGER NOT NULL,
    "notifWarning" BOOLEAN NOT NULL,
    "isExpired" BOOLEAN NOT NULL,
    "isDisposed" BOOLEAN NOT NULL,


CONSTRAINT "Batch_pkey" PRIMARY KEY ("id") );

-- CreateTable
CREATE TABLE "SystemNotification" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventoryId" UUID NOT NULL,
    "notificationDate" TIMESTAMP(3) NOT NULL,
    "stauts" TEXT NOT NULL,
    "isSolved" BOOLEAN NOT NULL,


CONSTRAINT "SystemNotification_pkey" PRIMARY KEY ("id") );

-- CreateIndex
CREATE UNIQUE INDEX "Branch_streetAddress_key" ON "Branch" ("streetAddress");

-- AddForeignKey
ALTER TABLE "Expense"
ADD CONSTRAINT "Expense_totalExpensesPerDayId_fkey" FOREIGN KEY ("totalExpensesPerDayId") REFERENCES "TotalExpensesPerDay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory"
ADD CONSTRAINT "Inventory_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory"
ADD CONSTRAINT "Inventory_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "RawMaterial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order"
ADD CONSTRAINT "Order_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order"
ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product"
ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profit"
ADD CONSTRAINT "Profit_totalExpensesPerDayId_fkey" FOREIGN KEY ("totalExpensesPerDayId") REFERENCES "TotalExpensesPerDay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profit"
ADD CONSTRAINT "Profit_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe"
ADD CONSTRAINT "Recipe_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe"
ADD CONSTRAINT "Recipe_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "RawMaterial" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TotalExpensesPerDay"
ADD CONSTRAINT "TotalExpensesPerDay_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction"
ADD CONSTRAINT "Transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction"
ADD CONSTRAINT "Transaction_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User"
ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User"
ADD CONSTRAINT "User_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch"
ADD CONSTRAINT "Batch_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemNotification"
ADD CONSTRAINT "SystemNotification_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ADD COLUMN "id" UUID NOT NULL DEFAULT gen_random_uuid (),
-- ADD PRIMARY KEY ("id");