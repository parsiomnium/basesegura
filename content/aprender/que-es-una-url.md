---
title: "Qué es una URL y cómo leerla"
description: "La dirección que aparece arriba en tu navegador tiene partes. Saber leerla es la forma más rápida de detectar un sitio falso."
section: aprender
level: basico
risk: bajo
reading_time: 3
created: 2026-07-23
updated: 2026-07-23
tags: [url, navegacion, dominios]
related: [como-verificar-una-pagina, phishing]
status: published
content_type: learn
---

# Qué es una URL y cómo leerla

Una URL es la dirección de un sitio web — lo que aparece en la barra de arriba de tu navegador cuando visitas una página. Es como la dirección de una casa: si la lees bien, sabes exactamente dónde estás.

---

## Las partes de una URL

Tomemos este ejemplo:

`https://www.bancoestado.cl/personas/cuentas`

Cada parte significa algo:

| Parte | Ejemplo | Qué es |
|-------|---------|--------|
| Protocolo | `https://` | Cómo se conecta tu navegador al sitio. Si dice `https` la conexión va cifrada. Si dice `http` (sin la s) no lo está. |
| Subdominio | `www` | Un prefijo opcional. `www` es el más común. Algunos sitios usan otros como `mail.google.com` o `sitiospublicos.bancochile.cl`. |
| Dominio | `bancoestado.cl` | El nombre real del sitio. Es lo más importante de toda la URL. |
| Ruta (path) | `/personas/cuentas` | La página específica dentro del sitio. Como el número de departamento dentro de un edificio. |

---

## Lo que realmente importa: el dominio

El dominio es la parte que identifica quién es el dueño del sitio. Todo lo demás puede variar — pero el dominio te dice dónde estás parado.

**Cómo encontrarlo:** está justo después de `://` y antes de la primera `/`.

- `https://bancochile.cl/personas` → dominio: **bancochile.cl**
- `https://mail.google.com/inbox` → dominio: **google.com**
- `https://bancochile.cl.sitio-falso.com/login` → dominio: **sitio-falso.com** (no bancochile)

Ese último ejemplo es clave. Todo lo que está **antes** del dominio real puede decir cualquier cosa — es solo un subdominio que el dueño del sitio controla. El dominio verdadero es lo que está justo antes de la primera `/`.

---

## Por qué importa

Saber leer una URL te permite:
- Detectar sitios falsos antes de ingresar datos
- Entender a dónde te lleva un link antes de hacer clic
- Distinguir entre un sitio real y una imitación

Es la habilidad más simple y más útil en seguridad digital. No necesitas ninguna herramienta — solo mirar la barra de direcciones.

---

## Ver también

- [Cómo saber si una página es la oficial](/reconocer/como-verificar-una-pagina)
- [Cómo detectar phishing](/reconocer/phishing)

---
