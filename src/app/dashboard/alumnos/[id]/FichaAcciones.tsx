"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface Props {
    alumnoId: string;
    estado: string;
    notas: string;
}

export default function FichaAcciones({ alumnoId, estado, notas }: Props) {
    const router = useRouter();
    const [notasValue, setNotasValue] = useState(notas);
    const [savingNotas, setSavingNotas] = useState(false);
    const [notasSaved, setNotasSaved] = useState(false);

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

    async function handleSaveNotas() {
        setSavingNotas(true);
        setNotasSaved(false);
        try {
            const res = await fetch(`/api/alumnos/${alumnoId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notas: notasValue }),
            });
            if (res.ok) {
                setNotasSaved(true);
                setTimeout(() => setNotasSaved(false), 2000);
                router.refresh();
            } else {
                alert("Error al guardar notas");
            }
        } catch {
            alert("Error de conexion");
        } finally {
            setSavingNotas(false);
        }
    }

    return (
        <>
            {/* Botones de accion */}
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

            {/* Notas internas */}
            <div style={{ marginTop: 20, background: "#18181c", border: "1px solid #2e2e38", borderRadius: 16, padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 16 }}>🔒</span>
                    <h2 style={{ fontSize: 15, fontWeight: 600, color: "#f0eff4" }}>Notas internas</h2>
                    <span style={{ fontSize: 11, color: "#5c5b6e", background: "#222228", padding: "2px 8px", borderRadius: 99 }}>Solo visible para admins</span>
                </div>
                <textarea
                    value={notasValue}
                    onChange={(e) => setNotasValue(e.target.value)}
                    placeholder="Escribi notas internas sobre este alumno..."
                    style={{
                        width: "100%",
                        minHeight: 120,
                        padding: "10px 12px",
                        background: "#222228",
                        border: "1px solid #2e2e38",
                        borderRadius: 8,
                        color: "#f0eff4",
                        fontSize: 14,
                        outline: "none",
                        resize: "vertical",
                        fontFamily: "sans-serif",
                        lineHeight: 1.6,
                        boxSizing: "border-box",
                    }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
                    <button
                        onClick={handleSaveNotas}
                        disabled={savingNotas}
                        style={{ padding: "8px 16px", background: "#f5a623", borderRadius: 8, border: "none", color: "#000", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                    >
                        {savingNotas ? "Guardando..." : "Guardar notas"}
                    </button>
                    {notasSaved && (
                        <span style={{ fontSize: 13, color: "#22c55e" }}>✓ Guardado</span>
                    )}
                </div>
            </div>
        </>
    );
}
