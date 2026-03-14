/*
  Warnings:

  - You are about to drop the column `estado` on the `tutores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "alumnos" ALTER COLUMN "dni" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tutores" DROP COLUMN "estado",
ALTER COLUMN "dni" SET DATA TYPE TEXT;
