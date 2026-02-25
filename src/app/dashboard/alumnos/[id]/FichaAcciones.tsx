"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
    alumnoId: string;
    estado: string;
}

export default function FichaAcciones({ alumnoId, estado }: Props) {
    const router = useRouter();

    async function handleEstado(nuevoEstado: string) {
        const res = await fetch(`/api/alumnos/${alumnoId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: nuevoEstado }),
        });
        if (res.ok) router.refresh();
        else alert("Error al actualizar estado");
    }

    async function handleDelete() {
        if (!confirm("Eliminar este alumno? Esta accion no se puede deshacer.")) return;
        const res = await fetch(`/api/alumnos/${alumnoId}`, { method: "DELETE" });
        if (res.ok) router.push("/dashboard/alumnos");
        else alert("Error al eliminar");
    }

    return (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {estado === "PENDIENTE" && (
                <>
                    <button
                        onClick={() => handleEstado("ACTIVO")}
                        style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.12)", color: "#22c55e", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                    >
                        Aprobar
                    </button>
                    <button
                        onClick={() => handleEstado("INACTIVO")}
                        style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                    >
                        Rechazar
                    </button>
                </>
            )}
            {estado === "ACTIVO" && (
                <button
                    onClick={() => handleEstado("INACTIVO")}
                    style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                >
                    Desactivar
                </button>
            )}
            {estado === "INACTIVO" && (
                <button
                    onClick={() => handleEstado("ACTIVO")}
                    style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.12)", color: "#22c55e", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                >
                    Activar
                </button>
            )}
            <Link
                href={`/dashboard/alumnos/${alumnoId}/editar`}
                style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #2e2e38", color: "#9b9aaa", textDecoration: "none", fontSize: 13, fontWeight: 600 }}
            >
                Editar
            </Link>
            <button
                onClick={handleDelete}
                style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
                Eliminar
            </button>
        </div>
    );
}
