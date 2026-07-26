---
title: "Configurar la seguridad y privacidad de WhatsApp"
description: "Qué significan las opciones de seguridad y privacidad de WhatsApp, cuáles activar y por qué."
section: guias
level: basico
risk: medio
reading_time: 7
created: 2026-07-26
updated: 2026-07-26
tags: [whatsapp, privacidad, mfa, android, ios]
platforms: [android, ios]
related: [verificacion-en-dos-pasos, phishing, estafas-por-whatsapp]
status: published
content_type: guide
---

# Configurar la seguridad y privacidad de WhatsApp

WhatsApp tiene opciones de seguridad y privacidad que la mayoría de la gente nunca toca — o que activó sin saber qué hacían. Esta guía explica cada una: qué hace, por qué importa y qué recomiendo.

Todo se configura desde **Ajustes** (el ícono de engranaje o los tres puntos arriba a la derecha → Ajustes). WhatsApp también tiene un asistente de "Revisión de privacidad" que te guía por las opciones principales — pero no las explica. Aquí sí.

<img src="/img/guias/whatsapp/revision-privacidad.png" alt="Revisión de privacidad de WhatsApp" style="max-width: 280px;" />

---

## Cuenta → Verificación en dos pasos

**Dónde:** Ajustes → Cuenta → Verificación en dos pasos

<img src="/img/guias/whatsapp/cuenta.png" alt="Sección Cuenta" style="max-width: 280px;" />

**Qué es:** Un PIN de 6 dígitos que WhatsApp te pide periódicamente y cada vez que alguien intenta registrar tu número en otro teléfono. Es independiente del código SMS que te llega al instalar WhatsApp.

**Por qué importa:** Si alguien roba tu código SMS (por ejemplo con una estafa por llamada), igual necesita tu PIN para tomar control de tu cuenta. Sin esto, perder el control de tu WhatsApp es más fácil de lo que crees.

**Qué hacer:** Activar. Elige un PIN que no sea tu fecha de nacimiento ni 123456. Agrega un correo de recuperación por si lo olvidas.

<img src="/img/guias/whatsapp/verificacion-dos-pasos.png" alt="Verificación en dos pasos" style="max-width: 280px;" />

---

## Privacidad → Quién ve tu perfil

**Dónde:** Ajustes → Privacidad

Estas opciones controlan qué información tuya es visible para desconocidos. La recomendación es la misma para todas: ponlas en "Mis contactos" o "Nadie". No hay razón para que alguien que no conoces vea tu foto, tu hora de conexión, o tus estados.

<img src="/img/guias/whatsapp/privacidad.png" alt="Opciones de privacidad" style="max-width: 280px;" />

| Opción | Recomendación | Por qué |
|--------|---------------|---------|
| Hora de última vez y En línea | Nadie o Mis contactos | Se usa para verificar que un número está activo antes de una estafa |
| Foto del perfil | Mis contactos | Un estafador puede copiarla para hacerse pasar por ti |
| Info | Mis contactos | Sin riesgo grave, pero sin razón para exponerla |
| Enlaces | Mis contactos | — |
| Estados | Mis contactos | — |
| Ubicación en tiempo real | Verificar que diga "Ninguno" | Si la compartiste con alguien y ya no necesitas, desactívala |

---

## Privacidad → Grupos

**Dónde:** Ajustes → Privacidad → Grupos

**Qué es:** Quién puede agregarte a grupos sin tu permiso.

**Recomendación:** "Mis contactos". Si lo dejas en "Todos", te pueden meter a grupos de spam, estafas o contenido no deseado sin que puedas impedirlo. Con "Mis contactos", los demás te envían una invitación que puedes aceptar o rechazar.

---

## Privacidad → Silenciar llamadas de desconocidos

**Dónde:** Ajustes → Privacidad → Llamadas

**Qué hace:** Las llamadas de números que no tienes guardados no suenan — siguen apareciendo en tu lista, pero no te interrumpen.

**Recomendación:** Activar. Las llamadas de spam y estafa por WhatsApp son cada vez más comunes. Si alguien real te necesita y no lo tienes guardado, te dejará un mensaje.

---

## Privacidad → Avanzada

**Dónde:** Ajustes → Privacidad → Avanzada (hasta abajo)

Esta sección tiene opciones más técnicas que la mayoría de la gente no ve. Vale la pena revisarla.

<img src="/img/guias/whatsapp/avanzada.png" alt="Configuración avanzada de privacidad" style="max-width: 280px;" />

### Bloquear mensajes de cuentas desconocidas

**Qué hace:** Si recibes muchos mensajes de números que no conoces (spam masivo), WhatsApp los bloquea automáticamente.

**Recomendación:** Activar. No afecta mensajes normales de gente real que no tengas guardada — solo actúa cuando detecta volumen inusual.

### Proteger la dirección IP en las llamadas

**Qué hace:** Cuando haces una llamada por WhatsApp, normalmente la conexión va directo entre tu teléfono y el de la otra persona. Eso permite que la otra persona (o alguien con conocimientos) pueda deducir tu ubicación aproximada a partir de tu dirección IP. Con esta opción activada, las llamadas pasan por los servidores de WhatsApp, ocultando tu IP.

**Desventaja:** Puede reducir un poco la calidad del audio.

**Recomendación:** Activar. La pérdida de calidad es mínima y el beneficio de privacidad es real, especialmente si te llaman números desconocidos.

### Desactivar vistas previas de enlaces

**Qué hace:** Cuando compartes un enlace en un chat, WhatsApp normalmente carga una vista previa (la imagen y título de la página). Para generar esa vista previa, tu teléfono se conecta al sitio — y ese sitio puede ver tu dirección IP.

**Recomendación:** Activar si te importa la privacidad. Si lo desactivas, los enlaces que compartas se verán solo como texto (sin imagen de previsualización). Es un cambio menor en la experiencia a cambio de más privacidad.

### Ajustes estrictos de la cuenta

**Qué es:** Un modo de protección máxima pensado para personas con alto riesgo (periodistas, activistas, políticos). Bloquea varias opciones de configuración para impedir ataques dirigidos.

**Recomendación:** No activar a menos que tengas razones específicas. La mayoría de las personas no lo necesita y reduce la calidad de la experiencia (mensajes y llamadas).

---

## Dispositivos vinculados

**Dónde:** Ajustes → Dispositivos vinculados

**Qué es:** La lista de computadores o navegadores donde tienes WhatsApp Web abierto. Cada dispositivo vinculado puede ver tus mensajes en tiempo real.

**Por qué importa:** Si alguien tomó tu teléfono un momento y escaneó el código QR de WhatsApp Web, puede leer todos tus mensajes sin que lo sepas.

**Qué hacer:** Revisa esta lista de vez en cuando. Si ves un dispositivo que no reconoces, toca "Cerrar sesión" inmediatamente. Si no usas WhatsApp Web, no debería haber nada en esta lista.

---

## Chats → Copia de seguridad cifrada

**Dónde:** Ajustes → Chats → Copia de seguridad → Copia de seguridad cifrada de extremo a extremo

**Qué es:** Tus mensajes dentro de WhatsApp ya están cifrados (nadie puede leerlos en el camino). Pero cuando se hace una copia de seguridad a Google Drive o iCloud, esa copia NO está cifrada por defecto — Google o Apple podrían acceder a ella, o alguien que entre a tu nube.

Al activar la copia cifrada, la protección se extiende a la copia de seguridad. Solo tú puedes acceder con una contraseña o clave que eliges.

**Recomendación:** Activar si te importa que tus conversaciones estén protegidas incluso en la nube. El único riesgo es que si olvidas la contraseña y pierdes el teléfono, no puedes recuperar los mensajes — WhatsApp no puede ayudarte, y esa es la gracia.

---

## Resumen rápido

| Opción | Recomendación |
|--------|---------------|
| Verificación en dos pasos | Activar siempre |
| Visibilidad del perfil (foto, hora, info, estados) | Todo en "Mis contactos" o "Nadie" |
| Grupos | Mis contactos |
| Silenciar llamadas de desconocidos | Activar |
| Bloquear mensajes masivos | Activar |
| Proteger IP en llamadas | Activar |
| Desactivar vistas previas de enlaces | Activar |
| Dispositivos vinculados | Revisar periódicamente |
| Copia cifrada | Activar |

---

## Fuentes

[1] WhatsApp FAQ. Verificación en dos pasos. https://faq.whatsapp.com/1278661612895630

[2] WhatsApp Blog. End-to-End Encrypted Backups. https://blog.whatsapp.com/end-to-end-encrypted-backups-on-whatsapp

[3] WhatsApp FAQ. Cómo proteger tu dirección IP en las llamadas. https://faq.whatsapp.com/2635108359972899

[4] Meta Engineering (2023). Enhancing the security of WhatsApp calls. https://engineering.fb.com/2023/11/08/security/whatsapp-calls-enhancing-security/
