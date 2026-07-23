import Link from 'next/link'

const intentions = [
  { label: 'Proteger mis cuentas', href: '/cuentas/contrasenas-seguras' },
  { label: 'Qué es un gestor de contraseñas', href: '/cuentas/gestores-de-contrasenas' },
  { label: 'Activar verificación en dos pasos', href: '/cuentas/verificacion-en-dos-pasos' },
  { label: 'Detectar una estafa', href: '/estafas/phishing' },
  { label: 'Estafas por WhatsApp', href: '/estafas/estafas-por-whatsapp' },
  { label: 'Me robaron el celular', href: '/emergencias/me-robaron-el-telefono' },
  { label: 'Me hackearon una cuenta', href: '/emergencias/me-hackearon-una-cuenta' },
  { label: 'Fraude en mi banco', href: '/emergencias/fraude-bancario' },
  { label: '¿Necesito una VPN?', href: '/navegacion/vpn' },
  { label: 'Qué es la seguridad digital', href: '/empezar/que-es-la-seguridad-digital' },
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
    </div>
  )
}
