/*
  Warnings:

  - You are about to drop the column `daysUntilExpiration` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `isDisposed` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `isExpired` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `notifWarning` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `recievedDate` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `rawCost` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `stauts` on the `SystemNotification` table. All the data in the column will be lost.
  - Added the required column `timeOut` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rawMaterialId` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `SystemNotification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "timeIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "timeOut" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "daysUntilExpiration",
DROP COLUMN "isDisposed",
DROP COLUMN "isExpired",
DROP COLUMN "notifWarning",
DROP COLUMN "recievedDate",
ADD COLUMN     "rawMaterialId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "rawCost";

-- AlterTable
ALTER TABLE "SystemNotification" DROP COLUMN "stauts",
ADD COLUMN     "status" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "RawMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
