/**
 * NextAuth Type Declarations
 *
 * This file extends the default NextAuth types to include our custom
 * user properties and session data. These type declarations ensure
 * type safety throughout the application when working with authentication.
 *
 * The declarations add:
 * - Custom user properties (id, role)
 * - Extended session data
 * - Custom JWT token properties
 */

// Import NextAuth types to extend them
import "next-auth";
import { JWT } from "next-auth/jwt";

/**
 * Extend the default Session type to include our custom user properties
 * This ensures type safety when accessing session.user in the application
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // User's unique identifier
      name?: string | null; // User's full name
      email?: string | null; // User's email address
      image?: string | null; // User's profile image URL
      role: string; // User's role (e.g., 'coach', 'admin')
    };
  }

  /**
   * Extend the default User type to include our custom properties
   * This matches the data returned by the authorize callback
   */
  interface User {
    id: string; // User's unique identifier
    name?: string | null; // User's full name
    email?: string | null; // User's email address
    image?: string | null; // User's profile image URL
    role: string; // User's role (e.g., 'coach', 'admin')
  }
}

/**
 * Extend the JWT type to include our custom token properties
 * This ensures type safety when working with the JWT in callbacks
 */
declare module "next-auth/jwt" {
  interface JWT {
    id: string; // User's unique identifier
    role: string; // User's role (e.g., 'coach', 'admin')
  }
}
