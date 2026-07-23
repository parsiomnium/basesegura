'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'

export function Header() {
  const { toggle } = useTheme()

  return (
    <header className="w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80" aria-label="Base Segura — Inicio">
          <Image
            src="/logo.png"
            alt="Base Segura"
            width={32}
            height={32}
            className="w-8 h-8"
          />
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
