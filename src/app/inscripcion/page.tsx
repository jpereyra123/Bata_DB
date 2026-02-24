"use client";

import { useState } from "react";

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

export default function InscripcionPage() {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        telefono: "",
        fechaNacimiento: "",
        curso: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const inputStyle = {
        width: "100%",
        padding: "10px 14px",
        background: "#222228",
        border: "1px solid #2e2e38",
        borderRadius: 8,
        color: "#f0eff4",
        fontSize: 14,
        outline: "none",
        boxSizing: "border-box" as const,
    };

    const labelStyle = {
        display: "block" as const,
        fontSize: 12,
        fontWeight: 600,
        color: "#9b9aaa",
        marginBottom: 6,
        textTransform: "uppercase" as const,
        letterSpacing: "0.05em",
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/alumnos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, estado: "PENDIENTE" }),
            });
            const body = await res.json();
            if (!res.ok) {
                setError(body.error ?? "Error inesperado");
                return;
            }
            setSuccess(true);
        } catch {
            setError("Error de conexion. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f0f11", padding: 24 }}>
                <div style={{ textAlign: "center", maxWidth: 420 }}>
                    <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "#f0eff4", marginBottom: 12 }}>
                        Inscripcion enviada
                    </h1>
                    <p style={{ color: "#9b9aaa", fontSize: 15, lineHeight: 1.6 }}>
                        Tu solicitud fue recibida correctamente. Un administrador revisara tu inscripcion y te contactara pronto.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: "#0f0f11", padding: "40px 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: 560 }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>⚜️</div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#f0eff4", marginBottom: 8 }}>
                        Formulario de Inscripcion
                    </h1>
                    <p style={{ color: "#9b9aaa", fontSize: 15 }}>
                        Completa tus datos para inscribirte. Un administrador revisara tu solicitud.
                    </p>
                </div>

                {error && (
                    <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "12px 16px", color: "#ef4444", fontSize: 13, marginBottom: 20 }}>
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 16, padding: 32, display: "flex", flexDirection: "column", gap: 20 }}
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
                                placeholder="Garcia"
                            />
                        </div>
                    </div>

                    {/* DNI y Telefono */}
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
                            <label style={labelStyle}>Telefono</label>
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
                            placeholder="tu@email.com"
                        />
                    </div>

                    {/* Fecha nacimiento */}
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
                        <label style={labelStyle}>Etapa a la que perteneces</label>
                        <select
                            style={{ ...inputStyle, cursor: "pointer" }}
                            value={form.curso}
                            onChange={(e) => setForm((f) => ({ ...f, curso: e.target.value }))}
                            required
                        >
                            <option value="">Selecciona una etapa</option>
                            {etapas.map((etapa) => (
                                <option key={etapa} value={etapa}>{etapa}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ padding: "13px 20px", background: "#f5a623", borderRadius: 10, border: "none", color: "#000", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 8, transition: "opacity 0.15s" }}
                    >
                        {loading ? "Enviando..." : "Enviar inscripcion"}
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#5c5b6e" }}>
                    Ya sos miembro?{" "}
                    <a href="/login" style={{ color: "#f5a623", textDecoration: "none" }}>
                        Ingresar al panel
                    </a>
                </p>
            </div>
        </div>
    );
}
