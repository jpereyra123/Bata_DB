import { AlumnoData } from "../../types"
import Input from "@/components/Input/Input"

interface StepProps {
  data: AlumnoData
  setData: React.Dispatch<React.SetStateAction<AlumnoData>>
}

const etapas = [
    "Pichones",
    "Horneros",
    "Cam/Ch",
    "Pioneros/Fuegos",
    "Rastr/Hog",
    "Baq/Ant",
    "Baq/Ant inst",
    "Soles",
];

export default function DatosExplorador({ data, setData }: StepProps) {
  return (
    <>
      <h1>DATOS EXPLORADOR</h1>
      <Input field="nombre" data={data} setData={setData} placeholder="Juan"/>
      <Input field="apellido" data={data} setData={setData} placeholder="Garcia"/>
      <Input field="dni" data={data} setData={setData} placeholder="12345678"/>
      <Input field="direccion" data={data} setData={setData} placeholder="Calle 123"/>
      <Input field="fechaNacimiento" data={data} setData={setData} type="date" placeholder="Juan"/>
      <Input field="email" data={data} setData={setData} type="email" placeholder="Juan" required={false} />
      <Input field="curso" data={data} setData={setData} placeholder="1°B" required={false} />
      <div>
        <label htmlFor="etapa">Etapa</label>
        <select
          id="etapa"
          value={data.etapa}
          onChange={(e) => setData((f:AlumnoData) => ({ ...f, etapa: e.target.value }))}
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
      <Input field="telefono" data={data} setData={setData} placeholder="11 1234 5678" required={false} />
      <Input field="fueBautizado" data={data} setData={setData} type="checkbox" />
      <Input field="tomoComunion" data={data} setData={setData} type="checkbox" />
      <Input field="tomoConfirmacion" data={data} setData={setData} type="checkbox" />
    </>
  )
}