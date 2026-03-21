"use client"
import { useEffect, useState } from "react";
import { tablaAlumnosService } from "../../services/tablaAlumnos.service";
import ToolBar from "./ToolBar";
import { etapas, Alumno } from "../../types";
import Link from "next/link";
import FilaAlumno from "./FilaAlumno";

export default function TablaAlumnos() {
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [filters, setFilters] = useState({
    search: "",
    etapaFiltro: "Todas",
    estadoFiltro: "TODOS",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const params = new URLSearchParams();

                if (filters.search) params.append("search", filters.search);
                if (filters.etapaFiltro !== "Todas") params.append("etapa", filters.etapaFiltro);
                if (filters.estadoFiltro !== "TODOS") params.append("estado", filters.estadoFiltro);

                params.append("page", page.toString());

                const res = await fetch(`/api/alumnos?${params}`);

                if (!res.ok) {
                    throw new Error("Error al obtener alumnos");
                }
                const json = await res.json();

                setAlumnos(json.data.data);
                setTotal(json.data.total);
                setTotalPaginas(json.data.totalPaginas)

            } catch (error: any) {
                setError(error.message || "Error inesperado");
            } finally {
                setLoading(false)
            }
            
        }

        fetchData();
    }, [filters.search, filters.etapaFiltro, filters.estadoFiltro, page])

    return (
        <>
            <ToolBar filters={filters} setFilters={setFilters} setPage={setPage} />
            <div style={{ padding: "8px 16px", fontSize: 12, color: "#5c5b6e" }}>
                {total} resultado{total !== 1 ? "s" : ""}
                {filters.search || filters.etapaFiltro !== "Todas" || filters.estadoFiltro !== "TODOS" ? " (filtrado)" : ""}
            </div>
            {total == 0 ? (
                <div style={{ padding: "48px 32px", textAlign: "center", color: "#888" }}>
                    No se encontraron alumnos
                </div>
                ) : (
                <div style={{ overflowX: "auto" }}>
                    {/*ENCABEZADO*/}
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <thead>
                    <tr>
                        {["Nombre", "Apellido", "DNI", "Fecha Nac.", "Email", "Telefono", "Etapa", "Estado", "Acciones"].map((h) => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, textTransform: "uppercase", color: "#5c5b6e", borderBottom: "1px solid #2e2e38", whiteSpace: "nowrap" }}>
                            {h}
                        </th>
                        ))}
                    </tr>
                    </thead>
                    {/*FILAS*/}
                        <tbody>
                        {alumnos.map((a:any) => (
                            <FilaAlumno key={a.id} alumno={a} />
                        ))}
                        </tbody>
                    </table>
                    </div>
                )}
        </>

    )

}