# Base Segura

Base de conocimiento pública y gratuita sobre seguridad digital en español.

Hecha para personas que no tienen conocimientos técnicos — padres, adultos mayores, estudiantes, trabajadores, cualquiera que use internet.

## Principios

- **Sin jerga.** Si no se entiende, se reescribe.
- **Sin miedo.** No vendemos paranoia.
- **Sin publicidad.** Solo recomendamos por mérito.
- **Accionable.** Cada artículo termina con pasos concretos.
- **Basado en estándares.** NIST, OWASP, CIS como fundamento técnico.

## Stack

- Next.js 14 (App Router, SSG)
- Tailwind CSS
- Markdown (contenido en `content/`)
- Zod (validación de frontmatter)
- Cloudflare Pages

## Estructura

```
content/
├── protegerme/       # Contraseñas, gestores, MFA, VPN
├── cuidarme/         # Phishing, estafas por WhatsApp
├── me-paso-algo/     # Me robaron, me hackearon, fraude bancario
├── aprender/         # Qué es la seguridad digital
└── sobre.md
```

## Desarrollo

```bash
npm install
npm run dev
```

## Validación

```bash
npm run lint:content    # Lint markdown
npm run validate        # Validar frontmatter (Zod)
npm run build           # Build completo
```

## Contribuir

1. Abre un issue con tu propuesta (título, sección, qué pregunta responde)
2. Fork → branch → PR contra `main`
3. CI valida automáticamente (lint + schema + build)
4. Review y merge

Ver más en [CONTRIBUTING.md](CONTRIBUTING.md) (pronto).

## Licencias

- Código: MIT
- Contenido: CC BY-SA 4.0
