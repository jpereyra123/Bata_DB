import { z } from "zod";
import { EstadoAlumno } from "@prisma/client";

export const createAlumnoSchema = z.object({
    nombre: z.string().min(2).max(100),
    email: z.string().email(),
    curso: z.string().min(1).max(100),
    estado: z.nativeEnum(EstadoAlumno).optional(),
});

export const updateAlumnoSchema = createAlumnoSchema.partial();
export const uuidSchema = z.string().uuid();

export type CreateAlumnoInput = z.infer<typeof createAlumnoSchema>;
export type UpdateAlumnoInput = z.infer<typeof updateAlumnoSchema>;