---
title: "Cómo instalar y configurar uBlock Origin"
description: "Guía paso a paso para instalar el bloqueador de anuncios más efectivo: protege contra publicidad invasiva, seguimiento y programas dañinos ocultos en anuncios."
section: guias
level: basico
risk: medio
reading_time: 4
created: 2026-07-26
updated: 2026-07-26
tags: [privacidad, navegador, extensiones, bloqueador-anuncios]
platforms: [windows, macos, linux, android]
related: [sitios-peligrosos, drive-by-download]
status: published
content_type: guide
---

# Cómo instalar y configurar uBlock Origin

uBlock Origin es un bloqueador de contenido gratuito y de código abierto. Bloquea tres cosas antes de que lleguen a tu navegador:

- **Anuncios** — incluyendo los que traen programas dañinos escondidos [1]
- **Seguimiento** — impide que las empresas registren qué sitios visitas
- **Sitios peligrosos conocidos** — bloquea el acceso a páginas que distribuyen virus o estafas

No es solo un bloqueador de publicidad. Es una herramienta de seguridad.

---

## Antes de instalar: qué navegador usas

Esto es importante. Desde 2024, Google eliminó la versión completa de uBlock Origin de Chrome [2]. Si usas Chrome, solo puedes instalar una versión limitada que bloquea menos cosas.

| Navegador | Qué puedes instalar | ¿Protección completa? |
|---|---|---|
| **Firefox** | uBlock Origin completo | Sí — sin restricciones |
| **Brave** | uBlock Origin completo | Sí (Brave ya trae su propio bloqueador) |
| **Chrome** | uBlock Origin Lite (versión reducida) | No — Google le puso límites a lo que puede bloquear |
| **Safari** | No disponible | — |

**Recomendación:** si te importa la seguridad y la privacidad, usa Firefox. Es el único navegador grande que se comprometió públicamente a no limitar los bloqueadores [3].

---

## Instalar en Firefox (recomendado)

### En computador

1. Abre Firefox
2. Ve a la página oficial: [addons.mozilla.org/firefox/addon/ublock-origin](https://addons.mozilla.org/es/firefox/addon/ublock-origin/)
3. Haz clic en **"Agregar a Firefox"**
4. Aparece un aviso pidiendo permisos — haz clic en **"Añadir"**
5. Listo. El ícono de uBlock Origin (un escudo rojo) aparece en tu barra de herramientas

### En Android

Firefox para Android soporta extensiones:

1. Abre Firefox en tu celular
2. Toca el menú (tres puntos) → **Complementos**
3. Busca "uBlock Origin" en la lista
4. Toca **"Instalar"**

**iOS:** Firefox en iPhone no soporta extensiones. En iOS puedes usar Safari con un bloqueador de contenido como AdGuard (búscalo en la App Store).

---

## Instalar en Chrome (versión reducida)

Si usas Chrome, puedes instalar la versión limitada:

1. Ve a Chrome Web Store: [uBlock Origin Lite](https://chromewebstore.google.com/detail/ublock-origin-lite/ddkjiahejlhfcafbddmgiahcphecmpfh)
2. Haz clic en **"Agregar a Chrome"**
3. Confirma los permisos

Esta versión bloquea menos que la completa porque Google le impuso restricciones técnicas. Es mejor que nada, pero no equivale a tener Firefox con la versión completa.

---

## Después de instalar

uBlock Origin funciona inmediatamente. No necesitas configurar nada. Ya viene con protección activada contra anuncios, seguimiento y sitios peligrosos.

### Verificar que funciona

1. Haz clic en el ícono de uBlock Origin (escudo rojo) en tu barra de herramientas
2. Verás un número — son las cosas que bloqueó en la página actual
3. Navega normalmente. Si los anuncios desaparecen, funciona

### Si un sitio no funciona bien

Algunos sitios detectan bloqueadores y te piden desactivarlo. Tienes dos opciones:

- **Desactivar solo para ese sitio:** haz clic en el ícono → clic en el botón azul de encendido → recarga la página. Solo afecta a ese sitio, el resto sigue protegido.
- **No desactivarlo:** si el sitio te obliga a desactivar tu bloqueador para ver contenido, pregúntate si realmente necesitas ese sitio.

---

## Protección extra (opcional)

Si quieres bloquear más cosas, puedes activar listas adicionales. Son catálogos de sitios y anuncios conocidos como peligrosos o molestos que uBlock usa como referencia para decidir qué bloquear:

1. Haz clic en el ícono de uBlock Origin → el engranaje (⚙️) para abrir opciones
2. Ve a la pestaña **"Filter lists"** (Listas de filtros)
3. Activa las que quieras. Recomendadas:
   - **Malware domains** (bajo "Malware protection") — bloquea sitios que distribuyen virus
   - **Annoyances** — quita banners de cookies, avisos de notificaciones y botones de redes sociales
   - **AdGuard Tracking Protection** — bloquea más formas de seguimiento

Las que vienen activadas por defecto son suficientes para la mayoría de las personas. Solo agrega más si sabes que las necesitas.

---

## Fuentes

[1] Confiant (2023). 1 in every 200 ad impressions analyzed contained a malicious or low-quality ad — malvertising remains a primary vector for drive-by downloads. https://www.confiant.com/malvertising-report

[2] ublockorigin.com (2026). uBlock Origin was removed from the Chrome Web Store in late 2024; Chrome permanently disabled all remaining MV2 extensions in July 2025. https://ublockorigin.com/

[3] Mozilla (2024). Manifest V3 Firefox update — Firefox will continue to support Manifest V2 extensions, including uBlock Origin. https://blog.mozilla.org/addons/2024/03/13/manifest-v3-update/

[4] CIS Controls v8, Control 9.2. Use DNS Filtering Services — bloquear dominios maliciosos conocidos a nivel de red o navegador. https://www.cisecurity.org/controls/v8

[5] OWASP. Malvertising — ataques que usan redes de publicidad para distribuir malware a través de sitios legítimos. https://owasp.org/www-community/attacks/Malvertising

---
