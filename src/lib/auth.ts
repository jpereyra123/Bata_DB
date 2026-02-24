import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user) return null;
                const ok = await bcrypt.compare(credentials.password, user.passwordHash);
                if (!ok) return null;
                return { id: user.id, email: user.email, role: user.role };
            },
        }),
    ],
    session: { strategy: "jwt" as const },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) { token.id = user.id; token.role = user.role; }
            return token;
        },
        async session({ session, token }: any) {
            session.user = { ...session.user, id: token.id, role: token.role };
            return session;
        },
    },
    pages: { signIn: "/login" },
    secret: process.env.AUTH_SECRET,
};

export const auth = () => getServerSession(authOptions);