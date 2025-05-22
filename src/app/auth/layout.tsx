import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          href="/"
          className={cn(
            "absolute left-4 top-4 md:left-8 md:top-8",
            "inline-flex items-center justify-center rounded-lg"
          )}
        >
          <span className="text-xl font-bold tracking-tight">Coach IQ</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
