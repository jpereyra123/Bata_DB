"use client";

import { useSession, signOut } from "next-auth/react";

export function Navbar() {
    const { data: session } = useSession();

    return (
        <header style={{
            height: 60,
            borderBottom: "1px solid #2e2e38",
            background: "#18181c",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 28px",
            gap: 16,
        }}>
            <span style={{ fontSize: 13, color: "#9b9aaa" }}>
                {session?.user?.email}
            </span>
            <span style={{
                fontSize: 11,
                background: "rgba(245,166,35,0.12)",
                color: "#f5a623",
                padding: "2px 8px",
                borderRadius: 99,
                fontWeight: 600,
            }}>
                {session?.user?.role}
            </span>
            <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                style={{
                    padding: "6px 14px",
                    borderRadius: 8,
                    border: "1px solid #2e2e38",
                    background: "transparent",
                    color: "#ef4444",
                    fontSize: 13,
                    cursor: "pointer",
                    fontWeight: 600,
                }}
            >
                Salir
            </button>
        </header>
    );
}