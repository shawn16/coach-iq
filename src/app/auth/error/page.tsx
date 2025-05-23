"use client";

import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  let errorMessage = "An error occurred during authentication.";
  let showSignInLink = false;

  switch (error) {
    case "OAuthAccountNotLinked":
      errorMessage =
        "This email is already associated with an account. Please sign in with your email and password or use the same provider you originally signed up with.";
      showSignInLink = true;
      break;
    case "OAuthCallback":
      errorMessage = "There was an error signing in with the provider.";
      break;
    case "OAuthSignin":
      errorMessage = "Error in constructing an authorization URL.";
      break;
    case "OAuthCreateAccount":
      errorMessage = "Could not create OAuth provider user in the database.";
      break;
    case "EmailCreateAccount":
      errorMessage = "Could not create email provider user in the database.";
      break;
    case "Callback":
      errorMessage = "Error in the OAuth callback handler.";
      break;
    case "OAuthGetToken":
      errorMessage = "Could not get the OAuth access token.";
      break;
    case "EmailSignIn":
      errorMessage = "Could not send the verification email.";
      break;
    case "CredentialsSignin":
      errorMessage = "Sign in failed. Check the details you provided are correct.";
      showSignInLink = true;
      break;
    case "SessionRequired":
      errorMessage = "Please sign in to access this page.";
      showSignInLink = true;
      break;
    default:
      errorMessage = "An unexpected error occurred.";
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
        
        <div className="flex flex-col space-y-2">
          {showSignInLink && (
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Go to Sign In</Link>
            </Button>
          )}
          
          <Button asChild className="w-full">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
