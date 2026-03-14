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
    etapa: true,
    curso: true,
    direccion: true,
    estado: true,
    notas: true,
    fueBautizado: true,
    tomoComunion: true,
    tomoConfirmacion: true,
    alergias: true,
    medicaciones: true,
    condicionesMedicas: true,
    obraSocial: true,
    numeroAfiliado: true,
    seRetiraSolo: true,
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

    async findTutors(alumnoId: string) {
    const alumno = await prisma.alumno.findUnique({
        where: { id: alumnoId },
        select: {
        tutores: {
            select: {
            tutor: true
            }
        }
        }
    });

    return alumno?.tutores.map(t => t.tutor) ?? [];
    },

    async findById(id: string) {
        return prisma.alumno.findUnique({
            where: { id },
            select: {
                ...alumnoSelect,
                tutores: {
                    select: {
                        loPuedeRetirar: true,
                        tutor: true
                    }
                }
            }
        });
    },

    async findByEmail(email: string) {
        return prisma.alumno.findUnique({ where: { email }, select: alumnoSelect });
    },

    async create(data: any) {
        const { tutores, ...alumno } = data;

        return prisma.alumno.create({
            data: {
                ...alumno,
                tutores: {
                    create: tutores.map((t: any) => ({
                        tutor: {
                            create: t
                        }
                    }))
                }
            },
            select: alumnoSelect
        });
    },

    async update(id: string, data: any) {
        const { tutores, ...alumno } = data;

        return prisma.alumno.update({
            where: { id },
            data: {
                ...alumno,
                tutores: {
                    deleteMany: {},
                    create: tutores.map((t: any) => ({
                        tutor: {
                            create: t
                        }
                    }))
                }
            },
            select: alumnoSelect
        });
    },

    async delete(id: string) {
        await prisma.alumnoTutor.deleteMany({
            where: { alumnoId: id }
        });

        return prisma.alumno.delete({
            where: { id }
        });
    }
};