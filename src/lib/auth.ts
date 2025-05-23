import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
// Import providers
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// Import bcryptjs for password comparison
// Use require to avoid TypeScript module resolution issues
const bcrypt = require('bcryptjs');

// Basic check for required environment variables
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn("Missing Google OAuth environment variables");
}
if (!process.env.NEXTAUTH_SECRET) {
  console.warn("Missing NEXTAUTH_SECRET environment variable");
}

// Add this type extension for NextAuth
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google Provider Configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",  // Forces account selection
          access_type: "offline",
          response_type: "code"
        }
      }
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
        let isValidPassword = false;
        try {
isValidPassword = await bcrypt.compare(credentials.password, user.passwordHash);
        } catch (error) {
          console.error("Error in password comparison:", error);
          return null;
        }

        if (!isValidPassword) {
          console.log(`Auth Error: Invalid password for user ${credentials.email}`);
          return null; // Invalid password
        }

        console.log(`Auth Success: User ${credentials.email} authenticated`);
        // Return user object without password hash
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
  // Define callbacks if needed
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Always allow OAuth sign-in, even if email is already in use
      if (account?.provider && account.provider !== 'credentials' && user?.email) {
        // Check if user already has an account with this provider
        const existingAccount = await prisma.account.findFirst({
          where: {
            provider: account.provider,
            providerAccountId: account.providerAccountId
          },
          select: { userId: true }
        });

        // If account exists, sign in
        if (existingAccount) {
          user.id = existingAccount.userId;
          return true;
        }

        // If email is not in use, allow sign up
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true }
        });

        if (!existingUser) {
          return true; // Allow new user creation
        }

        // If we get here, the email is in use but with a different provider
        // Instead of linking, we'll show an error message
        throw new Error('This email is already in use with a different sign-in method. Please use your original sign-in method.');
      }
      
      // For credentials sign in, we've already verified the credentials in the authorize callback
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    // Add role to the JWT token
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
        token.email = user.email;
        
        // If this is an OAuth sign in, we can get the provider
        if (account) {
          token.provider = account.provider;
        }
      }
      return token;
    },
    // Include user ID and role in the session
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  // Add secret from environment variables
  secret: process.env.NEXTAUTH_SECRET,
  // Enable debug messages in development
  debug: process.env.NODE_ENV === "development",
};