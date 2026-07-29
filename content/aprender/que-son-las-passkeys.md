---
title: "Qué son las passkeys y por qué reemplazan a las contraseñas"
description: "Cómo funcionan las passkeys, por qué son más seguras que cualquier contraseña, y por qué no necesitas memorizar nada ni confiar en un servidor."
section: aprender
level: avanzado
risk: bajo
reading_time: 9
created: 2026-07-29
updated: 2026-07-29
tags: [passkeys, fido2, webauthn, autenticacion, criptografia]
related: [verificacion-en-dos-pasos, como-funciona-la-autenticacion-en-dos-pasos, gestores-de-contrasenas]
status: published
content_type: learn
---

# Qué son las passkeys y por qué reemplazan a las contraseñas

Las contraseñas tienen problemas fundamentales: la gente las reutiliza, se filtran en brechas, se adivinan por fuerza bruta, se roban con phishing. Las passkeys eliminan todos esos problemas de raíz — no porque sean contraseñas más fuertes, sino porque no son contraseñas en absoluto.

---

## El problema de las contraseñas (resumido)

Incluso con buenas prácticas (gestor, 16+ caracteres, 2FA), las contraseñas tienen debilidades estructurales:

- **Viajan al servidor**: cuando inicias sesión, tu contraseña se envía al sitio web. Si el sitio tiene una vulnerabilidad, puede ser interceptada.
- **Existe un secreto compartido**: tanto tú como el servidor conocen tu contraseña (o su hash). Si el servidor es vulnerado, tu secreto queda expuesto.
- **Son vulnerables a phishing**: si entras a un sitio falso y escribes tu contraseña, el atacante la tiene.
- **Dependen del usuario**: la seguridad recae en que cada persona elija contraseñas fuertes y distintas. La evidencia muestra que la mayoría no lo hace [1].

Las passkeys eliminan estos cuatro problemas.

---

## Cómo funcionan las passkeys

Una passkey usa **criptografía de clave pública**. En vez de un secreto compartido (contraseña), hay un par de llaves matemáticas:

- **Clave privada**: se guarda solo en tu dispositivo. Nunca sale de ahí. Nunca se envía a nadie.
- **Clave pública**: se envía al sitio web cuando te registras. Es como un candado abierto — cualquiera puede tenerla, pero solo tu clave privada puede "abrirla".

### Al registrarte

1. Tu dispositivo genera un par de claves (pública + privada).
2. La clave pública se envía al sitio y se guarda en su base de datos.
3. La clave privada se guarda en tu dispositivo (protegida por tu huella, rostro o PIN).
4. No hay contraseña. No hay secreto compartido.

### Al iniciar sesión

1. El sitio envía un **desafío** a tu dispositivo — un número aleatorio que dice "demuéstrame que tienes la clave privada".
2. Tu dispositivo te pide verificación biométrica (huella/rostro) o PIN.
3. Si verificas, tu dispositivo firma el desafío con la clave privada.
4. El sitio verifica la firma usando la clave pública que tiene guardada.
5. Si la firma es válida, entras. Tu clave privada nunca salió de tu dispositivo.

---

## ¿Por qué son más seguras?

### No se pueden filtrar

El sitio no tiene tu secreto. Solo tiene tu clave pública — que es inútil para un atacante. Aunque hackeen la base de datos completa, no obtienen nada que les permita hacerse pasar por ti.

### No funcionan en sitios falsos

Cada passkey está vinculada criptográficamente al dominio exacto del sitio. Si un atacante crea un sitio falso (`paypal-login.com`), tu dispositivo no usará la passkey de PayPal — porque el dominio no coincide. El phishing deja de funcionar.

### No dependen de tu memoria

No hay nada que memorizar. La clave privada está en tu dispositivo, protegida por biometría o PIN del dispositivo. No puedes elegir una passkey débil porque no la eliges tú — la genera tu dispositivo con criptografía fuerte.

### No viajan por la red

Tu clave privada nunca se transmite. Lo que se envía es una firma digital — un dato que demuestra que tienes la clave sin revelarla. Es como demostrar que sabes un secreto sin decirlo en voz alta.

---

## ¿Dónde se guardan las passkeys?

Depende del ecosistema:

| Dispositivo | Dónde se guarda | Sincronización |
|---|---|---|
| iPhone/iPad | Llavero de iCloud | Entre dispositivos Apple |
| Android | Google Password Manager | Entre dispositivos Android/Chrome |
| Windows | Windows Hello | Local (no sincroniza entre dispositivos por defecto) |
| Gestor de contraseñas | Bitwarden, 1Password, etc. | Multiplataforma |

Los gestores de contraseñas modernos ya soportan passkeys — lo que resuelve el problema de estar atado a un ecosistema.

---

## ¿Cuál es la diferencia con 2FA?

| | Contraseña + 2FA | Passkey |
|---|---|---|
| Secreto compartido | Sí (la contraseña) | No |
| Vulnerable a phishing | Parcialmente (la contraseña sí) | No |
| Depende de la memoria del usuario | Sí | No |
| Factores de autenticación | 2 (algo que sabes + algo que tienes) | 2 en uno (algo que tienes + algo que eres/sabes) |
| Complejidad para el usuario | Alta (gestores, apps, códigos) | Baja (huella o rostro) |

Una passkey ya es autenticación multifactor por diseño: tu dispositivo es "algo que tienes" y la biometría o PIN es "algo que eres/sabes". No necesitas nada más.

---

## ¿Quién ya las soporta?

En 2026, passkeys están disponibles en:

- Google (Gmail, YouTube, etc.)
- Apple (iCloud, App Store, etc.)
- Microsoft (Outlook, Windows)
- GitHub
- Amazon
- WhatsApp
- PayPal
- Bitwarden, 1Password
- Y cientos más. La lista crece cada mes [2].

---

## Limitaciones actuales

- **Sincronización entre ecosistemas**: si tienes iPhone y PC Windows, compartir passkeys entre ellos requiere un gestor multiplataforma.
- **Recuperación**: si pierdes todos tus dispositivos sin respaldo, recuperar el acceso es más complejo que con una contraseña. Los sitios ofrecen métodos de recuperación, pero varían.
- **Adopción parcial**: no todos los sitios las soportan todavía.

---

## El estándar detrás

Las passkeys están basadas en **FIDO2** y **WebAuthn**, estándares abiertos desarrollados por la FIDO Alliance (Google, Apple, Microsoft, entre otros) y el W3C. No pertenecen a ninguna empresa — son infraestructura web abierta [3].

---

## Qué hacer hoy

1. **Activa passkeys donde puedas** — Google, Apple, Microsoft, GitHub. Generalmente está en Configuración → Seguridad → Passkeys o "Claves de acceso".
2. **Mantén tu gestor de contraseñas** — no todos los sitios soportan passkeys todavía. El gestor sigue siendo necesario para el resto.
3. **No desactives 2FA por tener passkeys** — en sitios donde conviven ambos, déjalos activos como respaldo mutuo.
4. **Guarda un método de recuperación** — un número de teléfono, correo alternativo, o códigos de respaldo.

---

## Fuentes

[1] Verizon (2025). Data Breach Investigations Report. https://www.verizon.com/business/resources/reports/dbir/

[2] Passkeys.directory (2026). Sitios que soportan passkeys. https://passkeys.directory/

[3] FIDO Alliance (2024). FIDO2 Specifications. https://fidoalliance.org/fido2/

[4] W3C (2024). Web Authentication: An API for accessing Public Key Credentials. https://www.w3.org/TR/webauthn-3/

---
