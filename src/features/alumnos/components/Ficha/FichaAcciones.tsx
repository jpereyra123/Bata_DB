"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { fichaAlumnosService } from "../../services/fichaAlumnos.service";

interface Props {
    alumnoId: string;
    estado: string;
}

export default function FichaAcciones({ alumnoId, estado }: Props) {
    const router = useRouter(); 
    return (
        <>
            {/* Botones de accion */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {estado === "PENDIENTE" && (
                    <>
                        <button
                            onClick={() => fichaAlumnosService.handleEstado(alumnoId, "ACTIVO", router)}
                            style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.12)", color: "#22c55e", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                        >
                            Aprobar
                        </button>
                        <button
                            onClick={() => fichaAlumnosService.handleEstado(alumnoId, "INACTIVO", router)}
                            style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                        >
                            Rechazar
                        </button>
                    </>
                )}
                {estado === "ACTIVO" && (
                    <button
                        onClick={() => fichaAlumnosService.handleEstado(alumnoId, "INACTIVO", router)}
                        style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                    >
                        Desactivar
                    </button>
                )}
                {estado === "INACTIVO" && (
                    <button
                        onClick={() => fichaAlumnosService.handleEstado(alumnoId, "ACTIVO", router)}
                        style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.12)", color: "#22c55e", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                    >
                        Activar
                    </button>
                )}
                <Link
                    href={`/alumnos/${alumnoId}/editar`}
                    style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #2e2e38", color: "#9b9aaa", textDecoration: "none", fontSize: 13, fontWeight: 600 }}
                >
                    Editar
                </Link>
                <button
                    onClick={() => fichaAlumnosService.handleDelete(alumnoId, router)}
                    style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                >
                    Eliminar
                </button>
            </div>
        </>
    );
}
