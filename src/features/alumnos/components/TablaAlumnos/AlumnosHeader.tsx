import Link from "next/link";
import { alumnosService } from "../../services/alumnos.service";

export default async function AlumnosHeader() {
    const cantidadAlumnos = await alumnosService.count();
    return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
            <h1 style={{ fontSize: 26 }}>Alumnos</h1>
            <p style={{ color: "#888", fontSize: 14 }}>{cantidadAlumnos} registrados</p>
        </div>
        <Link href="/alumnos/nuevo" style={{ padding: "9px 18px", background: "#f5a623", borderRadius: 8, textDecoration: "none", color: "#000", fontWeight: 600, fontSize: 14 }}>
            + Nuevo alumno
        </Link>
    </div>
    )
}