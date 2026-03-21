import { notFound } from "next/navigation";
import { alumnosService } from "@/features/alumnos/services/alumnos.service";
import Link from "next/link";
import FichaAcciones from "./FichaAcciones";
import getBadge from "@/features/alumnos/services/getBadge";

import FichaHeader from "@/features/alumnos/components/Ficha/FichaHeader";
import NotasInternas from "@/features/alumnos/components/Ficha/NotasInternas";
import DatosAlumnos from "@/features/alumnos/components/Ficha/DatosAlumnos";
import DatosTutores from "@/features/alumnos/components/Ficha/DatosTutores";

interface Props {
    params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function FichaAlumno({ params }: Props) {
    const { id } = await params;
    const alumno = await alumnosService.findById(id);
    if (!alumno) notFound();

    return (
        <div style={{ maxWidth: 640 }}>
            <Link href="/alumnos" style={{ fontSize: 13, color: "#9b9aaa", textDecoration: "none", display: "inline-block", marginBottom: 24 }} >
                ← Volver a Alumnos
            </Link>

            <div style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 16, padding: 28, marginBottom: 20 }}>
                <FichaHeader alumno={alumno} />
                <NotasInternas alumnoId={alumno.id} notas={alumno.notas} />
                <DatosAlumnos alumno={alumno} />
                <DatosTutores tutores={alumno.tutores.map(tutorXAlumno => tutorXAlumno.tutor)} />
            </div>

            <p style={{ fontSize: 12, color: "#5c5b6e", textAlign: "right" }}>
                Ultima actualizacion: {new Date(alumno.updatedAt).toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
        </div>
    );
}