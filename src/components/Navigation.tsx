'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-12 h-12 group-hover:scale-110 transition-transform">
              <Image
                src="/images/jagaco-logo.png"
                alt="Jagaco Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[40px] font-bold text-white leading-none font-[family-name:var(--font-typomoderno)]">
              jagaco
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/blog"
              className="text-white hover:text-[#FDB614] transition-colors font-medium text-[14px] uppercase tracking-wide"
            >
              BLOG
            </Link>
            <Link
              href="/games"
              className="text-white hover:text-[#FDB614] transition-colors font-medium text-[14px] uppercase tracking-wide"
            >
              GAMES
            </Link>
            <Link
              href="/engine"
              className="text-white hover:text-[#FDB614] transition-colors font-medium text-[14px] uppercase tracking-wide"
            >
              ENGINE
            </Link>
            <Link
              href="/#team"
              className="text-white hover:text-[#FDB614] transition-colors font-medium text-[14px] uppercase tracking-wide"
            >
              TEAM
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#FDB614] focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/blog"
              className="block px-3 py-2 text-gray-900 hover:text-[#FDB614] hover:bg-gray-50 rounded-md transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              BLOG
            </Link>
            <Link
              href="/games"
              className="block px-3 py-2 text-gray-900 hover:text-[#FDB614] hover:bg-gray-50 rounded-md transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              GAMES
            </Link>
            <Link
              href="/engine"
              className="block px-3 py-2 text-gray-900 hover:text-[#FDB614] hover:bg-gray-50 rounded-md transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              ENGINE
            </Link>
            <Link
              href="/#team"
              className="block px-3 py-2 text-gray-900 hover:text-[#FDB614] hover:bg-gray-50 rounded-md transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              TEAM
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
