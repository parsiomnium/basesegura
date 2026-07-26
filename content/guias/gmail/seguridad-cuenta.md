---
title: "Cómo asegurar tu cuenta de Google"
description: "Verificación en dos pasos, correo y teléfono de recuperación, y sesiones activas — todo lo que necesitas para proteger tu Gmail."
section: guias
level: basico
risk: alto
reading_time: 5
created: 2026-07-23
updated: 2026-07-26
tags: [gmail, google, mfa, verificacion-en-dos-pasos, recuperacion]
related: [verificacion-en-dos-pasos, me-hackearon-una-cuenta]
status: published
content_type: guide
---

# Cómo asegurar tu cuenta de Google

Tu cuenta de Google (Gmail, YouTube, Drive, todo) es probablemente la más importante que tienes. Si alguien accede a tu correo, puede resetear contraseñas de todas tus otras cuentas.

Hay tres cosas que hacer. Las tres están en el mismo lugar: [myaccount.google.com/security](https://myaccount.google.com/security).

![Pantalla de seguridad y acceso de la cuenta Google](/img/guias/gmail/google-cuenta-seguridad-y-acceso.png)

---

## 1. Activar la verificación en dos pasos

Hace que tu contraseña sola no sea suficiente para entrar. Google pedirá una segunda prueba cada vez que alguien intente entrar desde un dispositivo nuevo.

En Seguridad, busca **"Cómo inicias sesión en Google"** → verificación en dos pasos.

![Tipos de MFA disponibles en Google](/img/guias/gmail/tipos-de-mfa-para-activar.png)

| Método | Qué es | Recomendación |
|---|---|---|
| **Llaves de acceso y seguridad** | Llaves físicas USB o biometría del dispositivo | El más seguro |
| **Mensajes de Google** | Notificación al celular para aprobar | Cómodo si tienes Android |
| **Authenticator** | App que genera códigos de 6 dígitos cada 30 segundos | El más recomendado — funciona sin internet |
| **Número de teléfono** | SMS con un código | Funciona pero es el menos seguro |
| **Códigos de respaldo** | 10 códigos de un solo uso para emergencias | Guárdalos en papel |

**Recomendado: Authenticator.** Google te muestra un código QR → lo escaneas con tu app de autenticación → ingresas el código de 6 dígitos. Listo.

Genera y guarda los **códigos de respaldo** en papel — si pierdes tu celular, es lo único que te deja entrar.

---

## 2. Configurar correo y teléfono de recuperación

Es lo que Google usa para devolverte el acceso si te roban la cuenta o te bloquean. Sin esto, recuperarla puede ser imposible — Google no tiene soporte telefónico ni humano para estos casos.

En la misma sección **"Cómo inicias sesión en Google"**, busca:

- **Teléfono de recuperación** — pon tu número de celular. Google te envía un código por SMS si necesitas recuperar la cuenta.
- **Correo de recuperación** — pon un correo diferente al que estás protegiendo (Outlook, Yahoo, el del trabajo — cualquiera al que tengas acceso seguro).

---

## 3. Revisar sesiones activas

Google te muestra desde qué dispositivos está abierta tu cuenta. Ve a **"Tus dispositivos"** o directo: [myaccount.google.com/device-activity](https://myaccount.google.com/device-activity)

Si ves un dispositivo o ubicación que no reconoces: haz clic → **"Cerrar sesión"** → cambia tu contraseña inmediatamente.

---

## Fuentes

[1] Google. Verificación en 2 pasos. https://support.google.com/accounts/answer/185839

[2] Google. Configurar opciones de recuperación. https://support.google.com/accounts/answer/183723

[3] NIST SP 800-63B (2024). Digital Identity Guidelines: Authentication and Lifecycle Management — autenticación multifactor para proteger cuentas con información sensible. https://pages.nist.gov/800-63-4/sp800-63b.html

[4] CIS Controls v8, Control 6.3. Require MFA for Externally-Exposed Applications — exigir autenticación multifactor en servicios accesibles desde internet. https://www.cisecurity.org/controls/v8

---
