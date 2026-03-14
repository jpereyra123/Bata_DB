import { AlumnoData } from "../types"
import Input from "@/components/Input/Input"

interface StepProps {
  data: AlumnoData
  setData: React.Dispatch<React.SetStateAction<AlumnoData>>
}

export default function Autorizaciones({ data, setData }: StepProps) {
  return (
    <>
        <h1>AUTORIZACIONES</h1>
        <Input field="seRetiraSolo" data={data} setData={setData} type="checkbox" />
    </>
  )
}