import Link from "next/link";
import { alumnosService } from "@/features/alumnos/services/alumnos.service";
import { notFound } from "next/navigation";
import EditarAlumnoForm from "../../../../../features/alumnosViejo/[id]/editar/EditarAlumnoForm";
import FormularioAlumno from "@/features/alumnos/components/Formulario/FormularioAlumno";
import { AlumnoData } from "@/features/alumnos/types";
import { alumnoTutorService } from "@/features/alumnos/services/alumnoTutor.service";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditarAlumnoPage({ params }: Props) {
    const { id } = await params;
    console.log("idAlumno:", id);
    const alumnoData = await alumnosService.findById(id)
    if (!alumnoData) notFound();
    
    return (
        <FormularioAlumno id={id} alumno={alumnoData} />
    );
}