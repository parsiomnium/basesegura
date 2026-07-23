---
title: "Privacidad e inteligencia artificial: qué saben de ti y cómo limitarlo"
description: "Cada vez que usas ChatGPT, Gemini u otra IA, le estás dando información — a veces más de la que crees. Aquí te explico qué hacen con ella y cómo protegerte."
section: prevenir
level: basico
risk: medio
reading_time: 7
created: 2026-07-23
updated: 2026-07-23
tags: [privacidad, inteligencia-artificial, datos-personales]
related: [contrasenas-seguras, verificacion-en-dos-pasos]
status: published
content_type: prevent
---

# Privacidad e inteligencia artificial: qué saben de ti y cómo limitarlo

Cada vez que le preguntas algo a ChatGPT, a Gemini, a Copilot o a cualquier asistente de inteligencia artificial, le estás entregando información. A veces es obvia (tu nombre, tu ciudad, tu problema de salud). Pero muchas veces es implícita — cosas que no dijiste directamente pero que la IA puede inferir de cómo escribes, qué preguntas y en qué contexto.

La pregunta que pocas personas se hacen: **¿qué pasa con todo eso después?**

---

## Qué información le estás dando

### Lo que dices explícitamente

Cada vez que escribes en un chat con IA, estás compartiendo:
- El contenido de tu pregunta (que puede incluir nombres, direcciones, síntomas médicos, problemas legales, conflictos personales)
- Archivos que subes (documentos, fotos, código)
- El contexto de conversaciones anteriores (si tienes el historial activado)

### Lo que no dices pero la IA puede deducir

Investigadores de ETH Zurich demostraron que los modelos de lenguaje pueden inferir datos personales como ubicación, ingresos, sexo, ocupación y raza a partir de texto aparentemente inocuo — con hasta 85% de precisión [1].

Esto significa que incluso sin decir "vivo en Santiago y trabajo en un banco", si le preguntas a la IA sobre el Transantiago, mencionas UF, y le pides ayuda con un correo formal en español, la IA ya puede inferir bastante sobre ti.

**Con el tiempo, le vas contando tu vida entera sin darte cuenta:**
- Tus problemas de salud (1 de cada 3 adultos ya usa IA para consultas de salud [2])
- Tu situación financiera (26% de usuarios pregunta sobre finanzas personales [3])
- Tus relaciones, conflictos y emociones
- Tu trabajo, tu empresa, tus proyectos
- Tus opiniones políticas, religiosas, personales

---

## Qué hacen con esa información

El patrón es el mismo en casi todas las plataformas de IA:

1. **Por defecto, tus conversaciones se usan para entrenar el modelo.** Lo que escribes puede influir en cómo la IA responde a otras personas en el futuro.
2. **Puedes desactivar el entrenamiento**, pero tienes que hacerlo tú activamente — no viene desactivado.
3. **Aunque desactives el entrenamiento, la empresa retiene tus datos** por un tiempo (generalmente 30 días) para monitoreo de abuso y cumplimiento legal.
4. **Las versiones de pago para empresas** suelen no entrenar por defecto. Las versiones gratuitas y de pago individual sí lo hacen.

Cada plataforma tiene sus propios pasos para configurar la privacidad:
- [Cómo configurar la privacidad en ChatGPT →](/guias/chatgpt/privacidad)
- [Cómo configurar la privacidad en Gemini →](/guias/gemini/privacidad)

---

## Qué puede salir mal

### Caso real: Samsung (2023)

Empleados de Samsung pegaron código fuente confidencial en ChatGPT para que les ayudara a corregir errores. Esa información pasó a ser parte de los datos de entrenamiento. Samsung no pudo recuperarla ni eliminarla — prohibió el uso de ChatGPT para toda la empresa [4].

No necesitas ser ingeniero de Samsung para que esto te afecte. Si pegas un contrato de trabajo, un correo privado, datos de clientes, o información médica — le estás entregando eso a una empresa externa.

### Lo que puede pasar contigo

- Compartes un problema legal y mencionas nombres → esos datos quedan almacenados
- Le pides ayuda con tu CV incluyendo tu dirección y teléfono → información personal entregada
- Le cuentas sobre un conflicto con tu jefe → información laboral sensible
- Le preguntas sobre síntomas médicos → datos de salud en un servidor externo
- Un familiar usa tu cuenta y comparte algo íntimo → queda asociado a tu perfil

---

## Cómo protegerte

### 1. Desactiva el entrenamiento

Cada plataforma tiene una opción para decirle "no uses mis conversaciones para entrenar". Los pasos específicos están en las guías por plataforma:
- [ChatGPT →](/guias/chatgpt/privacidad)
- [Gemini →](/guias/gemini/privacidad)

### 2. No compartas información que no compartirías en público

La regla más simple: **si no lo publicarías en una red social, no lo escribas en una IA.**

Antes de escribir algo, pregúntate: ¿me importaría que esta información apareciera en otro lado? Si la respuesta es sí, reformula la pregunta sin datos identificables.

**En vez de:**
> "Mi hija Valentina de 8 años que va al colegio San Ignacio tiene problemas con una compañera que se llama..."

**Escribe:**
> "Mi hija de 8 años tiene un conflicto con una compañera en el colegio. ¿Cómo puedo ayudarla?"

El resultado es igual de útil. La diferencia es que la segunda versión no entrega nombres ni datos identificables.

### 3. Usa chats temporales cuando puedas

Algunas IAs tienen una opción de "chat temporal" que no guarda la conversación ni la usa para entrenamiento. Úsala cuando vayas a escribir algo sensible.

### 4. No subas documentos con datos reales

Si necesitas ayuda con un contrato, un correo formal o un documento — antes de subirlo:
- Reemplaza nombres reales por ficticios
- Quita direcciones, teléfonos, RUT/DNI
- Borra cualquier dato que identifique a una persona específica

### 5. Revisa qué has compartido

Las plataformas de IA te permiten ver y borrar tu historial de conversaciones. Si alguna vez compartiste algo sensible, puedes eliminarlo (aunque eso no garantiza que se borre de los datos de entrenamiento si ya fue procesado).

---

## Lo que NO es un riesgo (para que no te preocupes de más)

- **Preguntar cosas generales** ("¿cómo se hace una salsa bechamel?", "¿qué es la inflación?") no revela nada personal.
- **La IA no te está "espiando"** — no tiene acceso a tu cámara, tu micrófono ni tus archivos a menos que tú se los des explícitamente.
- **No va a "usar tu información contra ti"** — el riesgo no es que la IA te ataque, sino que tus datos queden almacenados en servidores de una empresa y puedan filtrarse, usarse para entrenar modelos, o ser solicitados por un gobierno.

El riesgo real es la acumulación: muchas preguntas inocuas, con el tiempo, construyen un perfil detallado de quién eres.

---

## Qué NO hacer

- No pegues contraseñas, tokens, claves de acceso ni datos bancarios en ninguna IA
- No subas documentos confidenciales sin borrar datos identificables primero
- No uses IA para procesar información de otras personas sin su consentimiento (datos de clientes, pacientes, estudiantes)
- No asumas que porque "es solo una pregunta" no estás revelando nada — la suma de preguntas construye un perfil
- No dejes el entrenamiento activado si usas la IA para temas personales o laborales sensibles

---

## Por qué importa

El 82% de los usuarios considera sus conversaciones con IA como sensibles — más que el correo electrónico o las redes sociales — pero casi la mitad habla de temas de salud y un tercio de finanzas personales con estos chatbots [5]. Hay una brecha enorme entre la preocupación y el comportamiento.

La IA no es tu enemigo. Es una herramienta útil. Pero es una herramienta que pertenece a una empresa privada, almacena lo que le dices, y por defecto usa esa información para sus propios fines. Saberlo te permite usarla bien — sin entregar más de lo necesario.

---

## Lista de verificación

- Desactivé el entrenamiento en las IAs que uso
- No pego información personal identificable en mis conversaciones
- Si necesito ayuda con un documento, borro nombres y datos reales antes de compartirlo
- No subo archivos confidenciales sin revisar qué contienen
- Uso chats temporales para temas sensibles
- Entiendo que la IA puede inferir cosas que no le dije explícitamente
- No comparto información de otras personas sin su consentimiento

---

## Fuentes

[1] ETH Zurich (2023). LLMs can infer personal attributes (location, income, sex) from innocuous text with up to 85% accuracy. https://arxiv.org/abs/2310.07298

[2] KFF (2026). 1 in 3 adults are turning to AI chatbots for health information. https://www.kff.org/health-information-trust/poll-1-in-3-adults-are-turning-to-ai-chatbots-for-health-information-equaling-the-share-who-use-social-media-for-health/

[3] LendingTree (2025). 26% of chatbot users ask about personal finance management. https://www.lendingtree.com/credit-cards/study/ai-chatbot-users/

[4] Cybernews (2023). Samsung employees leaked source code, meeting notes, and chip test data to ChatGPT in a single week. https://cybernews.com/security/chatgpt-samsung-leak-explained-lessons/

[5] arxiv.org (2025). 82% of respondents rated chatbot conversations as sensitive or highly sensitive — more than email or social media posts. https://arxiv.org/html/2508.06760v1

---
