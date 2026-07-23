import Link from 'next/link'
import { LOGO_ASCII } from '@/lib/logo'

const groups = [
  {
    id: 'prevenir',
    label: 'Prevenir',
    description: 'Protege tus cuentas y dispositivos antes de que pase algo',
  },
  {
    id: 'reconocer',
    label: 'Reconocer',
    description: 'Aprende a identificar estafas y mensajes falsos',
  },
  {
    id: 'reaccionar',
    label: 'Reaccionar',
    description: 'Te robaron, te hackearon o ves algo raro — actúa rápido',
  },
]

const guides = [
  { label: 'WhatsApp', href: '/guias/whatsapp' },
  { label: 'Gmail', href: '/guias/gmail' },
  { label: 'Instagram', href: '/guias/instagram' },
  { label: 'Proton VPN', href: '/guias/proton-vpn' },
  { label: 'Bitwarden', href: '/guias/bitwarden' },
]

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero: ASCII art + tagline */}
      <section className="pt-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <pre
          aria-hidden="true"
          className="font-mono text-[8px] sm:text-[10px] md:text-[13px] leading-tight whitespace-pre bg-gradient-to-r from-[var(--accent)] to-blue-400 bg-clip-text text-transparent select-none"
        >
          {LOGO_ASCII}
        </pre>
        <h1 className="text-xl md:text-2xl font-light leading-relaxed">
          <span>Seguridad digital</span>
          <br />
          <span className="ml-4">para todas</span>
          <br />
          <span className="ml-8">las personas.</span>
        </h1>
      </section>

      {/* Intention groups */}
      <section className="space-y-3">
        {groups.map(group => (
          <Link
            key={group.id}
            href={`/${group.id}`}
            className="flex items-center justify-between p-4 rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
          >
            <div>
              <h2 className="font-semibold text-[var(--accent)]">{group.label}</h2>
              <p className="text-sm text-[var(--text-secondary)]">{group.description}</p>
            </div>
            <span className="text-[var(--text-secondary)]">→</span>
          </Link>
        ))}
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

      {/* Learn */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Aprender</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <Link href="/aprender/basico" className="px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-sm hover:text-[var(--accent)] transition-colors">
            Básico
          </Link>
          <span className="px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-sm text-[var(--text-secondary)]">
            Intermedio (pronto)
          </span>
          <span className="px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-sm text-[var(--text-secondary)]">
            Avanzado (pronto)
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Practica</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-sm text-[var(--text-secondary)]">
              Simulador de phishing (pronto)
            </span>
            <span className="px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-sm text-[var(--text-secondary)]">
              Simulador de URLs (pronto)
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
