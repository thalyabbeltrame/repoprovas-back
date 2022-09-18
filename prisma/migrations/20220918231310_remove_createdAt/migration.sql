/*
  Warnings:

  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `disciplines` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `teachersDisciplines` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `terms` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "disciplines" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "teachersDisciplines" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "terms" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt";
