import Link from 'next/link'
import { getSections, getArticlesBySection } from '@/lib/content'

const intentions = [
  { label: 'Proteger mis cuentas', href: '/cuentas' },
  { label: 'Detectar una estafa', href: '/estafas' },
  { label: 'Me robaron el celular', href: '/emergencias/me-robaron-el-telefono' },
  { label: 'Recuperar una cuenta robada', href: '/emergencias/me-hackearon-una-cuenta' },
  { label: 'Aprender desde cero', href: '/empezar/que-es-la-seguridad-digital' },
]

const guides = [
  { label: 'WhatsApp', href: '/guias/whatsapp' },
  { label: 'Gmail', href: '/guias/gmail' },
  { label: 'Instagram', href: '/guias/instagram' },
  { label: 'Proton VPN', href: '/guias/proton-vpn' },
  { label: 'Bitwarden', href: '/guias/bitwarden' },
]

export default function Home() {
  const sections = getSections()

  return (
    <div className="space-y-16">
      {/* Title */}
      <section className="pt-8">
        <h1 className="text-2xl font-bold mb-2">Base Segura</h1>
        <p className="text-[var(--text-secondary)]">
          Seguridad digital para todas las personas.
        </p>
      </section>

      {/* Intentions */}
      <section>
        <h2 className="text-lg font-semibold mb-4">¿Qué necesitas?</h2>
        <ul className="space-y-2">
          {intentions.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-[var(--text-secondary)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Guides */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Guías por plataforma</h2>
        <div className="flex flex-wrap gap-2">
          {guides.map(item => (
            <span
              key={item.href}
              className="px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-sm text-[var(--text-secondary)]"
            >
              {item.label} (pronto)
            </span>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Secciones</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {sections.map(section => (
            <Link
              key={section}
              href={`/${section}`}
              className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] transition-colors text-sm capitalize"
            >
              {section}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
