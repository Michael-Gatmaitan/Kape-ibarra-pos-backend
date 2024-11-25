/*
  Warnings:

  - You are about to drop the column `cpNum` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "gender" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "cpNum",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;
