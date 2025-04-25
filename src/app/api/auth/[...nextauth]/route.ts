import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
// Import providers
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// Import bcrypt for password comparison
import bcrypt from "bcrypt";

// TODO: Define provider options

// Basic check for required environment variables
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Missing NEXTAUTH_SECRET environment variable");
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google Provider Configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Credentials Provider Configuration
    CredentialsProvider({
      name: "Credentials", // Name shown on sign-in form
      credentials: {
        // Define fields expected from the sign-in form
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      // The authorize function handles the actual authentication logic
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Auth Error: Missing credentials");
          return null; // Or throw an Error
        }

        console.log(`Auth Attempt: Email=${credentials.email}`);

        // Find user by email in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log(`Auth Error: No user found for email ${credentials.email}`);
          return null; // User not found
        }

        // Check if user has a password set (might have signed up via OAuth)
        if (!user.passwordHash) {
          console.log(`Auth Error: User ${credentials.email} has no password set (OAuth user?)`);
          // Potentially redirect or message user to use OAuth method
          return null;
        }

        // Compare provided password with the hashed password in the database
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isValidPassword) {
          console.log(`Auth Error: Invalid password for user ${credentials.email}`);
          return null; // Invalid password
        }

        console.log(`Auth Success: User ${credentials.email} authenticated`);
        // Return user object without password hash
        // NextAuth requires at least id, name, email for the user object returned here
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image, // Include image if available
        };
      },
    }),
  ],
  // Define session strategy (jwt is common)
  session: {
    strategy: "jwt",
  },
  // Define callbacks if needed (e.g., to add custom data to session/jwt)
  callbacks: {
    // Example: include user ID in the session
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub; // Add id to session.user
      }
      return session;
    },
    // JWT callback can be used to add more info to the token itself
    // async jwt({ token, user }) { ... }
  },
  // Add pages configuration if using custom sign-in pages
  // pages: {
  //   signIn: '/auth/signin',
  // },
  // Add secret from environment variables
  secret: process.env.NEXTAUTH_SECRET,
  // Enable debug messages in development
  debug: process.env.NODE_ENV === "development",
};

// Export the handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };