import { Alumno } from "../../types";
import { tablaAlumnosService } from "../../services/tablaAlumnos.service";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FilaAlumno({ alumno }: { alumno: Alumno }) {
    const router = useRouter();
    return (
        <tr key={alumno.id}>
            <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#f0eff4", fontWeight: 600 }}>{alumno.nombre}</td>
            <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{alumno.apellido}</td>
            <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{alumno.dni}</td>
            <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{alumno.fechaNacimiento}</td>
            <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{alumno.email}</td>
            <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{alumno.telefono}</td>
            <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{alumno.etapa}</td>
            <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38" }}>
            <span style={{ padding: "2px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600 /*...getBadgeStyle(alumno.estado)*/ }}>
                {alumno.estado}
            </span>
            </td>
            <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                {alumno.estado === "PENDIENTE" && (
                <>
                    <button
                    onClick={() => tablaAlumnosService.handleEstado(alumno.id, "ACTIVO", router)}
                    style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.12)", color: "#22c55e", fontSize: 13, cursor: "pointer" }}
                    >
                    Aprobar
                    </button>
                    <button
                    onClick={() => tablaAlumnosService.handleEstado(alumno.id, "INACTIVO", router)}
                    style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 13, cursor: "pointer" }}
                    >
                    Rechazar
                    </button>
                </>
                )}
                <Link href={`/alumnos/${alumno.id}`} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(245,166,35,0.2)", background: "rgba(245,166,35,0.08)", color: "#f5a623", textDecoration: "none", fontSize: 13 }}>
                Ver ficha
                </Link>
                <button
                onClick={() => tablaAlumnosService.handleDelete(alumno.id, alumno.nombre, router)}
                style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 13, cursor: "pointer" }}
                >
                Eliminar
                </button>
            </div>
            </td>
        </tr>
    )
}