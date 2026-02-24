"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const etapas = [
    "Pichones",
    "Horneros",
    "Cam/Ch",
    "Pioneros/Fuegos",
    "Rastr/Hog",
    "Baq/Ant",
    "Baq/Ant inst",
    "Soles",
];

export default function NuevoAlumnoPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        telefono: "",
        fechaNacimiento: "",
        curso: "",
        estado: "ACTIVO",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const inputStyle = {
        width: "100%",
        padding: "9px 12px",
        background: "#222228",
        border: "1px solid #2e2e38",
        borderRadius: 8,
        color: "#f0eff4",
        fontSize: 14,
        outline: "none",
    };
    const labelStyle = {
        display: "block" as const,
        fontSize: 12,
        color: "#888",
        marginBottom: 6,
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/alumnos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const body = await res.json();
            if (!res.ok) {
                setError(body.error ?? "Error inesperado");
                return;
            }
            router.push("/dashboard/alumnos");
            router.refresh();
        } catch {
            setError("Error de conexión");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: 560 }}>
            <Link
                href="/dashboard/alumnos"
                style={{ fontSize: 13, color: "#9b9aaa", textDecoration: "none", display: "inline-block", marginBottom: 24 }}
            >
                ← Volver
            </Link>
            <h1 style={{ fontSize: 24, marginBottom: 24 }}>Nuevo alumno</h1>

            {error && (
                <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "10px 14px", color: "#ef4444", fontSize: 13, marginBottom: 20 }}>
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}
            >
                {/* Nombre y Apellido */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                        <label style={labelStyle}>Nombre</label>
                        <input
                            style={inputStyle}
                            value={form.nombre}
                            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                            required
                            placeholder="Juan"
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Apellido</label>
                        <input
                            style={inputStyle}
                            value={form.apellido}
                            onChange={(e) => setForm((f) => ({ ...f, apellido: e.target.value }))}
                            required
                            placeholder="García"
                        />
                    </div>
                </div>

                {/* DNI y Teléfono */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                        <label style={labelStyle}>DNI</label>
                        <input
                            style={inputStyle}
                            value={form.dni}
                            onChange={(e) => setForm((f) => ({ ...f, dni: e.target.value }))}
                            required
                            placeholder="12345678"
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Número de contacto</label>
                        <input
                            style={inputStyle}
                            value={form.telefono}
                            onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
                            placeholder="11 1234 5678"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label style={labelStyle}>Email</label>
                    <input
                        type="email"
                        style={inputStyle}
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        required
                        placeholder="alumno@email.com"
                    />
                </div>

                {/* Fecha de nacimiento */}
                <div>
                    <label style={labelStyle}>Fecha de nacimiento</label>
                    <input
                        type="date"
                        style={inputStyle}
                        value={form.fechaNacimiento}
                        onChange={(e) => setForm((f) => ({ ...f, fechaNacimiento: e.target.value }))}
                        required
                    />
                </div>

                {/* Etapa */}
                <div>
                    <label style={labelStyle}>Etapa</label>
                    <select
                        style={{ ...inputStyle, cursor: "pointer" }}
                        value={form.curso}
                        onChange={(e) => setForm((f) => ({ ...f, curso: e.target.value }))}
                        required
                    >
                        <option value="">Seleccioná una etapa</option>
                        {etapas.map((etapa) => (
                            <option key={etapa} value={etapa}>
                                {etapa}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Estado */}
                <div>
                    <label style={labelStyle}>Estado</label>
                    <select
                        style={{ ...inputStyle, cursor: "pointer" }}
                        value={form.estado}
                        onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value }))}
                    >
                        <option value="ACTIVO">Activo</option>
                        <option value="INACTIVO">Inactivo</option>
                    </select>
                </div>

                <div style={{ display: "flex", gap: 12, paddingTop: 8, borderTop: "1px solid #2e2e38" }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ padding: "10px 20px", background: "#f5a623", borderRadius: 8, border: "none", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
                    >
                        {loading ? "Guardando..." : "Crear alumno"}
                    </button>
                    <Link
                        href="/dashboard/alumnos"
                        style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #2e2e38", color: "#9b9aaa", textDecoration: "none", fontSize: 14 }}
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}