import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coach IQ",
  description: "AI-Powered Training Platform for Coaches",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
