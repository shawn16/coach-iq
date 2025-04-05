"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold">
            Coach IQ
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {status === "authenticated" && session ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
                <Link href="/athletes" className="hover:text-blue-200">
                  Athletes
                </Link>
                <Link href="/teams" className="hover:text-blue-200">
                  Teams
                </Link>
                <Link href="/workouts" className="hover:text-blue-200">
                  Workouts
                </Link>
                <Link href="/training-plans" className="hover:text-blue-200">
                  Training Plans
                </Link>
                <div className="relative group ml-4">
                  <button className="flex items-center hover:text-blue-200">
                    {session.user?.name || session.user?.email}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-10 hidden group-hover:block">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : isHomePage ? (
              <>
                <Link href="/login" className="hover:text-blue-200">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link href="/login" className="hover:text-blue-200">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            {status === "authenticated" && session ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 hover:text-blue-200"
                >
                  Dashboard
                </Link>
                <Link
                  href="/athletes"
                  className="block py-2 hover:text-blue-200"
                >
                  Athletes
                </Link>
                <Link href="/teams" className="block py-2 hover:text-blue-200">
                  Teams
                </Link>
                <Link
                  href="/workouts"
                  className="block py-2 hover:text-blue-200"
                >
                  Workouts
                </Link>
                <Link
                  href="/training-plans"
                  className="block py-2 hover:text-blue-200"
                >
                  Training Plans
                </Link>
                <Link
                  href="/profile"
                  className="block py-2 hover:text-blue-200"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block py-2 hover:text-blue-200"
                >
                  Settings
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left py-2 hover:text-blue-200"
                >
                  Sign Out
                </button>
              </>
            ) : isHomePage ? (
              <>
                <Link href="/login" className="block py-2 hover:text-blue-200">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block py-2 hover:text-blue-200"
                >
                  Register
                </Link>
              </>
            ) : (
              <Link href="/login" className="block py-2 hover:text-blue-200">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
