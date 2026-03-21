import { EstadoAlumno, Tutor } from "@prisma/client";

export interface TutorData {
    id_tutor: number;
    nombre: string;
    apellido: string;
    dni: string;
    email: string | null;
    telefono: string;
    telefonoAlt: string;
    notas?: string;
    relacion: string;
    direccion: string;
    ocupacion: string;
    obraSocial: string;
}

export interface AlumnoData {
    nombre: string,
    apellido: string,
    email: string,
    dni: string,
    direccion: string,
    telefono: string,
    fechaNacimiento: string,
    etapa: string,
    curso: string | null,
    estado: EstadoAlumno,
    fueBautizado: boolean,
    tomoComunion: boolean,
    tomoConfirmacion: boolean,
    alergias: string,
    medicaciones: string,
    condicionesMedicas: string,
    obraSocial: string,
    numeroAfiliado: string,
    tieneFichaMedica: boolean,
    fechaFichaMedica: string,
    seRetiraSolo: boolean,
    tutores: TutorData[]
}

export type Alumno = {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  etapa: string;
  estado: EstadoAlumno;
};

export const etapas = [
  "Todas",
  "Pichones",
  "Horneros",
  "Cam/Ch",
  "Pioneros/Fuegos",
  "Rastr/Hog",
  "Baq/Ant",
  "Baq/Ant inst",
  "Soles",
];