import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import dbConnect from "./mongodb";
import User from "../models/User";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt", // use JWT so we can store role
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return required fields for token/session
        return {
          id: user._id,
          email: user.email,
          role: user.role,
        };
      },
    }),

    // GitHub Provider (optional for admin, but included)
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Add role to token on sign in
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Make sure role is included in session
      if (token) {
        session.user.role = token.role || "student";
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin", // your custom sign-in page
  },

  // Optional: restrict sign-in to known domains or emails for admin
  // Or handle in authorize() directly if needed
};

export default NextAuth(authOptions);
