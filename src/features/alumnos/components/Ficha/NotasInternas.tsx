"use client"

import { SetStateAction, useState } from "react"
import { fichaAlumnosService } from "../../services/fichaAlumnos.service"
import { useRouter } from "next/navigation"

interface Props {
    alumnoId: string
    notas: string
}


export default function NotasInternas({alumnoId, notas} : Props) {
    const [notasValue, setNotasValue] = useState(notas);
    const [savingNotas, setSavingNotas] = useState(false);
    const [notasSaved, setNotasSaved] = useState(false);
    const router = useRouter();

    return (
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
                    onClick={() => fichaAlumnosService.handleSaveNotas({alumnoId, notasValue, router, setSavingNotas, setNotasSaved})}
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
    )
}