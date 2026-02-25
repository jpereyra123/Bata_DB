import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";

export const runtime = "nodejs";

export async function GET() {
    try {
        const usuarios = await prisma.user.findMany({
            select: { id: true, email: true, role: true, createdAt: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ data: usuarios });
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

    const { email, password, role } = body;

    if (!email || !password) {
        return NextResponse.json({ error: "Email y password son requeridos" }, { status: 400 });
    }

    try {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "Ya existe un usuario con ese email" }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: { email, passwordHash, role: role ?? "USER" },
            select: { id: true, email: true, role: true, createdAt: true },
        });

        return NextResponse.json({ data: user }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    try {
        await prisma.user.delete({ where: { id } });
        return new NextResponse(null, { status: 204 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
