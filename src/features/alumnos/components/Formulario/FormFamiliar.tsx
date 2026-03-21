"use client"
import Input from "@/components/Input/Input"
import { AlumnoData, TutorData } from "../../types"
import { useEffect, useState } from "react"

interface StepProps {
    tutor: TutorData
    data: TutorData[]
    setData: React.Dispatch<React.SetStateAction<TutorData[]>>
}

export default function FormFamiliar({ tutor, data, setData }: StepProps) {

    useEffect(() => {
        setData(tutores =>
            tutores.map((t, i) =>
                t.id === tutor.id ? tutor : t
            )
        );
    }, [tutor]);
    

    function eliminarTutor() {
        setData(data.filter(t => t.id != tutor.id));
    }

    function setTutor(tutor: TutorData) {
        setData(tutores =>
            tutores.map((t, i) =>
                t.id == tutor.id ? tutor : t
            )
        );
    }
    

    return (
        <>
            <h2>Tutor {tutor.id}</h2>
            <Input field="nombre" id={"nombre" + tutor.id} data={tutor} setData={setTutor} placeholder="Juan" />
            <Input field="apellido" id={"apellido" + tutor.id} data={tutor} setData={setTutor} placeholder="García" />
            <Input field="dni" id={"dni" + tutor.id}  data={tutor} setData={setTutor} placeholder="12345678" />
            <Input field="email" id={"email" + tutor.id} data={tutor} setData={setTutor} placeholder="Juan"  required={false}/>
            <Input field="telefono" id={"telefono" + tutor.id}  data={tutor} setData={setTutor} placeholder="11 1234 5678" />
            <Input field="telefonoAlt" id={"telefonoAlt" + tutor.id}  data={tutor} setData={setTutor} placeholder="11 1234 5678" required={false} />
            <Input field="relacion" id={"relacion" + tutor.id}  data={tutor} setData={setTutor} placeholder="padre/madre" />
            <Input field="direccion" id={"direccion" + tutor.id}  data={tutor} setData={setTutor} placeholder="Calle 1234" />
            <Input field="ocupacion" id={"ocupacion" + tutor.id}  data={tutor} setData={setTutor} placeholder="Profesor/a" />
            <Input field="obraSocial" id={"obraSocial" + tutor.id}  data={tutor} setData={setTutor} placeholder="Obra social" />
            <button className="boton botonEliminar" onClick={eliminarTutor}>Eliminar tutor</button>
        </>
    )
}