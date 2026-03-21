import { prisma } from "../../../lib/prisma";
import { Prisma, EstadoAlumno } from "@prisma/client";

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
    tieneFichaMedica: true,
    fechaFichaMedica: true
} satisfies Prisma.AlumnoSelect;

export const alumnosService = {
    async findAll({ search, etapa, estado, page }: any) {
        const PAGE_SIZE = 15;

        const filters = [];

        if (search) {
            filters.push({
                OR: [
                    { nombre: { contains: search, mode: Prisma.QueryMode.insensitive } },
                    { apellido: { contains: search, mode: Prisma.QueryMode.insensitive } },
                    { dni: { contains: search } },
                    { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
                ],
            });
        }

        if (etapa) filters.push({ etapa });
        if (estado) filters.push({ estado: estado as EstadoAlumno });

        const where = filters.length ? { AND: filters } : {};

        const [data, total] = await Promise.all([
            prisma.alumno.findMany({
                where,
                select: alumnoSelect,
                orderBy: { createdAt: "desc" },
                skip: page ? (page - 1) * PAGE_SIZE : undefined,
                take: page ? PAGE_SIZE : undefined,
            }),
            prisma.alumno.count({ where }),
        ]);

        return {
            data,
            total,
            totalPaginas: Math.ceil(total / PAGE_SIZE),
        };
    },

    async findById(id: string) {
        return prisma.alumno.findUnique({
            where: { id },
            select: alumnoSelect,
        });
    },

    async count() { return prisma.alumno.count(); },

    async findByEmail(email: string) {
        return prisma.alumno.findUnique({ where: { email }, select: alumnoSelect });
    },

    async create(data: any) {
        const { id, ...dataAlumno } = data.alumno;
        const dataTutor = data.tutores.map(({id, activo, ...data}) => data);
        return await prisma.$transaction(async (tx) => {
        const alumno = await tx.alumno.create({
            data: dataAlumno,
            });

            for (const tutor of dataTutor) {
                const tutorCreado = await tx.tutor.upsert({
                    where: { email: tutor.email }, // o dni u otro campo único
                    update: {},
                    create: tutor,
                });

                await tx.alumnoTutor.upsert({
                    where: {
                        alumnoId_tutorId: {
                            alumnoId: alumno.id,
                            tutorId: tutorCreado.id,
                        },
                    },
                    update: {},
                    create: {
                        alumnoId: alumno.id,
                        tutorId: tutorCreado.id,
                    },
                });
                }
            return alumno;
        });
    },

    async update(id: string, data: any) {
        return prisma.alumno.update({
            where: { id },
            data,
            select: alumnoSelect,
        });
    },

    async delete(id: string) {
        return prisma.alumno.delete({
            where: { id },
        });
    },
};

