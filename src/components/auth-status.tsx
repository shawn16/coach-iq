"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, LogIn } from "lucide-react";

export function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // Optional: Render a loading indicator
    return <div className="h-8 w-20 rounded-md bg-muted animate-pulse"></div>;
  }

  if (status === "authenticated" && session?.user) {
    const user = session.user;
    const userInitial = user.name
      ? user.name.charAt(0).toUpperCase()
      : user.email
      ? user.email.charAt(0).toUpperCase()
      : "?";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              {user.image && (
                <AvatarImage
                  src={user.image}
                  alt={user.name || "User Avatar"}
                />
              )}
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.name || "User"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* Add links to profile/settings later if needed */}
          {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
          {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Unauthenticated state
  return (
    <Button variant="outline" onClick={() => signIn()}>
      <LogIn className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  );
}
