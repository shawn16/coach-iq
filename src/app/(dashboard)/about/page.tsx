"use client"

import { useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"

function ErrorFallback() {
  return (
    <div className="p-6 text-red-500">
      <h2 className="text-xl font-bold mb-2">Something went wrong with the About page.</h2>
      <p>We're working on fixing this issue.</p>
    </div>
  )
}

function AboutContent() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      {/* Header with Badge */}
      <div className="text-center mb-16 relative">
        <div className="flex items-center justify-center mb-6">
          <div className="relative mr-4">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
              >
                <path d="M12 2v6.5l3-3"></path>
                <path d="M12 2v6.5l-3-3"></path>
                <path d="M7 10.5a5 5 0 1 0 10 0"></path>
                <path d="M17.8 14a7.5 7.5 0 1 0-11.6 0"></path>
                <path d="M12 22v-3"></path>
                <path d="M10 22h4"></path>
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 dark:bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800">
              IQ
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">About Coach IQ Labs</h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Built by a coach. Powered by data. Focused on winning.
        </p>
      </div>

      <div className="space-y-16">
        {/* Our Story */}
        <div className="transform transition-all hover:translate-y-[-5px] duration-300">
          <div className="bg-white/90 dark:bg-gray-800/70 p-8 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg transition-all">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
              Our Story
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-normal max-w-prose mx-auto">
              Coach IQ Labs was created by a high school cross country and track coach with 15+ years of experience
              turning struggling programs into champions. After years of juggling spreadsheets, guessing at workouts,
              and second-guessing race plans, he built the system he wished he had—then made it available to other
              coaches.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-normal max-w-prose mx-auto mt-4">
              Coach IQ Labs exists to simplify your workflow, sharpen your instincts, and help your team win
              consistently.
            </p>
          </div>
        </div>

        {/* Created By */}
        <div className="transform transition-all hover:translate-y-[-5px] duration-300">
          <div className="bg-indigo-50/80 dark:bg-indigo-950/20 p-8 rounded-xl border border-indigo-100 dark:border-indigo-900/30 shadow-md hover:shadow-lg transition-all">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b border-indigo-100 dark:border-indigo-900/30 pb-3">
              Created By
            </h2>
            <div className="flex items-center gap-8 mb-6 max-w-prose mx-auto">
              <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-full shadow-inner">
                <div className="w-12 h-12 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <span className="text-2xl font-bold">S</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-0.5">Coach Shawn Siemers</h3>
                <p className="text-lg text-gray-500 dark:text-gray-400 leading-tight">Founder & Head Coach</p>
              </div>
            </div>
            <div className="border-t border-indigo-100 dark:border-indigo-900/30 pt-2 opacity-60"></div>
          </div>
        </div>

        {/* What Coach IQ Can Do */}
        <div className="transform transition-all hover:translate-y-[-5px] duration-300">
          <div className="bg-green-50/80 dark:bg-green-950/20 p-8 rounded-xl border border-green-100 dark:border-green-900/30 shadow-md hover:shadow-lg transition-all">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b border-green-100 dark:border-green-900/30 pb-3">
              What Coach IQ Can Do
            </h2>
            <ul className="space-y-5 max-w-prose mx-auto">
              {[
                "Build smarter training plans",
                "Track athlete performance",
                "Create AI-powered race strategies",
                "Surface insights from training data",
                "Replace chaos with clarity",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <div className="w-4 h-4 rounded-full bg-green-500 dark:bg-green-400"></div>
                  </div>
                  <span className="text-lg text-gray-700 dark:text-gray-300 font-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="transform transition-all hover:translate-y-[-5px] duration-300">
          <div className="bg-blue-50/80 dark:bg-blue-950/20 p-8 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-md hover:shadow-lg transition-all">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b border-blue-100 dark:border-blue-900/30 pb-3">
              Contact Info
            </h2>
            <div className="flex items-center gap-4 max-w-prose mx-auto">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600 dark:text-blue-400"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <a
                href="mailto:support@coachiqlabs.com"
                className="text-lg text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-normal"
              >
                support@coachiqlabs.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Version Info */}
      <div className="text-center mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">Coach IQ Labs v0.9 beta – Last updated March 2025</p>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AboutContent />
    </ErrorBoundary>
  )
}

