import { NextRequest, NextResponse } from "next/server";
import { alumnosService } from "../../../features/alumnos/services/alumnos.service";
export const runtime = "nodejs";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const findProps = {
            search: searchParams.get("search") || "",
            etapa: searchParams.get("etapa"),
            estado: searchParams.get("estado"),
            page: Number(searchParams.get("page") || 1),
        }

        const alumnos = await alumnosService.findAll(findProps);
        return NextResponse.json({ data: alumnos });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    let body: any;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Body invalido" }, { status: 400 });
    }

    try {
        const existing = await alumnosService.findByEmail(body.email);
        if (existing) {
            return NextResponse.json({ error: "Ya existe un alumno con ese email" }, { status: 409 });
        }
        const alumno = await alumnosService.create(body);
        return NextResponse.json({ data: alumno }, { status: 201 });
    } catch (e) {
        console.error("Error crear alumno:", e);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}