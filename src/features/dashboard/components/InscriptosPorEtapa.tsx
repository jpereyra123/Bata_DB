import { StatsType } from "../types/StatsType";

type Props = {
  stats: StatsType;
};

export default function InscriptosPorEtapa({stats} : Props) {
    return (
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
                            <div key={e.etapa}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                    <span style={{ fontSize: 13, color: "#9b9aaa" }}>{e.etapa || "Sin etapa"}</span>
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
    )
}