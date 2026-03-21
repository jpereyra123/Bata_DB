"use client";
import { useState, useEffect } from "react";
import { usuariosService } from "./services/usuarios.service";

export interface Usuario {
    id: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ email: "", password: "", role: "USER" });
    const [formError, setFormError] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        usuariosService.fetchUsuarios({setUsuarios, setLoading});
    }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setFormError("");
        setFormLoading(true);
        try {
            const res = await fetch("/api/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const body = await res.json();
            if (!res.ok) {
                setFormError(body.error ?? "Error inesperado");
                return;
            }
            setForm({ email: "", password: "", role: "USER" });
            setShowForm(false);
            usuariosService.fetchUsuarios({setUsuarios, setLoading});
        } catch {
            setFormError("Error de conexion");
        } finally {
            setFormLoading(false);
        }
    }

    async function handleDelete(id: string, email: string) {
        if (!confirm(`Eliminar al usuario ${email}?`)) return;
        try {
            const res = await fetch(`/api/usuarios?id=${id}`, { method: "DELETE" });
            if (res.ok) usuariosService.fetchUsuarios({setUsuarios, setLoading});
            else alert("Error al eliminar");
        } catch {
            alert("Error de conexion");
        }
    }

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
        fontSize: 11,
        fontWeight: 600,
        color: "#5c5b6e",
        textTransform: "uppercase" as const,
        letterSpacing: "0.06em",
        marginBottom: 6,
    };

    return (
        <div>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
                <div>
                    <h1 style={{ fontSize: 26, fontWeight: 700, color: "#f0eff4", marginBottom: 4 }}>Usuarios</h1>
                    <p style={{ color: "#9b9aaa", fontSize: 14 }}>{usuarios.length} usuario{usuarios.length !== 1 ? "s" : ""} registrado{usuarios.length !== 1 ? "s" : ""}</p>
                </div>
                <button
                    onClick={() => setShowForm((s) => !s)}
                    style={{ padding: "9px 18px", background: "#f5a623", borderRadius: 8, border: "none", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
                >
                    {showForm ? "Cancelar" : "+ Nuevo usuario"}
                </button>
            </div>

            {/* Formulario */}
            {showForm && (
                <div style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 12, padding: 24, marginBottom: 24 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: "#f0eff4", marginBottom: 20 }}>Crear nuevo usuario</h2>

                    {formError && (
                        <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "10px 14px", color: "#ef4444", fontSize: 13, marginBottom: 16 }}>
                            {formError}
                        </div>
                    )}

                    <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div>
                                <label style={labelStyle}>Email</label>
                                <input
                                    type="email"
                                    style={inputStyle}
                                    value={form.email}
                                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                    required
                                    placeholder="usuario@email.com"
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Contraseña</label>
                                <input
                                    type="password"
                                    style={inputStyle}
                                    value={form.password}
                                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                                    required
                                    placeholder="Minimo 6 caracteres"
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div style={{ maxWidth: 200 }}>
                            <label style={labelStyle}>Rol</label>
                            <select
                                style={{ ...inputStyle, cursor: "pointer" }}
                                value={form.role}
                                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                            >
                                <option value="USER">USER — solo lectura</option>
                                <option value="ADMIN">ADMIN — acceso total</option>
                            </select>
                        </div>

                        <div style={{ paddingTop: 8, borderTop: "1px solid #2e2e38" }}>
                            <button
                                type="submit"
                                disabled={formLoading}
                                style={{ padding: "10px 20px", background: "#f5a623", borderRadius: 8, border: "none", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
                            >
                                {formLoading ? "Creando..." : "Crear usuario"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabla */}
            <div style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 12, overflow: "hidden" }}>
                {loading ? (
                    <div style={{ padding: "48px 32px", textAlign: "center", color: "#9b9aaa" }}>Cargando...</div>
                ) : usuarios.length === 0 ? (
                    <div style={{ padding: "48px 32px", textAlign: "center", color: "#9b9aaa" }}>No hay usuarios registrados</div>
                ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                        <thead>
                            <tr>
                                {["Email", "Rol", "Creado", "Acciones"].map((h) => (
                                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, textTransform: "uppercase", color: "#5c5b6e", borderBottom: "1px solid #2e2e38" }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((u) => (
                                <tr key={u.id}>
                                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#f0eff4", fontWeight: 500 }}>{u.email}</td>
                                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38" }}>
                                        <span style={{
                                            padding: "2px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                                            background: u.role === "ADMIN" ? "rgba(245,166,35,0.12)" : "rgba(100,100,120,0.2)",
                                            color: u.role === "ADMIN" ? "#f5a623" : "#9b9aaa",
                                        }}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>
                                        {new Date(u.createdAt).toLocaleDateString("es-AR")}
                                    </td>
                                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38" }}>
                                        <button
                                            onClick={() => handleDelete(u.id, u.email)}
                                            style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 13, cursor: "pointer" }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
