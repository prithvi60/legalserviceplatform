/*
  Warnings:

  - Added the required column `formData` to the `BusinessForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessForm" ADD COLUMN     "formData" JSONB NOT NULL;
