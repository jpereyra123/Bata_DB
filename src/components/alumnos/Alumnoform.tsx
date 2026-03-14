"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
    nombre: string;
    email: string;
    etapa: string;
    curso: string;
    estado: "ACTIVO" | "INACTIVO";
}

interface Props {
    alumnoId?: string;
    defaultValues?: Partial<FormData>;
}

export function AlumnoForm({ alumnoId, defaultValues }: Props) {
    const router = useRouter();
    const isEditing = !!alumnoId;

    const [form, setForm] = useState<FormData>({
        nombre: defaultValues?.nombre ?? "",
        email: defaultValues?.email ?? "",
        etapa: defaultValues?.etapa ?? "",
        curso: defaultValues?.curso ?? "",
        estado: defaultValues?.estado ?? "ACTIVO",
    });
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setServerError("");
        setLoading(true);
        try {
            const res = await fetch(
                isEditing ? `/api/alumnos/${alumnoId}` : "/api/alumnos",
                { method: isEditing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }
            );
            const body = await res.json();
            if (!res.ok) { setServerError(body.error ?? "Error inesperado"); return; }
            router.push("/dashboard/alumnos");
            router.refresh();
        } catch {
            setServerError("Error de conexión");
        } finally {
            setLoading(false);
        }
    }

    const inputStyle = { width: "100%", padding: "9px 12px", background: "#222228", border: "1px solid #2e2e38", borderRadius: 8, color: "#f0eff4", fontSize: 14, outline: "none" };
    const labelStyle = { display: "block" as const, fontSize: 12, color: "#888", marginBottom: 6 };

    return (
        <div style={{ maxWidth: 520 }}>
            <Link href="/dashboard/alumnos" style={{ fontSize: 13, color: "#9b9aaa", textDecoration: "none", display: "inline-block", marginBottom: 24 }}>
                ← Volver
            </Link>
            <h1 style={{ fontSize: 24, marginBottom: 24 }}>{isEditing ? "Editar alumno" : "Nuevo alumno"}</h1>

            {serverError && (
                <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "10px 14px", color: "#ef4444", fontSize: 13, marginBottom: 20 }}>
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                    <label style={labelStyle}>Nombre</label>
                    <input style={inputStyle} value={form.nombre} onChange={(e) => updateField("nombre", e.target.value)} required placeholder="Juan García" />
                </div>
                <div>
                    <label style={labelStyle}>Email</label>
                    <input type="email" style={inputStyle} value={form.email} onChange={(e) => updateField("email", e.target.value)} required placeholder="alumno@email.com" />
                </div>
                <div>
                    <label style={labelStyle}>Curso</label>
                    <input style={inputStyle} value={form.curso} onChange={(e) => updateField("curso", e.target.value)} required placeholder="3° año Informática" />
                </div>
                <div>
                    <label style={labelStyle}>Estado</label>
                    <select style={{ ...inputStyle, cursor: "pointer" }} value={form.estado} onChange={(e) => updateField("estado", e.target.value as FormData["estado"])}>
                        <option value="ACTIVO">Activo</option>
                        <option value="INACTIVO">Inactivo</option>
                    </select>
                </div>
                <div style={{ display: "flex", gap: 12, paddingTop: 8, borderTop: "1px solid #2e2e38" }}>
                    <button type="submit" disabled={loading} style={{ padding: "10px 20px", background: "#f5a623", borderRadius: 8, border: "none", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                        {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear alumno"}
                    </button>
                    <Link href="/dashboard/alumnos" style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #2e2e38", color: "#9b9aaa", textDecoration: "none", fontSize: 14 }}>
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}