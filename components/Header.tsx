'use client'

import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { LOGO_ASCII } from '@/lib/logo'

export function Header() {
  const { toggle } = useTheme()

  return (
    <header className="w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80" aria-label="Base Segura — Inicio">
          <pre className="font-mono text-[3px] sm:text-[4px] md:text-[5px] leading-tight whitespace-pre bg-gradient-to-r from-[var(--accent)] to-blue-400 bg-clip-text text-transparent select-none">
            {LOGO_ASCII}
          </pre>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/sobre" className="hover:text-[var(--accent)]">
            Sobre este sitio
          </Link>
          <button
            onClick={toggle}
            className="hover:text-[var(--accent)]"
            aria-label="Cambiar tema"
          >
            ◐
          </button>
        </nav>
      </div>
    </header>
  )
}
