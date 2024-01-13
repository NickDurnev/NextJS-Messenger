import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/libs/prismadb";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_APP_URL;

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const loginData = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const { data } = await axios.post(`${BASE_URL}api/login`, loginData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (data) {
          return data;
        }
        return null;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return user;
      }
      const loginData = {
        user: user,
        account: account,
      };

      const { data } = await axios.post(`${BASE_URL}api/login`, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data) {
        return data;
      }
      return null;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
