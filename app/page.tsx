import Link from 'next/link'

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
  { label: 'ChatGPT', href: '/guias/chatgpt/privacidad', ready: true },
  { label: 'WhatsApp', href: '/guias/whatsapp', ready: false },
  { label: 'Gmail', href: '/guias/gmail', ready: false },
  { label: 'Instagram', href: '/guias/instagram', ready: false },
  { label: 'Bitwarden', href: '/guias/bitwarden', ready: false },
  { label: 'Proton VPN', href: '/guias/proton-vpn', ready: false },
]

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="pt-8">
        <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
          Seguridad digital para todas las personas.
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
            item.ready ? (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-sm hover:text-[var(--accent)] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.href}
                className="px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-sm text-[var(--text-secondary)]"
              >
                {item.label} (pronto)
              </span>
            )
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
          <Link href="/aprender/intermedio" className="px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-sm hover:text-[var(--accent)] transition-colors">
            Intermedio
          </Link>
          <Link href="/aprender/avanzado" className="px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-sm hover:text-[var(--accent)] transition-colors">
            Avanzado
          </Link>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Practica</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/herramientas/verificar-sitio" className="px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-sm hover:text-[var(--accent)] transition-colors">
              Verificador de sitios
            </Link>
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
