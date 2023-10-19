import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitbubProvider from "next-auth/providers/github";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { comparePassword } from "@/util";
import { NextAuthOptions, User, getServerSession } from "next-auth";

import prisma from "./db";
import { LoginSubmit, SessionInterface } from "@/common.type";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const data = credentials as LoginSubmit;
        const user = await prisma.user.findUnique({
          where: { email: data.email },
        });
        if (
          user &&
          user.password &&
          (await comparePassword(user.password, data.password))
        )
          return null;
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitbubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
        },
        secret
      );

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const userExist = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        if (userExist) return false;
        await prisma.user.create({
          data: {
            email: user.email!,
            username: user.email!,
            password: "",
            avatarUrl: user.image!,
          },
        });
        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
    async session({ session }) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: session.user?.email! },
        });
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...user,
          },
        };

        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export async function getServerAuthSession() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
