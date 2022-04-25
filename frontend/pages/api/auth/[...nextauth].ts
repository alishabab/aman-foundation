import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { config } from "config";

const administrators = ["shababsaifi@gmail.com"];

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID || "",
      clientSecret: config.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        // User object only passed on initial JWT creation
        // @ts-ignore
        token.isAdmin = administrators.includes(user?.email);
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.isAdmin = token.isAdmin;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
