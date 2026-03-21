import DataField from "@/components/Input/DataField"

interface Props {
    tutores : any[]
}

export default function DatosTutores({ tutores }: Props) {
    return (
        <>
            {tutores.map((tutor, i) => 
            <div key={i} style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 16, padding: 28, marginBottom: 20 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#f0eff4", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid #2e2e38" }}>
                    👨‍👩‍👧 Datos del Padre / Madre / Tutor
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <DataField label="Nombre y apellido" value={tutor.nombre + " " + tutor.apellido || "—"} />
                    <DataField label="DNI" value={tutor.dni || "—"} />
                    <DataField label="Relacion" value={tutor.relacion || "—"} />
                    <DataField label="Telefono" value={tutor.telefono || "—"} />
                    <DataField label="Telefono alternativo" value={tutor.telefonoAlt || "—"} />
                    <DataField label="Direccion" value={tutor.direccion || "—"} />
                    <DataField label="Ocupacion" value={tutor.ocupacion || "—"} />
                    <DataField label="Obra social" value={tutor.obraSocial || "—"} />
                </div>
            </div>
            )}
        </>
    )
}