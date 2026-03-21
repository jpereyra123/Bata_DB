import { prisma } from "../../../lib/prisma";
import { EstadoAlumno, Prisma } from "@prisma/client";

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
    fechaFichaMedica: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.AlumnoSelect;

interface findAllProps {
    search: string
    etapa: string | null
    estado: string | null
    page: number | null
}

const PAGE_SIZE = 15;

export const alumnosService = {
    async findAll({ search, etapa, estado, page }: findAllProps) {
        let skip;
        let take;
        if (page) {
            skip = (page - 1) * PAGE_SIZE;
            take = PAGE_SIZE; 
        }
        

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

        if (etapa) {
        filters.push({ etapa });
        }

        if (estado) {
        filters.push({ estado: estado as EstadoAlumno });
        }

        const where = filters.length ? { AND: filters } : {};

        const [data, total] = await Promise.all([
        prisma.alumno.findMany({
            where,
            select: alumnoSelect,
            orderBy: { createdAt: "desc" },
            skip,
            take,
        }),
        prisma.alumno.count({ where }),
        ]);

        const totalPaginas = Math.ceil(total / PAGE_SIZE);

        return { data, total, totalPaginas};
    },

    async count() {
        return prisma.alumno.count();
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
        const { ...alumno } = data;
        console.log(data);
        return await prisma.alumno.update({
            where: { id },
            data: { ...alumno }
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