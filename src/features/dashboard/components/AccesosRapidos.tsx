import Link from "next/link";

export default function AccesosRapidos() {
    return (
        <div style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#f0eff4", marginBottom: 16 }}>
                Accesos rapidos
            </h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/alumnos" style={{ padding: "10px 20px", background: "#f5a623", borderRadius: 8, textDecoration: "none", color: "#000", fontWeight: 600, fontSize: 14 }}>
                    Ver todos los alumnos
                </Link>
                <Link href="/alumnos/nuevo" style={{ padding: "10px 20px", background: "transparent", border: "1px solid #2e2e38", borderRadius: 8, textDecoration: "none", color: "#9b9aaa", fontSize: 14 }}>
                    Agregar alumno
                </Link>
                <Link href="/inscripcion" style={{ padding: "10px 20px", background: "transparent", border: "1px solid #2e2e38", borderRadius: 8, textDecoration: "none", color: "#9b9aaa", fontSize: 14 }}>
                    Ver formulario publico
                </Link>
            </div>
        </div>
    )
}