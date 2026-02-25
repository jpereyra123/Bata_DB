"use client";

import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <div style={{ width: 240, background: "#18181c", borderRight: "1px solid #2e2e38", height: "100vh", position: "fixed", padding: "24px 12px" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#f5a623", padding: "0 12px", marginBottom: 32 }}>EduAdmin</div>
                    <a href="/dashboard" style={{ display: "block", padding: "9px 12px", borderRadius: 8, textDecoration: "none", color: "#9b9aaa", fontSize: 14, marginBottom: 4 }}>Dashboard</a>
                    <a href="/dashboard/alumnos" style={{ display: "block", padding: "9px 12px", borderRadius: 8, textDecoration: "none", color: "#9b9aaa", fontSize: 14 }}>Alumnos</a>
                    <a href="/dashboard/usuarios" style={{ display: "block", padding: "9px 12px", borderRadius: 8, textDecoration: "none", color: "#9b9aaa", fontSize: 14, marginTop: 4 }}>
                        Usuarios
                    </a>
                </div>
                <div style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column" }}>
                    <header style={{ height: 60, borderBottom: "1px solid #2e2e38", background: "#18181c", display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 28px" }}>
                        <a href="/api/auth/signout" style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #2e2e38", color: "#ef4444", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>Salir</a>
                    </header>
                    <main style={{ flex: 1, padding: "32px" }}>{children}</main>
                </div>
            </div>
        </SessionProvider>
    );
}