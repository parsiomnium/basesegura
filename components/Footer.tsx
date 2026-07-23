export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-[var(--text-secondary)] flex flex-col sm:flex-row justify-between gap-2">
        <span>Base Segura — Seguridad digital para todas las personas</span>
        <div className="flex gap-4">
          <a href="/sobre" className="hover:text-[var(--accent)]">Sobre</a>
          <a
            href="https://github.com/JazminTrujilloEyzaguirre/basesegura"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)]"
          >
            GitHub
          </a>
          <span>CC BY-SA 4.0</span>
        </div>
      </div>
    </footer>
  )
}
