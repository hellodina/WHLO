import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

// Development-only authentication without email
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Add a simple development provider
    {
      id: "dev",
      name: "Development",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        
        // For development, create or find user
        let user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });
        
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: credentials.email as string,
              name: credentials.email.split('@')[0],
            }
          });
        }
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    },
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
