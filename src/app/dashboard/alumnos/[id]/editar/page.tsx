import Link from "next/link";
import { alumnosService } from "../../../../../services/alumnos.service";
import { notFound } from "next/navigation";
import EditarAlumnoForm from "./EditarAlumnoForm";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditarAlumnoPage({ params }: Props) {
    const { id } = await params;
    const alumno = await alumnosService.findById(id);
    if (!alumno) notFound();

    return (
        <div style={{ maxWidth: 560 }}>
            <Link
                href="/dashboard/alumnos"
                style={{ fontSize: 13, color: "#9b9aaa", textDecoration: "none", display: "inline-block", marginBottom: 24 }}
            >
                Volver
            </Link>
            <h1 style={{ fontSize: 24, marginBottom: 24 }}>Editar alumno</h1>
            <EditarAlumnoForm alumno={alumno} />
        </div>
    );
}