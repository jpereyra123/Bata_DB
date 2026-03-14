/*
  Warnings:

  - You are about to drop the column `tutorCelular` on the `alumnos` table. All the data in the column will be lost.
  - You are about to drop the column `tutorDireccion` on the `alumnos` table. All the data in the column will be lost.
  - You are about to drop the column `tutorDni` on the `alumnos` table. All the data in the column will be lost.
  - You are about to drop the column `tutorNombre` on the `alumnos` table. All the data in the column will be lost.
  - You are about to drop the column `tutorObraSocial` on the `alumnos` table. All the data in the column will be lost.
  - You are about to drop the column `tutorOcupacion` on the `alumnos` table. All the data in the column will be lost.
  - You are about to drop the column `tutorRelacion` on the `alumnos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dni]` on the table `alumnos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `direccion` to the `alumnos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etapa` to the `alumnos` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dni` on the `alumnos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fechaNacimiento` on the `alumnos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "alumnos" DROP COLUMN "tutorCelular",
DROP COLUMN "tutorDireccion",
DROP COLUMN "tutorDni",
DROP COLUMN "tutorNombre",
DROP COLUMN "tutorObraSocial",
DROP COLUMN "tutorOcupacion",
DROP COLUMN "tutorRelacion",
ADD COLUMN     "alergias" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "condicionesMedicas" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "direccion" TEXT NOT NULL,
ADD COLUMN     "etapa" TEXT NOT NULL,
ADD COLUMN     "fueBautizado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "medicaciones" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "numeroAfiliado" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "obraSocial" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "seRetiraSolo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tieneAlergias" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tieneFichaMedica" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tomaMedicacion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tomoComunion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tomoConfirmacion" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "dni",
ADD COLUMN     "dni" INTEGER NOT NULL,
DROP COLUMN "fechaNacimiento",
ADD COLUMN     "fechaNacimiento" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "curso" DROP NOT NULL;

-- CreateTable
CREATE TABLE "tutores" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL DEFAULT '',
    "dni" INTEGER NOT NULL,
    "email" TEXT,
    "telefono" TEXT NOT NULL DEFAULT '',
    "telefonoAlt" TEXT NOT NULL DEFAULT '',
    "notas" TEXT NOT NULL DEFAULT '',
    "estado" "EstadoAlumno" NOT NULL DEFAULT 'PENDIENTE',
    "relacion" TEXT NOT NULL DEFAULT '',
    "direccion" TEXT NOT NULL DEFAULT '',
    "ocupacion" TEXT NOT NULL DEFAULT '',
    "obraSocial" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlumnoTutor" (
    "alumnoId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "loPuedeRetirar" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AlumnoTutor_pkey" PRIMARY KEY ("alumnoId","tutorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "tutores_dni_key" ON "tutores"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "tutores_email_key" ON "tutores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "alumnos_dni_key" ON "alumnos"("dni");

-- AddForeignKey
ALTER TABLE "AlumnoTutor" ADD CONSTRAINT "AlumnoTutor_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "alumnos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumnoTutor" ADD CONSTRAINT "AlumnoTutor_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
