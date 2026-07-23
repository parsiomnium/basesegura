import Link from 'next/link'

const groups = [
  {
    id: 'protegerme',
    label: 'Quiero protegerme',
    items: [
      { label: 'Crear contraseñas seguras', href: '/protegerme/contrasenas-seguras' },
      { label: 'Usar un gestor de contraseñas', href: '/protegerme/gestores-de-contrasenas' },
      { label: 'Activar verificación en dos pasos', href: '/protegerme/verificacion-en-dos-pasos' },
      { label: '¿Necesito una VPN?', href: '/protegerme/vpn' },
    ],
  },
  {
    id: 'cuidarme',
    label: 'Me quiero cuidar de algo',
    items: [
      { label: 'Reconocer estafas por correo o SMS', href: '/cuidarme/phishing' },
      { label: 'Estafas por WhatsApp', href: '/cuidarme/estafas-por-whatsapp' },
    ],
  },
  {
    id: 'me-paso-algo',
    label: 'Me pasó algo',
    items: [
      { label: 'Me robaron el celular', href: '/me-paso-algo/me-robaron-el-telefono' },
      { label: 'Me hackearon una cuenta', href: '/me-paso-algo/me-hackearon-una-cuenta' },
      { label: 'Hicieron transacciones en mi banco', href: '/me-paso-algo/fraude-bancario' },
    ],
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
      {/* Title */}
      <section className="pt-8">
        <h1 className="text-2xl font-bold mb-2">Base Segura</h1>
        <p className="text-[var(--text-secondary)]">
          Seguridad digital para todas las personas.
        </p>
      </section>

      {/* Intention groups */}
      {groups.map(group => (
        <section key={group.id}>
          <h2 className="text-lg font-semibold mb-4">{group.label}</h2>
          <ul className="space-y-2">
            {group.items.map(item => (
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
      ))}

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
