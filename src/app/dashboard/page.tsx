export default function DashboardPage() {
    return (
        <div>
            <h1 style={{ fontSize: 28, marginBottom: 8 }}>Dashboard 👋</h1>
            <p style={{ color: "#888", marginBottom: 32 }}>Bienvenido a EduAdmin</p>
            <a href="/dashboard/alumnos" style={{ padding: "10px 20px", background: "#f5a623", borderRadius: 8, textDecoration: "none", color: "#000", fontWeight: 600 }}>
                Ver alumnos
            </a>
        </div>
    );
}