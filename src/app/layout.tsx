import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
import { Providers } from "@/components/providers";

export const metadata = {
  title: "Coach IQ",
  description: "AI-Powered Training Platform for Coaches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, "font-inter antialiased")}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
