-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "carNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_carNumber_key" ON "Car"("carNumber");

-- CreateIndex
CREATE INDEX "Car_carNumber_idx" ON "Car"("carNumber");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
