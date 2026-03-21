import { prisma } from "@/lib/prisma";

export default async function getStats() {
    const [total, activos, inactivos, pendientes, porEtapa] = await Promise.all([
        prisma.alumno.count(),
        prisma.alumno.count({ where: { estado: "ACTIVO" } }),
        prisma.alumno.count({ where: { estado: "INACTIVO" } }),
        prisma.alumno.count({ where: { estado: "PENDIENTE" } }),
        prisma.alumno.groupBy({
            by: ["etapa"],
            _count: { id: true },
            orderBy: { _count: { id: "desc" } },
        }),
    ]);
    return { total, activos, inactivos, pendientes, porEtapa };
}