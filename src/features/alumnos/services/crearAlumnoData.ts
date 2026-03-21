import { AlumnoData } from "../types";
import { alumnosService } from "./alumnos.service";

export default async function crearAlumnoData(idAlumno : string) {
    const alumnoPrisma = await alumnosService.findById(idAlumno);
    if (!alumnoPrisma) return null;

    const { id, createdAt, updatedAt, ...resto } = alumnoPrisma;

    const alumnoData: AlumnoData = {
    ...resto,
        tutores: alumnoPrisma.tutores.map((t, i) => ({
        id_tutor: i,
        nombre: t.tutor.nombre,
        apellido: t.tutor.apellido,
        dni: t.tutor.dni,
        telefono: t.tutor.telefono,
        telefonoAlt: t.tutor.telefonoAlt,
        relacion: t.tutor.relacion,
        ocupacion: t.tutor.ocupacion,
        direccion: t.tutor.direccion,
        email: t.tutor.email,
        obraSocial: t.tutor.obraSocial,
        notas: t.tutor.notas,
        loPuedeRetirar: t.loPuedeRetirar
    }))
    }
    return alumnoData;
}