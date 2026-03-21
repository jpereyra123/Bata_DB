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
}

export default function FormularioAlumno({ id, alumno }: Props) {
    const alumnoVacio = {
        id: "",
        etapa: "",
        estado: EstadoAlumno.ACTIVO,
        email: "",
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        fechaNacimiento: "",
        curso: "" ,
        direccion: "",
        notas: "",
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
    const [dataAlumno, setDataAlumno] = useState(alumno ?? alumnoVacio);
    const [dataTutores, setDataTutores] = useState<TutorData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    let partesFormulario;
    let navOptions;
    if (alumno == undefined) {
        navOptions = ["Datos explorador", "Grupo familiar", "Salud", "Autorizaciones"];
        partesFormulario = [
            <DatosExplorador data={dataAlumno} setData={setDataAlumno} />,
            <GrupoFamiliar data={dataTutores} setData={setDataTutores} />,
            <Salud data={dataAlumno} setData={setDataAlumno} />,
            <Autorizaciones data={dataAlumno} setData={setDataAlumno} />
        ];
    }
    else {
        navOptions = ["Datos explorador", "Salud", "Autorizaciones"];
        partesFormulario = [
            <DatosExplorador data={dataAlumno} setData={setDataAlumno} />,
            <Salud data={dataAlumno} setData={setDataAlumno} />,
            <Autorizaciones data={dataAlumno} setData={setDataAlumno} />
        ];
    }
        

    let submit =
    id == undefined ?
        (e: FormEvent) => fichaAlumnosService.handleSubmit({ e, router, setError, setLoading, dataAlumno, dataTutores }) :
        (e: FormEvent) => fichaAlumnosService.handleSubmitEdit({ e, router, setError, setLoading, dataAlumno, dataTutores });

    return (
        <div>
            <Link
                href="/alumnos"
                style={{ fontSize: 13, color: "#9b9aaa", textDecoration: "none", display: "inline-block", marginBottom: 24 }}
            >
                ← Volver
            </Link>
            <h1 style={{ fontSize: 24, marginBottom: 24 }}>{alumno == undefined? "Nuevo" : "Editar"} alumno</h1>

            {error && (
                <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "10px 14px", color: "#ef4444", fontSize: 13, marginBottom: 20 }}>
                    {error}
                </div>
            )}

            <form className="formContainer" onSubmit={submit}>
                <div className="formNav">
                    {navOptions.map((titulo, i) => 
                        <button key={i} className={step == i ? "active" : ""}  onClick={() => setStep(i)} type="button">{titulo}</button>
                    )}
                </div>
                <div className="formContent">
                    {partesFormulario[step]}
                </div>
                <div className="formActions">
                    {step > 0 && <button className="Anterior" onClick={() => setStep(step - 1)} type="button">← Anterior</button>}
                    {step < navOptions.length - 1 && <button className="Siguiente" onClick={() => setStep(step + 1)} type="button">Siguiente →</button>}
                    {step == navOptions.length - 1 && <button className="Submit boton" type="submit">Enviar</button>}
                </div>
            </form>
        </div>
    );
}