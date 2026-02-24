import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduAdmin",
  description: "Sistema de gestión de alumnos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: "#0f0f11", color: "#f0eff4", fontFamily: "sans-serif" }}>
        {children}
      </body>
    </html>
  );
}