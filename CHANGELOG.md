# Changelog

Todos los cambios notables de este proyecto se documentan aquí.

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [Unreleased]

### Added

- Prettier como formatter automático
- Husky + lint-staged (pre-commit hooks)
- Issue templates (bug, feature, artículo nuevo)
- PR template
- SECURITY.md
- Error boundary global (`app/error.tsx`)
- Bundle analyzer (`npm run analyze`)
- Validación de env vars con Zod (`lib/env.ts`)
- CHANGELOG.md
- `.node-version` (Node 20 LTS)

### Changed

- Next.js 14 → 15 (async params, React 19)
- ESLint 8 → 9 (flat config)
- markdownlint-cli2 0.14 → 0.23
- Dependencias pineadas (sin rangos abiertos)
- Páginas de sección unificadas en `[group]/page.tsx`
- Valores hardcodeados centralizados en `lib/config.ts`
- tailwind.config.ts limpiado (removido `pages/`)
- README actualizado con estructura real

### Removed

- `next.config.mjs` (duplicado vacío)
- `lib/logo.ts` (código muerto)
- `.eslintrc.json` (reemplazado por `eslint.config.mjs`)
- Páginas duplicadas (`app/prevenir/`, `app/reconocer/`, `app/reaccionar/`)

### Fixed

- 7 errores de markdownlint (blank lines, headings, trailing space)
- Referencia `[2]` escapada en sitios-peligrosos.md

## [0.1.0] - 2026-07-23

### Added

- Lanzamiento inicial
- 10 artículos (prevenir, reconocer, reaccionar, aprender)
- Guías por plataforma (VirusTotal, Scamadviser, Whois, ChatGPT, Gemini, Gmail)
- Verificador de sitios interactivo
- Deploy en Cloudflare Pages
- CI con GitHub Actions (markdownlint + Zod + build)
- Página /sobre
- Sitemap.xml
- SEO (meta tags, Open Graph)
