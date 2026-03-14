-- DropForeignKey
ALTER TABLE "AlumnoTutor" DROP CONSTRAINT "AlumnoTutor_alumnoId_fkey";

-- DropForeignKey
ALTER TABLE "AlumnoTutor" DROP CONSTRAINT "AlumnoTutor_tutorId_fkey";

-- AddForeignKey
ALTER TABLE "AlumnoTutor" ADD CONSTRAINT "AlumnoTutor_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "alumnos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumnoTutor" ADD CONSTRAINT "AlumnoTutor_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
