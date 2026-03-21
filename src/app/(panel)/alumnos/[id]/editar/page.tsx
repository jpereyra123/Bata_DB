import Link from "next/link";
import { alumnosService } from "@/features/alumnos/services/alumnos.service";
import { notFound } from "next/navigation";
import EditarAlumnoForm from "../../../../../features/alumnosViejo/[id]/editar/EditarAlumnoForm";
import FormularioAlumno from "@/features/alumnos/components/Formulario/FormularioAlumno";
import crearAlumnoData from "@/features/alumnos/services/crearAlumnoData";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditarAlumnoPage({ params }: Props) {
    const { id } = await params;
    const alumnoData = await crearAlumnoData(id);
    if (!alumnoData) notFound();
    
    return (
        <FormularioAlumno id={id} data={alumnoData} />
    );
}