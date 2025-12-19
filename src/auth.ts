import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credemtials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import bryptjs from "bcryptjs";

async function getUser(email: string) {
    return await prisma.user.findUnique({
        where: { email: email }
    });
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credemtials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().min(1, "Email is required"),
                        password: z.string().min(6, "Password is required"),
                    })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) {
                        return null;
                    }
                    const passwordMatch = await bryptjs.compare(password, user.password);
                    if (passwordMatch) {
                        return user;
                    }
                }
                return null;
            }
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = (token.id || token.sub || "") as string;
                session.user.name = token.name ?? '';
                session.user.email = token.email ?? '';
            }
            return session;
        }
    }
});
