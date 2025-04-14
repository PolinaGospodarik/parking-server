/*
  Warnings:

  - Changed the type of `placeNumber` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "placeNumber",
ADD COLUMN     "placeNumber" INTEGER NOT NULL;
