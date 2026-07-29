---
title: "Cómo funciona la autenticación en dos pasos"
description: "Qué pasa cuando pones un código de verificación, por qué dura 30 segundos, y por qué una app es más segura que un SMS."
section: aprender
level: intermedio
risk: medio
reading_time: 7
created: 2026-07-29
updated: 2026-07-29
tags: [2fa, totp, autenticacion, fundamentos]
related: [verificacion-en-dos-pasos, como-funcionan-las-contrasenas]
status: published
content_type: learn
---

# Cómo funciona la autenticación en dos pasos

Sabes que debes activarla. Pero ¿por qué un código de 6 dígitos que cambia cada 30 segundos protege tu cuenta? ¿Qué pasa si pierdes el teléfono? ¿Por qué dicen que los SMS son menos seguros? Aquí se explica el mecanismo completo.

---

## La idea base: algo que sabes + algo que tienes

Tu contraseña es "algo que sabes". Si alguien la roba, puede entrar a tu cuenta desde cualquier lugar del mundo.

La autenticación en dos pasos (2FA) agrega un segundo requisito: "algo que tienes" — tu teléfono, una llave física, o una app. Incluso si alguien tiene tu contraseña, sin ese segundo elemento no puede entrar.

---

## Cómo funcionan los códigos de 6 dígitos (TOTP)

Cuando activas 2FA con una app como Google Authenticator o Authy, esto es lo que pasa:

### Al activarlo (una sola vez)

1. El sitio web genera una **clave secreta** aleatoria (una cadena de caracteres larga).
2. Te la muestra como código QR.
3. Tu app de autenticación escanea el QR y guarda esa clave secreta en tu teléfono.
4. Ahora tanto el sitio como tu teléfono conocen la misma clave. Nadie más la tiene.

### Cada vez que inicias sesión

1. Tu app toma la clave secreta + la hora actual (redondeada a bloques de 30 segundos).
2. Aplica una función matemática (HMAC-SHA1) que produce un número.
3. De ese número extrae 6 dígitos — eso es el código que ves.
4. El sitio hace exactamente el mismo cálculo con la misma clave y la misma hora.
5. Si ambos códigos coinciden, entras.

### ¿Por qué cambia cada 30 segundos?

Porque el cálculo usa la hora como ingrediente. Cada 30 segundos la hora cambia, el cálculo da un resultado distinto, y el código anterior deja de servir. Si alguien ve tu código, tiene menos de 30 segundos para usarlo — y aun así necesitaría tu contraseña.

### ¿Por qué funciona sin internet?

Tu app no se comunica con nadie para generar el código. Solo necesita la clave secreta (que ya tiene guardada) y la hora (que tu teléfono siempre sabe). Por eso funciona en modo avión.

---

## SMS vs. App: por qué importa la diferencia

### SMS (menos seguro)

El sitio te envía un código por mensaje de texto. Problemas:

- **SIM swap**: un atacante puede convencer a tu compañía telefónica de transferir tu número a otra SIM. A partir de ahí, recibe tus SMS. Es un ataque documentado y relativamente común [1].
- **Interceptación**: en redes móviles con vulnerabilidades (protocolo SS7), los SMS pueden ser leídos en tránsito.
- **Depende de cobertura**: sin señal, no hay código.

### App de autenticación (más seguro)

El código se genera localmente en tu teléfono. Nadie puede interceptarlo porque nunca viaja por ninguna red. El único ataque posible es robar físicamente tu teléfono desbloqueado.

### Llave física (lo más seguro)

Una YubiKey u otra llave de hardware no es vulnerable a phishing. Aunque entres a un sitio falso y pongas tu contraseña, la llave no responde porque verifica criptográficamente que el sitio sea el real. Es el estándar más alto disponible hoy [2].

---

## ¿Qué pasa si pierdo el teléfono?

Si tu app de autenticación está solo en ese teléfono y no tienes respaldo, pierdes acceso. Por eso:

- **Guarda los códigos de respaldo** que te dan al activar 2FA (son códigos de un solo uso que funcionan sin la app).
- **Usa una app que permita respaldo cifrado** (como Authy o 2FAS) — así puedes restaurar en otro dispositivo.
- **No uses solo SMS** como segundo factor si puedes evitarlo.

---

## El nombre técnico

El sistema de códigos de 6 dígitos se llama **TOTP** (Time-based One-Time Password). Está definido en el RFC 6238, un estándar abierto publicado en 2011. Cualquier app que lo implemente es compatible con cualquier sitio que lo soporte — no estás atado a un proveedor.

---

## Qué hacer

1. Activa 2FA en tu correo principal, banco y redes sociales — guía paso a paso en [Verificación en dos pasos](/prevenir/verificacion-en-dos-pasos).
2. Usa una app (Google Authenticator, Authy, 2FAS) en vez de SMS siempre que puedas.
3. Guarda los códigos de respaldo en un lugar seguro (gestor de contraseñas o papel en lugar físico).
4. Si te importa mucho una cuenta, considera una llave física (YubiKey).

---

## Fuentes

[1] FBI IC3 (2024). Public Service Announcement on SIM Swapping. https://www.ic3.gov/PSA/2022/PSA220208

[2] FIDO Alliance (2024). FIDO2 Specifications. https://fidoalliance.org/fido2/

[3] RFC 6238 (2011). TOTP: Time-Based One-Time Password Algorithm. https://datatracker.ietf.org/doc/html/rfc6238

[4] NIST SP 800-63B (2025). Digital Identity Guidelines — Authentication. https://pages.nist.gov/800-63-4/sp800-63b.html

---
