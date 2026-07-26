# Contribuir a Base Segura

Gracias por tu interés en mejorar Base Segura. Este proyecto es abierto y cualquier persona puede proponer cambios — ya sea corrigiendo un error, mejorando un artículo existente o proponiendo contenido nuevo.

## Antes de empezar

1. **Abre un issue** con tu propuesta antes de escribir. Incluye:
   - Título del artículo o cambio
   - Sección donde iría (prevenir, reconocer, reaccionar, aprender, guías)
   - Intención de búsqueda que responde (ej: "cómo recuperar mi cuenta de Instagram")
2. Espera confirmación del maintainer antes de invertir tiempo escribiendo.

Esto evita trabajo duplicado y asegura que el contenido encaje con la dirección del proyecto.

## Proceso

1. Haz fork del repositorio
2. Crea una rama desde `main` (ej: `articulo/passkeys`, `fix/typo-phishing`)
3. Haz tus cambios
4. Abre un Pull Request contra `main`

El CI ejecutará automáticamente:
- **markdownlint** sobre `content/`
- **Validación de frontmatter** con Zod (schema estricto)
- **Build completo** del sitio

Si cualquiera de los tres falla, el PR no se puede mergear.

Después de pasar CI, un maintainer revisará: precisión técnica, tono, claridad y estructura. El merge se hace con squash.

## Reglas de contenido

### Un artículo por PR

No mezcles varios artículos en el mismo Pull Request. Si quieres proponer tres artículos, abre tres PRs.

### Frontmatter obligatorio

Todo archivo en `content/` debe incluir al menos estos campos:

```yaml
---
title: "Título del artículo"
description: "Resumen en una o dos líneas."
section: prevenir | reconocer | reaccionar | aprender | guias
created: 2026-07-22
updated: 2026-07-22
---
```

Campos opcionales:

| Campo | Valores posibles |
|-------|-----------------|
| `level` | `basico`, `intermedio`, `avanzado` |
| `risk` | `bajo`, `medio`, `alto`, `critico` |
| `reading_time` | número en minutos |
| `tags` | lista de etiquetas relevantes |
| `platforms` | `android`, `ios`, `windows`, `macos`, `linux` |
| `related` | slugs de artículos relacionados |
| `status` | `published`, `draft`, `needs-review` |
| `country` | `all`, `cl`, `ar`, `mx`, `es` |
| `content_type` | `guide`, `action`, `prevent`, `learn` |

### Estructura de un artículo

1. Título
2. Resumen (dos líneas)
3. Metadatos visibles: tiempo de lectura, nivel, riesgo
4. Qué aprenderás (lista)
5. Por qué importa
6. Explicación
7. Qué hacer (pasos numerados)
8. Qué NO hacer
9. Lista de verificación
10. Lecturas relacionadas
11. Fuentes
12. Fecha de actualización

No todos los campos aplican a todos los artículos (las guías por plataforma son más cortas), pero es la estructura de referencia.

### Estilo de escritura

- **Español neutro.** Sin voseo (no: "podés", "hacé"). Usar tuteo neutro (puedes, haz, ingresa).
- **Sin jerga técnica.** Test: ¿mi mamá lo entiende? Si necesitas un término técnico, explícalo en la misma oración.
- **Sin sensacionalismo.** La seguridad es reducir riesgos, no vivir asustado.
- **Sin publicidad.** Las recomendaciones son por mérito, no por pago.
- **Basado en estándares.** Toda recomendación debe poder respaldarse con fuentes verificables (NIST, OWASP, CIS u organismos equivalentes). Cita la fuente.
- **Accionable.** Cada artículo termina con acciones concretas. El lector debe saber qué hacer al terminar de leer.

### Fuentes

- Toda afirmación técnica necesita una fuente.
- Preferir fuentes oficiales: documentación del servicio, estándares publicados, reportes de organismos reconocidos.
- Las fuentes van al final del artículo en una sección `## Fuentes` con links funcionales.

## Reportar errores

Si encuentras un error (dato desactualizado, link roto, instrucción incorrecta), abre un issue describiendo:
- Qué artículo tiene el problema
- Qué dice actualmente
- Qué debería decir (si lo sabes)

## Código

Si quieres contribuir al código del sitio (componentes, scripts, CI), las mismas reglas aplican: issue primero, luego PR. El stack es Next.js 14, Tailwind, TypeScript.

## Licencias

- Código: MIT
- Contenido: CC BY-SA 4.0

Al contribuir, aceptas que tu aporte se publique bajo estas licencias.
