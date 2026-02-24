"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/alumnos", label: "Alumnos" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside style={{
            width: 240,
            background: "#18181c",
            borderRight: "1px solid #2e2e38",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            padding: "24px 12px",
            display: "flex",
            flexDirection: "column",
        }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#f5a623", padding: "0 12px", marginBottom: 32 }}>
                EduAdmin
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {navItems.map(({ href, label }) => {
                    const isActive = href === "/dashboard"
                        ? pathname === "/dashboard"
                        : pathname.startsWith(href);

                    return (
                        <Link key={href} href={href} style={{
                            padding: "9px 12px",
                            borderRadius: 8,
                            textDecoration: "none",
                            fontSize: 14,
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? "#f5a623" : "#9b9aaa",
                            background: isActive ? "rgba(245,166,35,0.12)" : "transparent",
                        }}>
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}