import { prisma } from "../../lib/prisma";
import Link from "next/link";

async function getStats() {
    const [total, activos, inactivos, pendientes, porEtapa] = await Promise.all([
        prisma.alumno.count(),
        prisma.alumno.count({ where: { estado: "ACTIVO" } }),
        prisma.alumno.count({ where: { estado: "INACTIVO" } }),
        prisma.alumno.count({ where: { estado: "PENDIENTE" } }),
        prisma.alumno.groupBy({
            by: ["curso"],
            _count: { id: true },
            orderBy: { _count: { id: "desc" } },
        }),
    ]);
    return { total, activos, inactivos, pendientes, porEtapa };
}

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const stats = await getStats();

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: "#f0eff4", marginBottom: 6 }}>
                    Dashboard
                </h1>
                <p style={{ color: "#9b9aaa", fontSize: 14 }}>
                    Resumen general del sistema de inscripciones
                </p>
            </div>

            {/* Stats principales */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
                <StatCard label="Total inscriptos" value={stats.total} color="#f5a623" bg="rgba(245,166,35,0.12)" />
                <StatCard label="Activos" value={stats.activos} color="#22c55e" bg="rgba(34,197,94,0.12)" />
                <StatCard label="Pendientes" value={stats.pendientes} color="#f5a623" bg="rgba(245,166,35,0.12)" alert={stats.pendientes > 0} />
                <StatCard label="Inactivos" value={stats.inactivos} color="#ef4444" bg="rgba(239,68,68,0.12)" />
            </div>

            {/* Alerta de pendientes */}
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
                        href="/dashboard/alumnos"
                        style={{ padding: "8px 16px", background: "#f5a623", borderRadius: 8, textDecoration: "none", color: "#000", fontWeight: 600, fontSize: 13 }}
                    >
                        Ver pendientes
                    </Link>
                </div>
            )}

            {/* Por etapa */}
            <div style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 12, padding: 24, marginBottom: 32 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: "#f0eff4", marginBottom: 20 }}>
                    Inscriptos por etapa
                </h2>
                {stats.porEtapa.length === 0 ? (
                    <p style={{ color: "#5c5b6e", fontSize: 14 }}>No hay datos aun</p>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {stats.porEtapa.map((e) => {
                            const pct = stats.total > 0 ? Math.round((e._count.id / stats.total) * 100) : 0;
                            return (
                                <div key={e.curso}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                        <span style={{ fontSize: 13, color: "#9b9aaa" }}>{e.curso || "Sin etapa"}</span>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: "#f0eff4" }}>
                                            {e._count.id} <span style={{ color: "#5c5b6e", fontWeight: 400 }}>({pct}%)</span>
                                        </span>
                                    </div>
                                    <div style={{ height: 6, background: "#222228", borderRadius: 99, overflow: "hidden" }}>
                                        <div style={{ height: "100%", width: `${pct}%`, background: "#f5a623", borderRadius: 99, transition: "width 0.5s ease" }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Accesos rapidos */}
            <div style={{ background: "#18181c", border: "1px solid #2e2e38", borderRadius: 12, padding: 24 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: "#f0eff4", marginBottom: 16 }}>
                    Accesos rapidos
                </h2>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <Link href="/dashboard/alumnos" style={{ padding: "10px 20px", background: "#f5a623", borderRadius: 8, textDecoration: "none", color: "#000", fontWeight: 600, fontSize: 14 }}>
                        Ver todos los alumnos
                    </Link>
                    <Link href="/dashboard/alumnos/nuevo" style={{ padding: "10px 20px", background: "transparent", border: "1px solid #2e2e38", borderRadius: 8, textDecoration: "none", color: "#9b9aaa", fontSize: 14 }}>
                        Agregar alumno
                    </Link>
                    <Link href="/inscripcion" style={{ padding: "10px 20px", background: "transparent", border: "1px solid #2e2e38", borderRadius: 8, textDecoration: "none", color: "#9b9aaa", fontSize: 14 }}>
                        Ver formulario publico
                    </Link>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, color, bg, alert }: { label: string; value: number; color: string; bg: string; alert?: boolean }) {
    return (
        <div style={{ background: "#18181c", border: `1px solid ${alert ? "rgba(245,166,35,0.3)" : "#2e2e38"}`, borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#5c5b6e", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                {label}
            </div>
            <div style={{ fontSize: 42, fontWeight: 700, color, lineHeight: 1 }}>
                {value}
            </div>
        </div>
    );
}
