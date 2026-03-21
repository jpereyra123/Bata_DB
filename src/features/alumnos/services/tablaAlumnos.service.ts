import { alumnosService } from "./alumnos.service";
import * as XLSX from "xlsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const tablaAlumnosService = {
    async handleDelete(id: string, nombre: string, router: AppRouterInstance) {
        if (!confirm(`Eliminar a ${nombre}?`)) return;
        const res = await fetch(`/api/alumnos/${id}`, { method: "DELETE" });
        if (res.ok) router.refresh();
        else alert("Error al eliminar");
    },
    async handleEstado(id: string, estado: string, router: AppRouterInstance) {
        const res = await fetch(`/api/alumnos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
        });
        if (res.ok) router.refresh();
        else alert("Error al actualizar estado");
    },

    async exportToExcel() {
        const alumnos : any = await alumnosService.findAll({search: "", etapa: "", estado: "", page: null});
        const data = alumnos.map((a : any) => ({
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
}