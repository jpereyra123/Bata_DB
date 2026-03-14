import { notFound } from "next/navigation";
import { alumnosService } from "../../../../services/alumnos.service";
import Link from "next/link";
import FichaAcciones from "./FichaAcciones";

interface Props {
    params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function FichaAlumnoPage({ params }: Props) {
    const { id } = await params;
    const alumno = await alumnosService.findById(id);
    if (!alumno) notFound();
    const tutores = await alumnosService.findTutors(id);

    function getBadge(estado: string) {
        if (estado === "ACTIVO") return { bg: "rgba(34,197,94,0.12)", color: "#22c55e", label: "Activo" };
        if (estado === "PENDIENTE") return { bg: "rgba(245,166,35,0.12)", color: "#f5a623", label: "Pendiente" };
        return { bg: "rgba(239,68,68,0.12)", color: "#ef4444", label: "Inactivo" };
    }

    const badge = getBadge(alumno.estado);

    return (
        <div style={{ maxWidth: 640 }}>
            {/* Back */}
            <Link
                href="/dashboard/alumnos"
                style={{ fontSize: 13, color: "#9b9aaa", textDecoration: "none", display: "inline-block", marginBottom: 24 }}
            >
                ← Volver a Alumnos
            </Link>

            {/* Header */}
            <div style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 16, padding: 28, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        {/* Avatar */}
                        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(245,166,35,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#f5a623", flexShrink: 0 }}>
                            {alumno.nombre.charAt(0)}{alumno.apellido.charAt(0)}
                        </div>
                        <div>
                            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#f0eff4", marginBottom: 4 }}>
                                {alumno.nombre} {alumno.apellido}
                            </h1>
                            <span style={{ padding: "3px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: badge.bg, color: badge.color }}>
                                {badge.label}
                            </span>
                        </div>
                    </div>

                    {/* Acciones */}
                    <FichaAcciones alumnoId={alumno.id} estado={alumno.estado} notas={alumno.notas ?? ""} />
                </div>

                {/* Datos */}
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
                {/* Datos del tutor */}
                {tutores.map(tutor => 
                    <div style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 16, padding: 28, marginBottom: 20 }}>
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
                
            </div>

            {/* Ultima actualizacion */}
            <p style={{ fontSize: 12, color: "#5c5b6e", textAlign: "right" }}>
                Ultima actualizacion: {new Date(alumno.updatedAt).toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
        </div>
    );
}

function DataField({ label, value }: { label: string; value: string }) {
    return (
        <div style={{ background: "#222228", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#5c5b6e", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                {label}
            </div>
            <div style={{ fontSize: 14, color: "#f0eff4", fontWeight: 500 }}>
                {value}
            </div>
        </div>
    );
}
