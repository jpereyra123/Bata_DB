import Link from "next/link";
import { StatsType } from "../types/StatsType";

type Props = {
  stats: StatsType;
};

export default function Alerts({stats}: Props) {
    return (
        <>
        {stats.pendientes > 0 && (
            <div style={{ background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.25)", borderRadius: 12, padding: "16px 20px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 20 }}>⏳</span>
                    <div>
                        <p style={{ color: "#f5a623", fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                            Tenes {stats.pendientes} inscripcion{stats.pendientes !== 1 ? "es" : ""} pendiente{stats.pendientes !== 1 ? "s" : ""} de revision
                        </p>
                        <p style={{ color: "#9b9aaa", fontSize: 13 }}>
                            Aprobala{stats.pendientes !== 1 ? "s" : ""} o rechazala{stats.pendientes !== 1 ? "s" : ""} desde la tabla de alumnos
                        </p>
                    </div>
                </div>
                <Link
                    href="/alumnos"
                    style={{ padding: "8px 16px", background: "#f5a623", borderRadius: 8, textDecoration: "none", color: "#000", fontWeight: 600, fontSize: 13 }}
                >
                    Ver pendientes
                </Link>
            </div>
            )}
        </>
    )
}