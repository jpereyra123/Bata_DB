import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const authOptions = {
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Contraseña", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email?.toString().toLowerCase().trim();
                const password = credentials?.password?.toString();
                if (!email || !password) return null;

                const user = await prisma.user.findUnique({ where: { email } });
                if (!user) return null;

                const ok = await bcrypt.compare(password, user.passwordHash);
                if (!ok) return null;

                return { id: user.id, email: user.email, role: user.role } as any;
            },
        }),
    ],
    pages: { signIn: "/login" },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }: any) {
            (session.user as any).role = token.role;
            return session;
        },
    },
} as const;

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
