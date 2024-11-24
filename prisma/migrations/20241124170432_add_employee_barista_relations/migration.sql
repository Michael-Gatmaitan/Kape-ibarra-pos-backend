-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "baristaId" UUID;

-- RenameForeignKey
ALTER TABLE "Order" RENAME CONSTRAINT "Order_employeeId_fkey" TO "fk_order_employee";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "fk_order_barista" FOREIGN KEY ("baristaId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
