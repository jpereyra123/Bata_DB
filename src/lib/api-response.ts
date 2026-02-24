import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export const ok = <T>(data: T, status = 200) =>
    NextResponse.json({ data }, { status });

export const created = <T>(data: T) => ok(data, 201);

export const noContent = () => new NextResponse(null, { status: 204 });

export const badRequest = (message: string, details?: Record<string, string[]>) =>
    NextResponse.json({ error: message, details }, { status: 400 });

export const unauthorized = (message = "No autorizado") =>
    NextResponse.json({ error: message }, { status: 401 });

export const forbidden = (message = "Acceso denegado") =>
    NextResponse.json({ error: message }, { status: 403 });

export const notFound = (message = "No encontrado") =>
    NextResponse.json({ error: message }, { status: 404 });

export const conflict = (message: string) =>
    NextResponse.json({ error: message }, { status: 409 });

export const serverError = (message = "Error interno") =>
    NextResponse.json({ error: message }, { status: 500 });

export function fromZodError(error: ZodError) {
    const details: Record<string, string[]> = {};
    for (const issue of error.issues) {
        const key = issue.path.join(".");
        if (!details[key]) details[key] = [];
        details[key].push(issue.message);
    }
    return badRequest("Datos inválidos", details);
}