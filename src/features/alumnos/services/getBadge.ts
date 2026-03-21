export default function getBadge(estado: string) {
    if (estado === "ACTIVO") return { bg: "rgba(34,197,94,0.12)", color: "#22c55e", label: "Activo" };
    if (estado === "PENDIENTE") return { bg: "rgba(245,166,35,0.12)", color: "#f5a623", label: "Pendiente" };
    return { bg: "rgba(239,68,68,0.12)", color: "#ef4444", label: "Inactivo" };
}