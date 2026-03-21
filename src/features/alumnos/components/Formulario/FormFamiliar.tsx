"use client"
import Input from "@/components/Input/Input"
import { AlumnoData, TutorData } from "../../types"
import { useEffect, useState } from "react"

interface StepProps {
    numeroTutor: number
    idTutores: number[]
    setIdTutores: React.Dispatch<React.SetStateAction<number[]>>
    data: AlumnoData
    setData: React.Dispatch<React.SetStateAction<AlumnoData>>
}

export default function FormFamiliar({ numeroTutor, idTutores, setIdTutores, data, setData }: StepProps) {
    const tutorInicial = data.tutores.find(tutor => tutor.id_tutor == numeroTutor);
    const [tutor, setTutor] = useState(tutorInicial ?? {
        id_tutor: numeroTutor,
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        telefono: "",
        telefonoAlt: "",
        notas: "",
        relacion: "",
        direccion: "",
        ocupacion: "",
        obraSocial: ""
    })

    useEffect(() => {
        setData(prev => {
            const otros = prev.tutores.filter(t => t.id_tutor !== numeroTutor);

            return {
                ...prev,
                tutores: [...otros, tutor]
            };
        });
    }, [tutor, numeroTutor, setData]);
    

    function eliminarTutor() {
        setData(prev => ({
            ...prev,
            tutores: prev.tutores.filter(t => t.id_tutor !== numeroTutor)
        }));
        setIdTutores(prev => prev.filter(id => id !== numeroTutor));
    }

    

    return (
        <>
            <h2>Tutor {numeroTutor + 1}</h2>
            <Input field="nombre" id={"nombre" + numeroTutor} data={tutor} setData={setTutor} placeholder="Juan" />
            <Input field="apellido" id={"apellido" + numeroTutor} data={tutor} setData={setTutor} placeholder="García" />
            <Input field="dni" id={"dni" + numeroTutor}  data={tutor} setData={setTutor} placeholder="12345678" />
            <Input field="email" id={"email" + numeroTutor} data={tutor} setData={setTutor} placeholder="Juan"  required={false}/>
            <Input field="telefono" id={"telefono" + numeroTutor}  data={tutor} setData={setTutor} placeholder="11 1234 5678" />
            <Input field="telefonoAlt" id={"telefonoAlt" + numeroTutor}  data={tutor} setData={setTutor} placeholder="11 1234 5678" required={false} />
            <Input field="relacion" id={"relacion" + numeroTutor}  data={tutor} setData={setTutor} placeholder="padre/madre" />
            <Input field="direccion" id={"direccion" + numeroTutor}  data={tutor} setData={setTutor} placeholder="Calle 1234" />
            <Input field="ocupacion" id={"ocupacion" + numeroTutor}  data={tutor} setData={setTutor} placeholder="Profesor/a" />
            <Input field="obraSocial" id={"obraSocial" + numeroTutor}  data={tutor} setData={setTutor} placeholder="Obra social" />
            <button className="boton botonEliminar" onClick={eliminarTutor}>Eliminar tutor</button>
        </>
    )
}