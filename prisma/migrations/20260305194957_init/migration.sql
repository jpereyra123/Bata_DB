/*
  Warnings:

  - You are about to drop the `Alumno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EstadoAlumno" AS ENUM ('PENDIENTE', 'ACTIVO', 'INACTIVO');

-- DropTable
DROP TABLE "Alumno";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alumnos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "dni" TEXT NOT NULL DEFAULT '',
    "telefono" TEXT NOT NULL DEFAULT '',
    "fechaNacimiento" TEXT NOT NULL DEFAULT '',
    "curso" TEXT NOT NULL,
    "notas" TEXT NOT NULL DEFAULT '',
    "estado" "EstadoAlumno" NOT NULL DEFAULT 'PENDIENTE',
    "tutorNombre" TEXT NOT NULL DEFAULT '',
    "tutorDni" TEXT NOT NULL DEFAULT '',
    "tutorRelacion" TEXT NOT NULL DEFAULT '',
    "tutorCelular" TEXT NOT NULL DEFAULT '',
    "tutorDireccion" TEXT NOT NULL DEFAULT '',
    "tutorOcupacion" TEXT NOT NULL DEFAULT '',
    "tutorObraSocial" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alumnos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "alumnos_email_key" ON "alumnos"("email");
