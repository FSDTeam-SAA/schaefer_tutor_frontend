import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./data/user";
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;

        // Check if the user exists
        const user = await getUser(credentials.email as string);

        if (!user) return null;
        return {
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
