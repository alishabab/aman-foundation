import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const administrators = ["shababsaifi@gmail.com"];

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
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
      return session;
    },
  },
});
