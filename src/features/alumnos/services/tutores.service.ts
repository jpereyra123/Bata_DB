import { prisma } from "../../../lib/prisma";

const tutorSelect = {
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

export const tutoresService = {
    async findById(id: string) {
        return prisma.tutor.findUnique({
            where: { id },
            select: tutorSelect
        });
    },

    async findByDni(dni: string) {
        return prisma.tutor.findUnique({
            where: { dni },
            select: tutorSelect
        });
    },

    async create(data: any) {
        const { id, ...cleanData } = data;
        return prisma.tutor.create({
            data: cleanData,
        });
    },

    async update(id: string, data: any) {
        return prisma.tutor.update({
            where: { id },
            data,
        });
    },
};