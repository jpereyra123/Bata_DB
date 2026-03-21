import { tablaAlumnosService } from "../../services/tablaAlumnos.service"
import { etapas } from "../../types"

interface Props {
    filters: any
    setFilters: any
    setPage: any
}

export default function ToolBar({filters, setFilters, setPage} : Props) {
    const handleChange = (newValues: Partial<typeof filters>) => {
        setFilters((prev : any) => ({ ...prev, ...newValues }));
        setPage(1);
    };
    
    return (
        <div style={{ padding: "16px 16px 0", display: "flex", gap: 12, flexWrap: "wrap" as const, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const, flex: 1 }}>
                <input
                    style={{ minWidth: 220 }}
                    placeholder="Buscar por nombre, apellido, DNI..."
                    value={filters.search}
                    onChange={(e) => handleChange({search: e.target.value})}
                />
                <select
                    style={{ cursor: "pointer" }}
                    value={filters.etapaFiltro}
                    onChange={(e) => handleChange({etapaFiltro: e.target.value})}
                >
                    {etapas.map((e) => (
                    <option key={e} value={e}>{e}</option>
                    ))}
                </select>
                <select
                    style={{ cursor: "pointer" }}
                    value={filters.estadoFiltro}
                    onChange={(e) => handleChange({estadoFiltro: e.target.value})}
                >
                    <option value="TODOS">Todos los estados</option>
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="ACTIVO">Activo</option>
                    <option value="INACTIVO">Inactivo</option>
                </select>
            </div>
            <button
            onClick={tablaAlumnosService.exportToExcel}
            style={{ padding: "8px 16px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 8, color: "#22c55e", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
            Exportar Excel
            </button>
        </div>
    )
}