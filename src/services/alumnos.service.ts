import { prisma } from "../lib/prisma";
import type { Prisma } from "@prisma/client";

const alumnoSelect = {
    id: true,
    nombre: true,
    apellido: true,
    email: true,
    dni: true,
    telefono: true,
    fechaNacimiento: true,
    curso: true,
    estado: true,
    notas: true,
    tutorNombre: true,
    tutorDni: true,
    tutorRelacion: true,
    tutorCelular: true,
    tutorDireccion: true,
    tutorOcupacion: true,
    tutorObraSocial: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.AlumnoSelect;

export const alumnosService = {
    async findAll() {
        return prisma.alumno.findMany({
            select: alumnoSelect,
            orderBy: { createdAt: "desc" },
        });
    },

    async findById(id: string) {
        return prisma.alumno.findUnique({ where: { id }, select: alumnoSelect });
    },

    async findByEmail(email: string) {
        return prisma.alumno.findUnique({ where: { email }, select: alumnoSelect });
    },

    async create(data: any) {
        return prisma.alumno.create({ data, select: alumnoSelect });
    },

    async update(id: string, data: any) {
        return prisma.alumno.update({ where: { id }, data, select: alumnoSelect });
    },

    async delete(id: string) {
        return prisma.alumno.delete({ where: { id } });
    },
};