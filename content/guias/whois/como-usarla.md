---
title: "Cómo usar WHOIS para verificar la antigüedad de un sitio web"
description: "Guía paso a paso para revisar desde cuándo existe un dominio y qué significa esa información."
section: guias
level: basico
risk: medio
reading_time: 4
created: 2026-07-23
updated: 2026-07-23
tags: [herramientas, verificacion, dominios]
related: [como-verificar-una-pagina]
status: published
---

# Cómo usar WHOIS para verificar la antigüedad de un sitio web

WHOIS es un registro público de dominios de internet. Funciona como un "registro civil" de sitios web — guarda cuándo se creó un dominio, quién lo registró y hasta cuándo está pagado.

Es la forma más directa de saber si un sitio que dice ser tu banco o una tienda grande realmente ha existido por años — o si fue creado la semana pasada.

---

## Cómo usarla

### Paso 1: Entra a who.is

Abre tu navegador y ve a [who.is](https://who.is).

[captura: página principal de who.is con el campo de búsqueda]

### Paso 2: Escribe solo el dominio

Escribe el nombre del sitio **sin** el `https://` y **sin** nada después de la primera barra.

Ejemplos:
- ✓ `bancosantander.cl`
- ✓ `mercadolibre.cl`
- ✗ `https://bancosantander.cl/login` (no pongas esto)

[captura: campo de búsqueda con un dominio escrito correctamente]

### Paso 3: Presiona Enter

El resultado aparece en unos segundos. Vas a ver mucha información — no necesitas entender todo. Solo busca los campos que explico abajo.

---

## Cómo leer los resultados

### Lo que importa

[captura: resultado WHOIS con los campos importantes señalados con flechas]

| Campo (en inglés) | Qué significa | Ejemplo |
|---|---|---|
| **Creation Date** o **Created** | Cuándo se registró el dominio por primera vez | `2008-05-19` → existe desde 2008 |
| **Expiration Date** o **Registry Expiry Date** | Hasta cuándo está pagado | `2027-06-18` → pagado por años adelantado |
| **Registrant Organization** | Quién lo registró (el dueño) | `Banco Santander Chile` |
| **Registrar** | La empresa que vendió el dominio | `NIC Chile` — esto es normal |

### Cómo interpretar lo que ves

**Antigüedad del dominio (Creation Date):**
- Creado hace **años** → buena señal, especialmente si coincide con una empresa real
- Creado hace **meses** → podría ser nuevo legítimo, pero ten cuidado si dice ser una empresa conocida
- Creado hace **días o semanas** → muy sospechoso si el sitio afirma ser un banco, tienda grande o institución

**Dueño del dominio (Registrant Organization):**
- Aparece el nombre de la empresa → buena señal (ejemplo: `Banco de Chile`, `MercadoLibre S.R.L.`)
- Dice **"REDACTED FOR PRIVACY"** o está vacío → el dueño está oculto. Esto **no significa** que sea falso — muchas empresas y personas legítimas usan servicios de privacidad. Pero combinado con un dominio nuevo, es más sospechoso
- Aparece un nombre de persona o empresa que no reconoces → investiga más

**Expiración (Expiration Date):**
- Pagado por varios años → señal de que alguien invirtió en mantenerlo. Los estafadores pagan un año o menos
- Vence pronto y fue creado hace poco → probablemente desechable

### Lo que puedes ignorar

No necesitas entender estos campos:
- **Name Servers** (son datos técnicos de infraestructura)
- **DNSSEC** (protocolo de seguridad de DNS)
- **Status codes** (códigos internos del registro)
- **Updated Date** (solo dice cuándo se modificó algún dato)

---

## Ejemplo real

### Sitio legítimo: `bancosantander.cl`

[captura: resultado WHOIS de bancosantander.cl]

- Creation Date: `1999-XX-XX` → existe desde 1999. Un banco real.
- Registrant: nombre del banco o entidad financiera
- Expiration Date: pagado por años

### Sitio sospechoso (inventado): `banco-santanderr.cl`

Si existiera, probablemente verías:
- Creation Date: hace 2 semanas
- Registrant: REDACTED FOR PRIVACY
- Expiration Date: dentro de 11 meses

La combinación de dominio nuevo + dueño oculto + nombre similar a una marca real = casi seguro falso.

---

## La regla simple

**Si un sitio dice ser una empresa grande (banco, tienda conocida, gobierno) pero el dominio fue creado hace días o semanas — es falso.** Los bancos y empresas reales tienen sus dominios registrados hace años.

---

## Para dominios .cl (Chile)

Los dominios `.cl` se registran a través de [NIC Chile](https://www.nic.cl). Si ves "Registrar: NIC Chile" en un dominio .cl, es lo esperado — significa que fue registrado por el camino normal. No dice nada sobre si es legítimo o no.

También puedes consultar dominios .cl directamente en [nic.cl/registry/Whois.do](https://www.nic.cl/registry/Whois.do).

---

## Limitaciones

- WHOIS no te dice si el contenido del sitio es peligroso — solo te da información de registro
- Muchos dominios legítimos ocultan la información del dueño por privacidad
- Un dominio viejo no es garantía de seguridad — un sitio legítimo puede ser hackeado
- Úsala para confirmar sospechas, no como único método

---
