"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DatosExplorador from "./DatosExplorador";
import GrupoFamiliar from "./GrupoFamiliar";
import Salud from "./Salud";
import Autorizaciones from "./Autorizaciones";
import { AlumnoData, TutorData } from "../../types";
import "../../styles/page.css"
import { EstadoAlumno } from "@prisma/client";
import { fichaAlumnosService } from "../../services/fichaAlumnos.service";
interface Props {
    id?: string;
    alumno?: AlumnoData;
    tutores?: TutorData;
}

export default function FormularioAlumno({ id, alumno, tutores }: Props) {
    const alumnoVacio = {
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        direccion: "",
        telefono: "",
        fechaNacimiento: "",
        etapa: "",
        curso: "",
        estado: EstadoAlumno.ACTIVO,
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
    }
    
    const router = useRouter();
    const [step, setStep] = useState(0)
    const [form, setForm] = useState({dataAlumno: alumno ?? alumnoVacio, dataTutores: tutores ?? []});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const partesFormulario = [
        <DatosExplorador data={form} setData={setForm} />,
        <GrupoFamiliar data={form} setData={setForm} />,
        <Salud data={form} setData={setForm} />,
        <Autorizaciones data={form} setData={setForm} />
    ];

    let submit =
    id == undefined ?
        (e: FormEvent) => fichaAlumnosService.handleSubmit({ e, router, setError, setLoading, form }) :
        (e: FormEvent) => fichaAlumnosService.handleSubmitEdit({ e, router, setError, setLoading, form, id });

    return (
        <div>
            <Link
                href="/alumnos"
                style={{ fontSize: 13, color: "#9b9aaa", textDecoration: "none", display: "inline-block", marginBottom: 24 }}
            >
                ← Volver
            </Link>
            <h1 style={{ fontSize: 24, marginBottom: 24 }}>{data == undefined? "Nuevo" : "Editar"} alumno</h1>

            {error && (
                <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "10px 14px", color: "#ef4444", fontSize: 13, marginBottom: 20 }}>
                    {error}
                </div>
            )}

            <form className="formContainer" onSubmit={submit}>
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
        </div>
    );
}