import StatCard from "./StatCard";
import { StatsType } from "../types/StatsType";

type Props = {
  stats: StatsType;
};

export default function Stats({stats} : Props) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
            <StatCard label="Total inscriptos" value={stats.total} color="#f5a623" bg="rgba(245,166,35,0.12)" />
            <StatCard label="Activos" value={stats.activos} color="#22c55e" bg="rgba(34,197,94,0.12)" />
            <StatCard label="Pendientes" value={stats.pendientes} color="#f5a623" bg="rgba(245,166,35,0.12)" alert={stats.pendientes > 0} />
            <StatCard label="Inactivos" value={stats.inactivos} color="#ef4444" bg="rgba(239,68,68,0.12)" />
        </div>
    )
}