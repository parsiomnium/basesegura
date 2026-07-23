export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-[var(--text-secondary)] flex items-center justify-between">
        <a
          href="https://github.com/parsiomnium/basesegura"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)]"
        >
          GitHub
        </a>
        <span>Código MIT · Contenido CC BY-SA 4.0</span>
      </div>
    </footer>
  )
}
