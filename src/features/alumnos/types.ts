import { EstadoAlumno, Tutor } from "@prisma/client";

export interface TutorData {
    id: string;
    email: string | null;
    nombre: string;
    apellido: string;
    dni: string;
    telefono: string;
    direccion: string;
    notas: string;
    obraSocial: string;
    telefonoAlt: string;
    relacion: string;
    ocupacion: string;
    activo: boolean;
}

export interface AlumnoData {
    id: string;
    etapa: string;
    estado: EstadoAlumno;
    email: string;
    nombre: string;
    apellido: string;
    dni: string;
    telefono: string;
    comoConocieron: string;
    fechaNacimiento: string;
    curso: string | null;
    direccion: string;
    notas: string;
    fueBautizado: boolean;
    tomoComunion: boolean;
    tomoConfirmacion: boolean;
    alergias: string;
    medicaciones: string;
    condicionesMedicas: string;
    obraSocial: string;
    numeroAfiliado: string;
    tieneFichaMedica: boolean;
    fechaFichaMedica: string;
    seRetiraSolo: boolean;
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