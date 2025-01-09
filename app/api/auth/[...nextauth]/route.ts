/* eslint-disable @typescript-eslint/no-explicit-any */
import { pages } from 'config/pages';
import {
    createOAuthUser,
    getUserByEmail,
    loginOAuthUser,
} from 'core/helpers/auth';
import { login } from 'core/services/auth';
import jwt, { Secret } from 'jsonwebtoken';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    pages: pages,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            authorize: async function (
                credentials: Record<'email' | 'password', string> | undefined,
            ): Promise<any> {
                if (!credentials) return null;

                const res = await login(credentials);
                const user = await res.json();

                if (user.status === 200) {
                    return {
                        token: user.token,
                        id: user.id,
                        email: user.email,
                        role: user.role,
                    };
                }

                if (user.status === 401)
                    throw new Error('Invalid credentials!');

                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            const existingUser = await getUserByEmail(user.email!);
            if (account?.provider !== 'credentials') {
                if (existingUser && existingUser.password) {
                    throw new Error(
                        'Email already linked to other account. Please login using your credentials!',
                    );
                } else {
                    await createOAuthUser(user.email!);
                    return true;
                }
            }
            return true;
        },
        async jwt({
            token,
            user,
            account,
        }: {
            token: any;
            user: any;
            account: any;
        }) {
            if (account?.provider === 'credentials' && user) {
                const check = (await jwt.verify(
                    user.token,
                    process.env.JWT_SECRET as Secret,
                )) as { email: string; role: string };
                token = {
                    ...token,
                    token: user.token,
                    email: check.email,
                    role: check.role,
                    id: user.id,
                };
            } else if (
                account?.access_token &&
                account.provider !== 'credentials'
            ) {
                const socialUser = (await loginOAuthUser(account?.email)) as {
                    token: string;
                    role: string;
                };
                token = {
                    ...token,
                    token: socialUser.token,
                    email: user.email,
                    role: socialUser.role,
                    id: user.id,
                };
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            session.user.token = token.token;
            session.user.role = token.role;
            session.user.email = token.email;
            session.user.id = token.id;
            return session;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 2 * 24 * 60 * 60, // 2 days
    },
});

export { handler as GET, handler as POST };
