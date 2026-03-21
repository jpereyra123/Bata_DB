"use client"
import { useState } from "react"
import { TutorData } from "../../types"
import FormFamiliar from "./FormFamiliar"

interface StepProps {
  data: TutorData[]
  setData: React.Dispatch<React.SetStateAction<TutorData[]>>
}

export default function GrupoFamiliar({ data, setData }: StepProps) {
  const [cantidadTutores, setCantidadTutores] = useState<number>(data.length);
  const [idTutores, setIdTutores] = useState<string[]>(data.map(tutor => tutor.id));

  const tutorNuevo:TutorData = {
    id: cantidadTutores.toString(),
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
    obraSocial: "",
    activo: true
  }
  console.log(data)



  return (
    <>
        <h1>GRUPO FAMILIAR</h1>
        {data.map((tutor, indexTutor) => tutor.activo && <FormFamiliar key={tutor.id} tutor={tutor} data={data} setData={setData}/>)}
        <div className="inputAncho">
        <button className="boton" onClick={(e) => {
          e.preventDefault();
          setCantidadTutores(cantidadTutores + 1);
          setData([...data, tutorNuevo]);
        }}>Agregar tutor</button>
        </div>
        
    </>
  )
}