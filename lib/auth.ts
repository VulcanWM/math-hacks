import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github'
export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Always redirect to /setup-account after login
            return `${baseUrl}/setup-account`
        },
    },
};