import FichaAcciones from "@/features/alumnos/components/Ficha/FichaAcciones"
import getBadge from "../../services/getBadge"

export default function FichaHeader({alumno}: any) {
    const badge = getBadge(alumno.estado);

    return (
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
            <FichaAcciones alumnoId={alumno.id} estado={alumno.estado}/>
        </div>
    )
}