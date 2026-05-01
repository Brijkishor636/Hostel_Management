/*
  Warnings:

  - Added the required column `title` to the `Complaint` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ComplaintPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Complaint" ADD COLUMN     "priority" "ComplaintPriority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "title" TEXT NOT NULL;
