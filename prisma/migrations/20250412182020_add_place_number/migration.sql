/*
  Warnings:

  - Added the required column `placeNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "placeNumber" TEXT NOT NULL;
