import { alumnosService } from "../../../services/alumnos.service";
import { AlumnosTable } from "../../../components/alumnos/AlumnosTable";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AlumnosPage() {
  const alumnos = await alumnosService.findAll();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26 }}>Alumnos</h1>
          <p style={{ color: "#888", fontSize: 14 }}>{alumnos.length} registrados</p>
        </div>
        <Link href="/dashboard/alumnos/nuevo" style={{ padding: "9px 18px", background: "#f5a623", borderRadius: 8, textDecoration: "none", color: "#000", fontWeight: 600, fontSize: 14 }}>
          + Nuevo alumno
        </Link>
      </div>
      <div style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 12, overflow: "hidden" }}>
        <AlumnosTable alumnos={alumnos} />
      </div>
    </div>
  );
}