-- CreateTable
CREATE TABLE "BusinessForm" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "DocType" TEXT NOT NULL,
    "DocNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessForm_userId_DocNumber_key" ON "BusinessForm"("userId", "DocNumber");

-- AddForeignKey
ALTER TABLE "BusinessForm" ADD CONSTRAINT "BusinessForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
