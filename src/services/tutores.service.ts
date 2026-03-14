import { prisma } from "../lib/prisma";
import type { Prisma } from "@prisma/client";

const tutorSelect = {
    id: true,
    nombre: true,
    apellido: true,
    email: true,
    dni: true,
    telefono: true,
    telefonoAlt: true,
    notas: true,
    direccion: true,
    relacion: true,
    ocupacion: true,
    obraSocial: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.TutorSelect;

export const tutoresService = {
    async findAll() {
        return prisma.tutor.findMany({
            select: tutorSelect,
            orderBy: { createdAt: "desc" },
        });
    },

    async findById(id: string) {
        return prisma.tutor.findUnique({ where: { id }, select: tutorSelect });
    },

    async findByEmail(email: string) {
        return prisma.tutor.findUnique({ where: { email }, select: tutorSelect });
    },

    async create(data: any) {
        return prisma.tutor.create({ data, select: tutorSelect });
    },

    async update(id: string, data: any) {
        return prisma.tutor.update({ where: { id }, data, select: tutorSelect });
    },

    async delete(id: string) {
        return prisma.tutor.delete({ where: { id } });
    },
};