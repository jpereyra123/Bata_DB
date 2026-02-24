"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import * as XLSX from "xlsx";

interface Alumno {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  telefono: string;
  fechaNacimiento: string;
  curso: string;
  estado: string;
}

const etapas = [
  "Todas",
  "Pichones",
  "Horneros",
  "Cam/Ch",
  "Pioneros/Fuegos",
  "Rastr/Hog",
  "Baq/Ant",
  "Baq/Ant inst",
  "Soles",
];

const PAGE_SIZE = 10;

export default function TablaAlumnos({ alumnos }: { alumnos: Alumno[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [etapaFiltro, setEtapaFiltro] = useState("Todas");
  const [estadoFiltro, setEstadoFiltro] = useState("TODOS");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return alumnos.filter((a) => {
      const matchSearch =
        search === "" ||
        a.nombre.toLowerCase().includes(search.toLowerCase()) ||
        a.apellido.toLowerCase().includes(search.toLowerCase()) ||
        a.dni.includes(search) ||
        a.email.toLowerCase().includes(search.toLowerCase());

      const matchEtapa = etapaFiltro === "Todas" || a.curso === etapaFiltro;
      const matchEstado = estadoFiltro === "TODOS" || a.estado === estadoFiltro;

      return matchSearch && matchEtapa && matchEstado;
    });
  }, [alumnos, search, etapaFiltro, estadoFiltro]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearchChange(val: string) {
    setSearch(val);
    setPage(1);
  }

  function handleEtapaChange(val: string) {
    setEtapaFiltro(val);
    setPage(1);
  }

  function handleEstadoChange(val: string) {
    setEstadoFiltro(val);
    setPage(1);
  }

  async function handleDelete(id: string, nombre: string) {
    if (!confirm(`Eliminar a ${nombre}?`)) return;
    const res = await fetch(`/api/alumnos/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Error al eliminar");
  }

  function exportToExcel() {
    const data = filtered.map((a) => ({
      Nombre: a.nombre,
      Apellido: a.apellido,
      DNI: a.dni,
      Email: a.email,
      Telefono: a.telefono,
      "Fecha Nac.": a.fechaNacimiento,
      Etapa: a.curso,
      Estado: a.estado,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Alumnos");
    XLSX.writeFile(wb, "alumnos.xlsx");
  }

  const inputStyle = {
    padding: "8px 12px",
    background: "#222228",
    border: "1px solid #2e2e38",
    borderRadius: 8,
    color: "#f0eff4",
    fontSize: 13,
    outline: "none",
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{ padding: "16px 16px 0", display: "flex", gap: 12, flexWrap: "wrap" as const, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const, flex: 1 }}>
          {/* Busqueda */}
          <input
            style={{ ...inputStyle, minWidth: 220 }}
            placeholder="Buscar por nombre, apellido, DNI..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          {/* Filtro etapa */}
          <select
            style={{ ...inputStyle, cursor: "pointer" }}
            value={etapaFiltro}
            onChange={(e) => handleEtapaChange(e.target.value)}
          >
            {etapas.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>

          {/* Filtro estado */}
          <select
            style={{ ...inputStyle, cursor: "pointer" }}
            value={estadoFiltro}
            onChange={(e) => handleEstadoChange(e.target.value)}
          >
            <option value="TODOS">Todos los estados</option>
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
          </select>
        </div>

        {/* Exportar */}
        <button
          onClick={exportToExcel}
          style={{ padding: "8px 16px", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 8, color: "#22c55e", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
        >
          Exportar Excel
        </button>
      </div>

      {/* Resultados */}
      <div style={{ padding: "8px 16px", fontSize: 12, color: "#5c5b6e" }}>
        {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        {search || etapaFiltro !== "Todas" || estadoFiltro !== "TODOS" ? " (filtrado)" : ""}
      </div>

      {/* Tabla */}
      {paginated.length === 0 ? (
        <div style={{ padding: "48px 32px", textAlign: "center", color: "#888" }}>
          No se encontraron alumnos
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
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
            <tbody>
              {paginated.map((a) => (
                <tr key={a.id} style={{ transition: "background 0.1s" }}>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#f0eff4", fontWeight: 600 }}>{a.nombre}</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{a.apellido}</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{a.dni}</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{a.fechaNacimiento}</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{a.email}</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{a.telefono}</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38", color: "#9b9aaa" }}>{a.curso}</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38" }}>
                    <span style={{ padding: "2px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: a.estado === "ACTIVO" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)", color: a.estado === "ACTIVO" ? "#22c55e" : "#ef4444" }}>
                      {a.estado}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #2e2e38" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link href={`/dashboard/alumnos/${a.id}/editar`} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #2e2e38", color: "#9b9aaa", textDecoration: "none", fontSize: 13 }}>
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(a.id, a.nombre)}
                        style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 13, cursor: "pointer" }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Paginacion */}
      {totalPages > 1 && (
        <div style={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #2e2e38" }}>
          <span style={{ fontSize: 13, color: "#5c5b6e" }}>
            Página {page} de {totalPages}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid #2e2e38", background: "transparent", color: page === 1 ? "#5c5b6e" : "#9b9aaa", fontSize: 13, cursor: page === 1 ? "not-allowed" : "pointer" }}
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid", borderColor: p === page ? "#f5a623" : "#2e2e38", background: p === page ? "rgba(245,166,35,0.12)" : "transparent", color: p === page ? "#f5a623" : "#9b9aaa", fontSize: 13, cursor: "pointer", fontWeight: p === page ? 700 : 400 }}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid #2e2e38", background: "transparent", color: page === totalPages ? "#5c5b6e" : "#9b9aaa", fontSize: 13, cursor: page === totalPages ? "not-allowed" : "pointer" }}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
