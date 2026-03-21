import { prisma } from "../../../lib/prisma";

const tutorAlumnoSelect = {
    alumnoId: true,
    tutorId: true,
    loPuedeRetirar: true,

    tutor: {
        select: {
            id: true,
            email: true,
            nombre: true,
            apellido: true,
            dni: true,
            telefono: true,
            direccion: true,
            notas: true,
            obraSocial: true,
            telefonoAlt: true,
            relacion: true,
            ocupacion: true
        }
    }
}

export const alumnoTutorService = {
    
    async getByAlumno(alumnoId: string) {
        const res = await prisma.alumnoTutor.findMany({
            where: { alumnoId },
            select: tutorAlumnoSelect
        });

        return res;
    },

    async setTutores(alumnoId: string, tutores: any[]) {
        await prisma.alumnoTutor.deleteMany({
            where: { alumnoId },
        });

        for (const t of tutores) {
            const tutor = await prisma.tutor.upsert({
                where: { dni: t.dni },
                update: {},
                create: t,
            });

            await prisma.alumnoTutor.create({
                data: {
                    alumnoId,
                    tutorId: tutor.id,
                    loPuedeRetirar: t.loPuedeRetirar ?? false,
                },
            });
        }
    }
};