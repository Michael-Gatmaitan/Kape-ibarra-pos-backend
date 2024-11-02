/*
  Warnings:

  - Added the required column `contactNumber` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;
