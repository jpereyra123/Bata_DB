import { notFound } from "next/navigation";
import getBadge from "@/features/alumnos/services/getBadge";
import { alumnosService } from "@/features/alumnos/services/alumnos.service";
import FichaAlumno from "@/features/alumnos/components/Ficha/FichaAumno";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function FichaAlumnoPage({ params }: Props) {
    return (<FichaAlumno params={params}/>)
}