import { DefaultSession } from "next-auth"; // Only import used types

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id. */
      id: string;
    } & DefaultSession["user"]; // Keep the default fields
  }

  // Optional: Augment User type if needed later
  // interface User extends DefaultUser { ... }
}

// Optional: Augment JWT type if needed later
// declare module "next-auth/jwt" {
//   interface JWT {
//     /** Add custom properties here */
//   }
// }