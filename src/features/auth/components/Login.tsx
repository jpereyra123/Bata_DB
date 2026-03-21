import FormLogin from "./FormLogin";

export default function Login() {

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f0f11" }}>
            <div style={{ width: "100%", maxWidth: 400, background: "#18181c", border: "1px solid #2e2e38", borderRadius: 16, padding: "40px 36px" }}>
                <h1 style={{ fontSize: 24, marginBottom: 4, color: "#f0eff4" }}>EduAdmin</h1>
                <p style={{ color: "#888", fontSize: 14, marginBottom: 28 }}>Iniciá sesión para continuar</p>
                <FormLogin/>
            </div>
        </div>
    );
}