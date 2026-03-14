"use client"
import { useState } from "react"
import { AlumnoData } from "../../types"
import FormFamiliar from "./FormFamiliar"

interface StepProps {
  data: AlumnoData
  setData: React.Dispatch<React.SetStateAction<AlumnoData>>
}

export default function GrupoFamiliar({ data, setData }: StepProps) {
  const [cantidadTutores, setCantidadTutores] = useState<number>(data.tutores.length);
  const [idTutores, setIdTutores] = useState<number[]>(data.tutores.map(tutor => tutor.id_tutor));
  return (
    <>
        <h1>GRUPO FAMILIAR</h1>
        {idTutores.map(tutor => <FormFamiliar key={tutor} idTutores={idTutores} setIdTutores={setIdTutores} numeroTutor={tutor} data={data} setData={setData}/>)}
        <div className="inputAncho">
          <button className="boton" onClick={(e) => {
          setIdTutores([...idTutores, cantidadTutores]);
          setCantidadTutores(cantidadTutores + 1);
        }}>Agregar tutor</button>
        </div>
        
    </>
  )
}