"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import FilaAlumno from "../alumnos/components/TablaAlumnos/FilaAlumno";


interface Alumno {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  telefono: string;
  fechaNacimiento: string;
  etapa: string;
  estado: string;
}

const PAGE_SIZE = 10;

export default function TablaAlumnos() {
  const alumnos;
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

      const matchEtapa = etapaFiltro === "Todas" || a.etapa === etapaFiltro;
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

  async function handleEstado(id: string, estado: string) {
    const res = await fetch(`/api/alumnos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    });
    if (res.ok) router.refresh();
    else alert("Error al actualizar estado");
  }

  function exportToExcel() {
    const data = filtered.map((a) => ({
      Nombre: a.nombre,
      Apellido: a.apellido,
      DNI: a.dni,
      Email: a.email,
      Telefono: a.telefono,
      "Fecha Nac.": a.fechaNacimiento,
      Etapa: a.etapa,
      Estado: a.estado,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Alumnos");
    XLSX.writeFile(wb, "alumnos.xlsx");
  }

  /*
  ELIMINAR TODO ESTO Y PASAR A CSS

  const inputStyle = {
    padding: "8px 12px",
    background: "#222228",
    border: "1px solid #2e2e38",
    borderRadius: 8,
    color: "#f0eff4",
    fontSize: 13,
    outline: "none",
  };

  function getBadgeStyle(estado: string) {
    if (estado === "ACTIVO") return { background: "rgba(34,197,94,0.12)", color: "#22c55e" };
    if (estado === "PENDIENTE") return { background: "rgba(245,166,35,0.12)", color: "#f5a623" };
    return { background: "rgba(239,68,68,0.12)", color: "#ef4444" };
  }
  */
  return (
    <div>
      

      {paginated.length === 0 ? (
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
              {paginated.map((a:Alumno) => (
                <FilaAlumno alumno={a}/>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div style={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #2e2e38" }}>
          <span style={{ fontSize: 13, color: "#5c5b6e" }}>
            Pagina {page} de {totalPages}
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

