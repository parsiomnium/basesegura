---
title: "Cómo usar VirusTotal para verificar un sitio web"
description: "Guía paso a paso para usar VirusTotal y entender sus resultados, aunque esté en inglés."
section: guias
level: basico
risk: medio
reading_time: 4
created: 2026-07-23
updated: 2026-07-23
tags: [herramientas, verificacion, urls]
related: [como-verificar-una-pagina]
status: published
content_type: guide
---

# Cómo usar VirusTotal para verificar un sitio web

VirusTotal es una herramienta gratuita de Google que analiza cualquier dirección web contra más de 70 motores de seguridad al mismo tiempo. Es como preguntarle a 70 expertos si un sitio es peligroso — en segundos.

Está en inglés, pero lo que necesitas leer es mínimo. Aquí te explico paso a paso.

---

## Cómo usarla

### Paso 1: Entra a VirusTotal

Abre tu navegador y ve a [virustotal.com](https://www.virustotal.com/).

![Página principal de VirusTotal con las pestañas FILE, URL y SEARCH](/img/guias/virustotal/home.png)

### Paso 2: Selecciona la pestaña "URL"

Arriba vas a ver tres pestañas: FILE, URL, SEARCH. Haz clic en **URL**.

### Paso 3: Pega la dirección que quieres verificar

Copia la dirección completa del sitio sospechoso (desde la barra de tu navegador) y pégala en el campo de texto. Presiona Enter o el botón de búsqueda.

### Paso 4: Espera unos segundos

VirusTotal va a analizar la URL contra todos sus motores. Tarda entre 5 y 30 segundos.

---

## Cómo leer los resultados

### El número principal

Lo más importante es el número grande que aparece arriba:

![Resultado de VirusTotal mostrando 0/92 — ningún motor detectó amenazas](/img/guias/virustotal/resultado-1.png)

Eso se lee así: **"0 de 92 motores de seguridad marcaron esta URL como maliciosa"**.

- El primer número → cuántos motores lo marcaron como peligroso
- El segundo número → cuántos motores lo analizaron en total

### Qué significa cada resultado

| Lo que ves | Qué significa | Qué hacer |
|---|---|---|
| **0 detecciones** (todo verde) | Ningún motor encontró problemas | Buena señal. No es garantía absoluta, pero es positivo |
| **1 a 3 detecciones** | Unos pocos motores lo marcaron | Podría ser un falso positivo, pero investiga más. No ingreses datos sensibles todavía |
| **4 o más detecciones** | Varios motores lo consideran peligroso | No ingreses datos. Es muy probable que sea un sitio malicioso |

### Los colores de la lista

Debajo del número principal verás una lista de todos los motores y su veredicto:

![Lista de motores de seguridad — todos en verde diciendo "Clean"](/img/guias/virustotal/resultado-2.png)

- **Verde** ("Clean" o "Harmless") → ese motor dice que está bien
- **Gris** ("Undetected") → ese motor no tiene opinión (ni bueno ni malo)
- **Rojo** ("Malicious" o "Phishing") → ese motor lo marcó como peligroso

### La pestaña "Details"

Si haces clic en "Details", verás información extra:

![Pestaña Details mostrando URL final, dominio, IP y fecha de primer análisis](/img/guias/virustotal/resultado-3.png)

- **Final URL** → a veces un sitio te redirige a otro. Aquí ves a dónde te lleva realmente
- **Domain** → el dominio que se analizó
- **Serving IP** → la dirección del servidor (y en qué país está)
- **First Submission** → desde cuándo se conoce este sitio en VirusTotal
- **Category** → en qué categoría lo clasifican (servicios financieros, entretenimiento, etc.)

No necesitas entender todo — con el número principal, los colores y la URL final tienes suficiente.

---

## Ejemplo real

Si verificas `scotiabankchile.cl`:
- Resultado esperado: **0 / 92** — todo verde. Es el sitio real de un banco.

Si verificas un sitio sospechoso que te llegó por SMS:
- Resultado posible: **8 / 92** — varios motores en rojo diciendo "Phishing". No entres.

---

## Limitaciones

- VirusTotal no puede detectar sitios falsos que son muy nuevos (menos de unas horas)
- Un resultado de 0 detecciones no significa 100% seguro — significa que ningún motor lo ha marcado todavía
- No revisa si el contenido del sitio es engañoso — solo si está en listas de amenazas conocidas

Úsala como una capa más de verificación, no como la única.

---
