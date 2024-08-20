/* import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
      // Configure one or more authentication providers  
      providers: [    
        GithubProvider({      
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',    
        }),    
        // ...add more providers here
    ],
}

export default NextAuth(authOptions) */


import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credential from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";
import { NextResponse } from "next/server";

// Configuración de NextAuth
const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        Credential({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const user = {
                    id: "1",
                    username: "jsmith",
                    name: "J Smith",
                    email: "jsmith@example.com",
                    image: "https://picsum.photos/100/100",
                }
                if (user) {
                    return user
                }else {
                    return null
                }
            },
        })
    ],
    callbacks: {
        async redirect({ baseUrl }: any) {
          // Redirigir a /dashboard después del inicio de sesión exitoso
          return baseUrl + '/dashboard';
        },
      },
};

const handler = NextAuth(authOptions);

// Exportar el handler para diferentes métodos HTTP
export const GET = handler;
export const POST = handler;
