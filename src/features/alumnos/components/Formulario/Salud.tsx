import { AlumnoData } from "../../types"
import Input from "@/components/Input/Input"

interface StepProps {
  data: AlumnoData
  setData: React.Dispatch<React.SetStateAction<AlumnoData>>
}

export default function Salud({ data, setData }: StepProps) {
  return (
    <>
        <h1>SALUD</h1>
        <Input field="alergias" classDiv="inputAncho" data={data} setData={setData} required={false}/>
        <Input field="medicaciones" classDiv="inputAncho" data={data} setData={setData} required={false}/>
        <Input field="condicionesMedicas" classDiv="inputAncho" data={data} setData={setData}/>
        <Input field="obraSocial" data={data} setData={setData} required={false}/>
        <Input field="numeroAfiliado" data={data} setData={setData} required={false}/>
        <Input field="tieneFichaMedica" data={data} setData={setData} type="checkbox" required={false}/>
    </>
  )
}