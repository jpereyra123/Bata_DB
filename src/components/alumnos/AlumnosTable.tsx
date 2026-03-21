"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { EstadoAlumno } from "@prisma/client";

interface AlumnoRow {
    id: string;
    nombre: string;
    email: string;
    curso: string;
    estado: EstadoAlumno;
    createdAt: Date | string;
}

export function AlumnosTable({ alumnos }: { alumnos: AlumnoRow[] }) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState("");

    async function handleDelete(id: string, nombre: string) {
        if (!window.confirm(`¿Eliminar a "${nombre}"?`)) return;
        setDeletingId(id);
        setError("");
        try {
            const res = await fetch(`/api/alumnos/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const body = await res.json();
                throw new Error(body.error ?? "Error al eliminar");
            }
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error inesperado");
        } finally {
            setDeletingId(null);
        }
    }

    if (alumnos.length === 0) {
        return (
            <div style={{ padding: "64px 32px", textAlign: "center", color: "#888" }}>
                No hay alumnos registrados
            </div>
        );
    }

    return (
        <>
            {error && (
                <div style={{ margin: 16, padding: "10px 14px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, color: "#ef4444", fontSize: 13 }}>
                    {error}
                </div>
            )}
            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <thead>
                        <tr>
                            {["Nombre", "Email", "Curso", "Estado", "Registrado", "Acciones"].map((h) => (
                                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "#5c5b6e", borderBottom: "1px solid #2e2e38" }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.map((alumno) => (
                            <tr key={alumno.id}>
                                <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#f0eff4", fontWeight: 600 }}>{alumno.nombre}</td>
                                <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{alumno.email}</td>
                                <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{alumno.curso}</td>
                                <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38" }}>
                                    <span style={{
                                        padding: "2px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                                        background: alumno.estado === "ACTIVO" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                                        color: alumno.estado === "ACTIVO" ? "#22c55e" : "#ef4444",
                                    }}>
                                        {alumno.estado === "ACTIVO" ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>
                                    {new Date(alumno.createdAt).toLocaleDateString("es-AR")}
                                </td>
                                <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38" }}>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <Link href={`/alumnos/${alumno.id}/editar`} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #2e2e38", color: "#9b9aaa", textDecoration: "none", fontSize: 13 }}>
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(alumno.id, alumno.nombre)}
                                            disabled={deletingId === alumno.id}
                                            style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 13, cursor: "pointer" }}
                                        >
                                            {deletingId === alumno.id ? "..." : "Eliminar"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}