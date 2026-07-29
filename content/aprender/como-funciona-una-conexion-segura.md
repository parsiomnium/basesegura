---
title: "Cómo funciona una conexión segura (HTTPS)"
description: "Qué significa el candado en tu navegador, qué protege exactamente una conexión cifrada, y por qué HTTPS no significa que el sitio sea confiable."
section: aprender
level: intermedio
risk: medio
reading_time: 7
created: 2026-07-29
updated: 2026-07-29
tags: [https, cifrado, certificados, navegacion, fundamentos]
related: [como-verificar-una-pagina, sitios-peligrosos, vpn]
status: published
content_type: learn
---

# Cómo funciona una conexión segura (HTTPS)

El verificador de sitios te muestra "conexión cifrada" en verde. Tu navegador muestra un candado. Pero ¿qué significa eso realmente? ¿Qué protege? ¿Qué no protege? ¿Por qué un sitio de estafa puede tener candado?

---

## Qué problema resuelve HTTPS

Cuando visitas un sitio web, tu navegador y el servidor se envían información: la página que pediste, lo que escribes en formularios, tu contraseña si inicias sesión.

Sin HTTPS, esa información viaja en texto plano. Cualquier persona en la misma red (un Wi-Fi público, por ejemplo) o cualquier intermediario entre tú y el servidor puede leerla — como enviar una carta sin sobre.

HTTPS cifra toda esa comunicación. Aunque alguien la intercepte, solo ve datos ilegibles — como una carta dentro de un sobre sellado que solo el destinatario puede abrir.

---

## Cómo funciona (simplificado)

### 1. Tu navegador pide conectarse al sitio

Escribes `https://basesegura.org`. Tu navegador contacta al servidor y le dice: "quiero una conexión segura."

### 2. El servidor presenta su certificado

El certificado es como una identificación oficial del sitio. Dice: "soy basesegura.org y esta entidad de confianza lo confirma." Contiene una llave pública — un número largo que sirve para cifrar mensajes que solo el servidor puede descifrar.

### 3. Tu navegador verifica el certificado

Comprueba:
- ¿El certificado fue emitido por una autoridad de confianza? (Let's Encrypt, DigiCert, etc.)
- ¿No está vencido?
- ¿El nombre en el certificado coincide con el sitio que estás visitando?

Si algo falla, ves la advertencia "La conexión no es privada."

### 4. Se establece una clave compartida

Tu navegador y el servidor acuerdan una clave secreta temporal usando criptografía de clave pública. Nadie que esté observando la comunicación puede deducir esa clave.

### 5. Todo se cifra

A partir de ahí, todo lo que envías y recibes está cifrado con esa clave compartida. Contraseñas, formularios, páginas — todo viaja protegido.

---

## ¿Qué protege HTTPS?

- **Confidencialidad**: nadie puede leer lo que envías ni lo que recibes.
- **Integridad**: nadie puede modificar los datos en tránsito (inyectar publicidad, código malicioso, o alterar información).
- **Autenticación del servidor**: verificas que estás hablando con el servidor real y no con un impostor.

---

## ¿Qué NO protege HTTPS?

Esto es fundamental:

### HTTPS no significa que el sitio sea confiable

Un sitio de estafas puede tener HTTPS y candado. Obtener un certificado es gratuito y automático (Let's Encrypt lo hace en segundos). El certificado solo confirma que estás conectado al servidor que dice ser — no dice nada sobre quién lo opera ni qué hace con tus datos.

Un estafador crea `paypal-verificacion.com`, obtiene un certificado legítimo para ese dominio, y su sitio muestra candado. El candado solo significa que tu conexión con ese estafador está cifrada — no que sea PayPal.

### HTTPS no protege contra malware

Si descargas un archivo malicioso de un sitio con HTTPS, el archivo te llega perfectamente cifrado y completo. HTTPS protege el transporte, no el contenido.

### HTTPS no protege lo que pasa en el servidor

Si el sitio tiene una vulnerabilidad y alguien roba su base de datos, HTTPS no ayuda — eso pasa del lado del servidor, no en la conexión.

---

## ¿Qué significa la advertencia "La conexión no es privada"?

Significa que el certificado tiene un problema:
- Está vencido (el sitio no lo renovó).
- No coincide con el dominio (estás en un sitio diferente al que dice el certificado).
- Fue emitido por una entidad no reconocida.
- Alguien está intentando interceptar tu conexión presentando un certificado falso.

**Nunca ingreses contraseñas ni datos personales si ves esta advertencia.**

---

## HTTP vs. HTTPS: la diferencia práctica

| | HTTP | HTTPS |
|---|---|---|
| Cifrado | No — todo viaja en texto plano | Sí — todo viaja cifrado |
| Interceptable | Sí — cualquiera en la red puede leer | No — solo tú y el servidor |
| Modificable en tránsito | Sí — pueden inyectar contenido | No — se detecta cualquier alteración |
| Candado en navegador | No | Sí |
| ¿Significa que el sitio es seguro? | No | Tampoco |

---

## Qué hacer

1. **No ingreses contraseñas ni datos de pago en sitios sin HTTPS** — si la barra no muestra candado, cualquiera en tu red puede leer lo que escribes.
2. **No confíes en un sitio solo porque tiene candado** — el candado protege la conexión, no garantiza que el sitio sea legítimo. Verifica siempre el dominio.
3. **Si ves "La conexión no es privada", no continúes** — especialmente si ibas a ingresar datos.
4. **Usa una VPN en redes públicas** — agrega una capa extra de protección. Ver: [Qué es una VPN](/prevenir/vpn).

---

## Fuentes

[1] Cloudflare (2024). What is HTTPS? https://www.cloudflare.com/learning/ssl/what-is-https/

[2] Let's Encrypt (2024). About. https://letsencrypt.org/about/

[3] NIST SP 800-52 Rev. 2 (2024). Guidelines for TLS Implementations. https://csrc.nist.gov/pubs/sp/800/52/r2/final

[4] Google Transparency Report (2025). HTTPS encryption on the web. https://transparencyreport.google.com/https

---
