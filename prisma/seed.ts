import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const email = process.env.SEED_ADMIN_EMAIL?.toLowerCase().trim();
    const password = process.env.SEED_ADMIN_PASSWORD;

    console.log("SEED_ADMIN_EMAIL:", email ? "[OK]" : "[MISSING]");
    console.log("SEED_ADMIN_PASSWORD:", password ? "[OK]" : "[MISSING]");

    if (!email || !password) {
        throw new Error("Faltan SEED_ADMIN_EMAIL o SEED_ADMIN_PASSWORD en .env");
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        console.log("Admin ya existe, no se crea de nuevo:", email);
        return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const created = await prisma.user.create({
        data: { email, passwordHash, role: Role.ADMIN },
    });

    console.log("✅ Admin creado:", created.email, created.id);
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
