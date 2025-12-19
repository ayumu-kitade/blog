import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const authConfig = {
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                const { email, password } = credentials as { email: string, password: string }
                const user = await prisma.user.findUnique({ where: { email } })
                if (!user) return null
                const isValid = await compare(password, user.password)
                if (!isValid) return null
                return { id: user.id, name: user.name, email: user.email }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id
            }
            return token
        },
        session: ({ session, token }) => {
            session.user.id = token.id as string
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/manage');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return Response.redirect(new URL('/login', nextUrl));
            } else if (isLoggedIn && nextUrl.pathname === '/login') {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        }
    }
} satisfies NextAuthConfig;
