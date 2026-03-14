"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DatosExplorador from "./pasosForm/DatosExplorador";
import GrupoFamiliar from "./pasosForm/GrupoFamiliar/GrupoFamiliar";
import Salud from "./pasosForm/Salud";
import Autorizaciones from "./pasosForm/Autorizaciones";
import { AlumnoData, TutorData } from "./types";
import "./page.css"

export default function NuevoAlumnoPage() {
    const router = useRouter();
    const [step, setStep] = useState(0)
    const [form, setForm] = useState<AlumnoData>({
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        direccion: "",
        telefono: "",
        fechaNacimiento: "",
        etapa: "",
        curso: "",
        estado: "ACTIVO",
        fueBautizado: false,
        tomoComunion: false,
        tomoConfirmacion: false,
        alergias: "",
        medicaciones: "",
        condicionesMedicas: "",
        obraSocial: "",
        numeroAfiliado: "",
        tieneFichaMedica: false,
        fechaFichaMedica: "",
        seRetiraSolo: false,
        tutores: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    /*
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
    */
    
    const partesFormulario = [
        <DatosExplorador data={form} setData={setForm} />,
        <GrupoFamiliar data={form} setData={setForm} />,
        <Salud data={form} setData={setForm} />,
        <Autorizaciones data={form} setData={setForm} />
    ];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        const formEnviar = {
            ...form, tutores: form.tutores.map(({ id_tutor, ...resto }) => resto)
        };
        try {
            const res = await fetch("/api/alumnos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formEnviar),
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
        <div>
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

            <form className="formContainer" onSubmit={handleSubmit}>
                <div className="formNav">
                    {["Datos explorador", "Grupo familiar", "Salud", "Autorizaciones"].map((titulo, i) => 
                        <button key={i} className={step == i ? "active" : ""}  onClick={() => setStep(i)} type="button">{titulo}</button>
                    )}
                </div>
                <div className="formContent">
                    {partesFormulario[step]}
                </div>
                <div className="formActions">
                    {step > 0 && <button className="Anterior" onClick={() => setStep(step - 1)} type="button">← Anterior</button>}
                    {step < 3 && <button className="Siguiente" onClick={() => setStep(step + 1)} type="button">Siguiente →</button>}
                    {step == 3 && <button className="Submit boton" type="submit">Enviar</button>}
                </div>
            </form>

            {/*
            <form
                onSubmit={handleSubmit}
                style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}
            >
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
            */}
        </div>
    );
}