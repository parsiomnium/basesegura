---
title: "Cómo configurar la privacidad en Gemini"
description: "Guía paso a paso para controlar qué hace Google con tus conversaciones en Gemini y cómo desactivar el entrenamiento."
section: guias
level: basico
risk: medio
reading_time: 4
created: 2026-07-23
updated: 2026-07-23
tags: [privacidad, inteligencia-artificial, gemini, google]
related: [privacidad-e-inteligencia-artificial]
status: published
---

# Cómo configurar la privacidad en Gemini

Gemini es el asistente de IA de Google. Está integrado en la búsqueda, en Gmail, en Android, y tiene su propia app. Por defecto, Google guarda tus conversaciones y las usa para entrenar el modelo — a menos que tú lo desactives.

---

## Qué versión tienes importa

| Versión | Entrena con tus datos por defecto | Puedes desactivarlo |
|---|---|---|
| Gratuita (con cuenta Google) | Sí (si el historial está activado) | Sí |
| Google One AI Premium (pago) | Sí (si el historial está activado) | Sí |
| Google Workspace (empresas) | No | — |

A diferencia de ChatGPT, en Gemini **no hay un interruptor separado para entrenamiento**. La forma de evitarlo es desactivar el historial de actividad completo [1].

---

## Qué recopila Google

Según la documentación oficial de Gemini [2], Google recopila:
- Tus preguntas (texto y voz)
- Las respuestas que Gemini genera
- Archivos que compartes (documentos, imágenes, videos)
- Tu ubicación aproximada
- El dispositivo que usas
- Tu idioma
- Grabaciones de voz si usas Gemini Live

Todo esto se asocia a tu cuenta de Google.

---

## Cómo desactivar el entrenamiento

La única forma de evitar que Google use tus conversaciones para entrenar Gemini es **desactivar la actividad de Gemini Apps.**

### Paso 1: Ve a la configuración de actividad

Abre tu navegador y ve a [myactivity.google.com/product/gemini](https://myactivity.google.com/product/gemini).

Necesitas estar conectado con tu cuenta de Google.

[captura: página de My Activity mostrando la sección de Gemini]

### Paso 2: Desactiva "Gemini Apps Activity"

Busca el interruptor de **"Gemini Apps Activity"** (o "Actividad de Gemini Apps" en español). Desactívalo.

[captura: interruptor de actividad de Gemini con la opción de desactivar]

### Paso 3: Confirma

Google te mostrará un aviso explicando que al desactivar:
- Tus conversaciones futuras no se guardarán
- No podrás ver ni continuar chats anteriores
- Tus datos no se usarán para entrenar

Confirma la desactivación.

[captura: diálogo de confirmación]

---

## Lo que pierdes al desactivar

A diferencia de ChatGPT (donde puedes mantener el historial sin entrenamiento), en Gemini **es todo o nada**:

| Historial activado | Historial desactivado |
|---|---|
| Puedes ver conversaciones anteriores | No se guardan conversaciones |
| Google usa tus datos para entrenar | Google no usa tus datos para entrenar |
| Gemini recuerda contexto entre sesiones | Cada conversación empieza desde cero |

No hay término medio: si quieres que no entrene con tus datos, pierdes el historial [1].

---

## Cómo borrar conversaciones anteriores

Si ya tenías el historial activado y quieres borrar lo que Google guardó:

1. Ve a [myactivity.google.com/product/gemini](https://myactivity.google.com/product/gemini)
2. Verás una lista de tus conversaciones pasadas
3. Puedes borrar conversaciones individuales o usar "Borrar actividad" para eliminar todo

[captura: opciones de borrado en My Activity]

**Importante:** las conversaciones que ya fueron procesadas para entrenamiento no se pueden "desaprender". Borrar el historial elimina el registro de tu cuenta, pero si los datos ya se incorporaron a un modelo, ahí se quedan [3].

---

## Modo temporal (sin historial)

Si no quieres desactivar el historial permanentemente pero necesitas tener una conversación sin que se guarde:

- Google no ofrece un "modo temporal" explícito como ChatGPT
- La alternativa es: desactivar la actividad antes de la conversación, tener la conversación, y volver a activarla después — pero es incómodo
- O simplemente: no compartas información sensible en Gemini si tienes el historial activado

---

## Resumen rápido

| Acción | Qué logras |
|---|---|
| Desactivar "Gemini Apps Activity" | Tus conversaciones no se guardan ni entrenan el modelo |
| Borrar actividad anterior | Se elimina el registro de tu cuenta |
| Mantener historial activado | Google guarda y puede usar tus datos |

---

## Fuentes

[1] PCMag (2026). The only way to stop Gemini training on your chats is to turn off Google's history retention entirely. https://uk.pcmag.com/ai/164639/protect-privacy-when-using-google-gemini

[2] Google Support. Gemini Apps Privacy Hub — data collected includes prompts, files, location, device, recordings. https://support.google.com/gemini/answer/13594961

[3] mePrism (2026). Opting out stops new conversations from being used going forward; it does not delete data already used in completed training runs. https://meprism.com/opt-out-guides/blog/chatgpt-openai-ai-training-opt-out

---
