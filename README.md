# Base Segura

Base de conocimiento pública y gratuita sobre seguridad digital en español.

Hecha para personas que no tienen conocimientos técnicos — padres, adultos mayores, estudiantes, trabajadores, cualquiera que use internet.

## Principios

- **Sin jerga tecnica.**
- **Sin miedo.**
- **Sin publicidad.**
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
├── prevenir/         # Contraseñas, gestores, MFA, VPN, privacidad
├── reconocer/        # Phishing, estafas, sitios peligrosos
├── reaccionar/       # Me robaron, me hackearon, fraude bancario
├── aprender/         # Seguridad digital, URLs, malware
├── guias/            # Guías por plataforma (Gmail, ChatGPT, etc.)
└── sobre.md
```

## Desarrollo

```bash
npm install
npm run dev
```

## Validación

```bash
npm run format:check    # Verificar formato (Prettier)
npm run lint:content    # Lint markdown
npm run validate        # Validar frontmatter (Zod)
npm run build           # Build completo
npm run check           # Todo junto (format + lint + validate + build)
npm run analyze         # Bundle analysis (abre reporte visual)
```

## Contribuir

1. Abre un issue con tu propuesta (título, sección, qué pregunta responde)
2. Fork → branch → PR contra `main`
3. CI valida automáticamente (lint + schema + build)
4. Review y merge

Ver más en [CONTRIBUTING.md](CONTRIBUTING.md).

## Licencias

- Código: MIT
- Contenido: CC BY-SA 4.0
