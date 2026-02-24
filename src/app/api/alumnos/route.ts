import { NextRequest, NextResponse } from "next/server";
import { alumnosService } from "../../../services/alumnos.service";
export const runtime = "nodejs";

export async function GET() {
    try {
        const alumnos = await alumnosService.findAll();
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

    console.log("Body recibido:", body);

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