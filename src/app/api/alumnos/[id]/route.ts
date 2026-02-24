import { NextRequest, NextResponse } from "next/server";
import { alumnosService } from "../../../../services/alumnos.service";

export const runtime = "nodejs";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    try {
        const alumno = await alumnosService.findById(id);
        if (!alumno) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
        return NextResponse.json({ data: alumno });
    } catch {
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    let body: any;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Body invalido" }, { status: 400 });
    }
    try {
        const existing = await alumnosService.findById(id);
        if (!existing) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
        const alumno = await alumnosService.update(id, body);
        return NextResponse.json({ data: alumno });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    try {
        const existing = await alumnosService.findById(id);
        if (!existing) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
        await alumnosService.delete(id);
        return new NextResponse(null, { status: 204 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}