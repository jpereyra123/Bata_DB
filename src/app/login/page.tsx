"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const result = await signIn("credentials", { email, password, redirect: false });
            if (result?.error) { setError("Credenciales inválidas"); return; }
            router.push("/dashboard");
            router.refresh();
        } catch {
            setError("Error inesperado");
        } finally {
            setLoading(false);
        }
    }

    const inputStyle = { width: "100%", padding: "9px 12px", background: "#222228", border: "1px solid #2e2e38", borderRadius: 8, color: "#f0eff4", fontSize: 14, outline: "none" };

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f0f11" }}>
            <div style={{ width: "100%", maxWidth: 400, background: "#18181c", border: "1px solid #2e2e38", borderRadius: 16, padding: "40px 36px" }}>
                <h1 style={{ fontSize: 24, marginBottom: 4, color: "#f0eff4" }}>EduAdmin</h1>
                <p style={{ color: "#888", fontSize: 14, marginBottom: 28 }}>Iniciá sesión para continuar</p>

                {error && (
                    <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "10px 14px", color: "#ef4444", fontSize: 13, marginBottom: 20 }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                        <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6 }}>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@email.com" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6 }}>Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" style={inputStyle} />
                    </div>
                    <button type="submit" disabled={loading} style={{ padding: "11px 16px", background: "#f5a623", borderRadius: 8, border: "none", color: "#000", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8 }}>
                        {loading ? "Verificando..." : "Ingresar"}
                    </button>
                </form>
            </div>
        </div>
    );
}