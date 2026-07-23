'use client'

import Link from 'next/link'
import { useTheme } from './ThemeProvider'

export function Header() {
  const { toggle } = useTheme()

  return (
    <header className="w-full border-b border-[var(--border)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold hover:opacity-80">
          Base Segura
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/sobre" className="hover:text-[var(--accent)]">
            Sobre
          </Link>
          <a
            href="https://github.com/JazminTrujilloEyzaguirre/basesegura"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)]"
          >
            GitHub
          </a>
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
