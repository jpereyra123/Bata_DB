import DataField from "@/components/Input/DataField"

export default function DatosAlumnos({alumno}: any) {
    return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <DataField label="DNI" value={alumno.dni} />
        <DataField label="Fecha de nacimiento" value={alumno.fechaNacimiento} />
        <DataField label="Email" value={alumno.email} />
        <DataField label="Telefono" value={alumno.telefono || "—"} />
        <DataField label="Etapa" value={alumno.etapa} />
        <DataField
            label="Registrado"
            value={new Date(alumno.createdAt).toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })}
        />
    </div>
    )
}