const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

p.user.findMany()
    .then(u => console.log("Usuarios:", u))
    .catch(e => console.error("Error:", e.message))
    .finally(() => p.$disconnect());