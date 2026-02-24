import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "../../../../lib/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("=== AUTHORIZE ===");
        console.log("email:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log("Sin credenciales");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        console.log("Usuario encontrado:", user ? "SI" : "NO");

        if (!user) return null;

        const ok = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        console.log("Password ok:", ok);

        if (!ok) return null;

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) { token.id = user.id; token.role = user.role; }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };