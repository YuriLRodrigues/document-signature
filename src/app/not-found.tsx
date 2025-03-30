'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

import { House } from 'lucide-react'

export default function NotFound() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="bg-gradient-to-background flex min-h-screen flex-col items-center justify-center overflow-hidden from-blue-50 to-blue-100 p-4 dark:from-slate-900 dark:to-slate-800">
      <div
        className={`w-full max-w-3xl text-center transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="relative mb-10 flex h-48 justify-center">
          <div
            className={`absolute top-4 left-1/2 -ml-40 flex h-40 w-32 -rotate-12 transform items-center justify-center rounded-lg border-2 border-blue-200 bg-white shadow-lg transition-all duration-1000 ease-out dark:border-slate-600 dark:bg-slate-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2v6h6"></path>
                  <path d="M4 7V2h10v5"></path>
                  <path d="M4 15h16"></path>
                  <path d="M4 11h16"></path>
                  <path d="M4 19h16"></path>
                  <line x1="10" y1="7" x2="18" y2="15"></line>
                  <line x1="18" y1="7" x2="10" y2="15"></line>
                </svg>
              </div>
            </div>
          </div>

          <div
            className={`absolute left-1/2 z-10 -ml-16 flex h-40 w-32 items-center justify-center rounded-lg border-2 border-blue-200 bg-white shadow-lg transition-all duration-1000 ease-out dark:border-slate-600 dark:bg-slate-700 ${
              isLoaded ? 'animate-float translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>

          <div
            className={`absolute top-2 left-1/2 ml-8 flex h-40 w-32 rotate-12 transform items-center justify-center rounded-lg border-2 border-blue-200 bg-white shadow-lg transition-all duration-1000 ease-out dark:border-slate-600 dark:bg-slate-700 ${
              isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2v6h6"></path>
                  <path d="M4 7V2h10v5"></path>
                  <path d="M4 15h16"></path>
                  <path d="M4 11h16"></path>
                  <path d="M4 19h16"></path>
                  <line x1="10" y1="7" x2="18" y2="15"></line>
                  <line x1="18" y1="7" x2="10" y2="15"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <h1 className="mb-2 text-6xl font-bold">404</h1>
          <h2 className="mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-200">Página não encontrada</h2>
        </div>

        <p
          className={`mx-auto mb-8 max-w-lg text-lg text-gray-600 transition-all duration-1000 ease-out dark:text-gray-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transitionDelay: '400ms' }}
        >
          A página que você está procurando não pode ser encontrada em nosso sistema.
        </p>

        <div
          className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border-2 border-dotted px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-700"
          >
            <House />
            Página Inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
