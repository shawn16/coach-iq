/**
 * Authentication Configuration
 *
 * This file configures NextAuth.js for authentication in the application.
 * It uses credentials-based authentication (email/password) and integrates
 * with our Prisma database.
 *
 * Key Features:
 * - Email/password authentication
 * - JWT-based sessions
 * - Custom user properties (id, role)
 * - Secure password hashing
 */

import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { compare } from "bcrypt";
import { DB } from "@/types/db";

export const authOptions: AuthOptions = {
  // Configure authentication providers
  providers: [
    // Email/password credentials provider
    CredentialsProvider({
      name: "credentials",
      // Define the login form fields
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Handle user authentication
      async authorize(credentials) {
        // Validate credentials
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Find user in database
        const user = await db
          .selectFrom("users")
          .selectAll()
          .where("email", "=", credentials.email)
          .executeTakeFirst();

        // Check if user exists
        if (!user) {
          throw new Error("User not found");
        }

        // Verify password
        const isPasswordValid = await compare(
          credentials.password,
          user.password_hash
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Return user data for session
        return {
          id: user.id.toString(),
          email: user.email,
          name: `${user.first_name} ${user.last_name}`,
          role: user.role,
        };
      },
    }),
  ],

  // Configure session callbacks
  callbacks: {
    // Add custom data to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // Add custom data to session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  // Custom pages
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },

  // Session configuration
  session: {
    strategy: "jwt", // Use JWT for session management
  },

  // Secret for JWT encryption
  secret: process.env.NEXTAUTH_SECRET,
};
