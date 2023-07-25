import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";

const handleLink = async (user, profile, prop) => {
  // console.log(prop);
  // console.log(profile[prop]);
  if (!user[prop] && profile[prop]) {
    await prisma.user.update({
      where: { id: user.id },
      data: { [`${prop}`]: profile[prop] },
    });
  }
};

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }) {
      session.id = user.id;
      return session;
    },
    redirect({ url }) {
      return url;
    },
  },
  events: {
    async linkAccount({ user, profile }) {
      await handleLink(user, profile, "image");
      await handleLink(user, profile, "name");
    },
  },
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
});
