---
title: "Drive-by download: cómo te infectas sin hacer clic"
description: "Algunos sitios pueden instalar malware en tu dispositivo solo porque los visitaste. Aquí explico cómo funciona ese ataque paso a paso."
section: aprender
level: avanzado
risk: alto
reading_time: 5
created: 2026-07-23
updated: 2026-07-23
tags: [malware, exploits, navegador, vulnerabilidades]
related: [sitios-peligrosos, como-funciona-el-malware]
status: published
content_type: learn
---

# Drive-by download: cómo te infectas sin hacer clic

Un drive-by download es un ataque donde tu dispositivo se infecta simplemente por visitar una página web. No hiciste clic en nada. No descargaste nada conscientemente. Solo abriste la página — y eso fue suficiente.

Es el tipo de ataque más silencioso que existe contra usuarios comunes.

---

## Cómo funciona (paso a paso)

### 1. Visitas un sitio con código malicioso

Puede ser un sitio pirata con publicidad agresiva, un sitio legítimo que fue hackeado, o un anuncio malicioso que se carga dentro de un sitio normal (esto se llama malvertising — publicidad maliciosa).

### 2. Tu navegador carga el contenido de la página

Cuando visitas un sitio, tu navegador automáticamente descarga y ejecuta el código que forma la página: HTML (la estructura), CSS (el diseño), y JavaScript (la interactividad). Esto es normal — así funciona toda la web.

### 3. El código malicioso busca una vulnerabilidad

Entre ese código hay un script que analiza tu navegador: qué versión es, qué plugins tienes, qué sistema operativo usas. Busca un agujero de seguridad conocido que no hayas parcheado (actualizado).

### 4. Si encuentra una, la explota

Una vulnerabilidad es un error en el software que permite hacer algo que no debería ser posible — como ejecutar un programa sin tu permiso. El código malicioso aprovecha ese error para saltar las protecciones de tu navegador.

### 5. Se descarga e instala el malware

Sin que veas nada, el script descarga un programa malicioso y lo ejecuta en tu sistema. Todo ocurre en segundo plano.

---

## Las vulnerabilidades se descubren todos los días

En 2025 se publicaron 48.185 vulnerabilidades nuevas — un promedio de 131 por día [1]. Cada una de esas vulnerabilidades es un potencial punto de entrada para un ataque. Se registran en una base de datos pública llamada NVD (National Vulnerability Database) y cada una recibe un código único llamado CVE (Common Vulnerabilities and Exposures).

Por ejemplo: `CVE-2026-48277` es una vulnerabilidad real publicada en junio de 2026 que permitía ejecutar código malicioso sin interacción del usuario.

Tanto los profesionales de seguridad como los atacantes usan estas mismas bases de datos para conocer las vulnerabilidades:
- Los profesionales las usan para parchear (corregir) sus sistemas antes de que alguien las explote
- Los atacantes las usan para crear exploits (programas que aprovechan esos errores) y atacar a quienes no han actualizado

Es una carrera entre quién actúa primero: el que actualiza o el que ataca.

---

## Por qué funciona

- Tu navegador ejecuta JavaScript automáticamente en cada página que visitas — es lo normal
- Los anuncios se cargan desde servidores externos que el sitio no controla — un anuncio puede ser malicioso sin que el dueño del sitio lo sepa
- Si tu navegador o sistema operativo tiene una vulnerabilidad sin parchear, el atacante puede explotarla sin que intervengas

---

## Cómo protegerte

### Lo esencial

- **Mantén tu navegador actualizado** — los navegadores modernos se actualizan solos, pero verifica que no tengas actualizaciones pendientes. Cada actualización cierra vulnerabilidades conocidas.
- **Mantén tu sistema operativo actualizado** — los parches de seguridad cierran los agujeros que estos ataques explotan. No pospongas las actualizaciones.
- **Usa un bloqueador de anuncios** — si el anuncio malicioso no se carga, el ataque no puede empezar. Es la defensa más efectiva contra malvertising. [Cómo instalar uBlock Origin →](/guias/ublock-origin/instalar-y-configurar)

### Protecciones adicionales

- **Activa la protección mejorada de tu navegador** — Chrome tiene "Enhanced Safe Browsing" (Configuración → Privacidad → Safe Browsing → Protección mejorada). Firefox tiene protecciones similares. Esto bloquea sitios conocidos como peligrosos antes de que carguen.
- **No desactives las actualizaciones automáticas** — ni del navegador ni del sistema. Cada día que pasa sin actualizar es un día donde vulnerabilidades publicadas están abiertas en tu sistema.
- **Reduce las extensiones del navegador** — cada una es un punto más donde puede haber un agujero de seguridad. Mantén solo las que realmente usas.
- **Desactiva la reproducción automática de contenido** — en la configuración de tu navegador puedes bloquear que videos y animaciones se reproduzcan solos. Reduce vectores de ataque.
- **Evita sitios pirata** — sus redes de anuncios son las más peligrosas porque no tienen filtros de calidad.

### Lo que tu navegador ya hace por ti (sin que lo sepas)

Los navegadores modernos tienen defensas internas contra estos ataques:
- **Sandboxing** (aislamiento): cada pestaña se ejecuta en un espacio separado. Si un ataque compromete una pestaña, le cuesta mucho saltar al resto del sistema.
- **Site isolation**: cada sitio se procesa en un proceso separado del sistema operativo.
- **Safe Browsing / SmartScreen**: listas actualizadas de sitios maliciosos conocidos que se bloquean automáticamente.

Estas protecciones no son perfectas, pero hacen que los drive-by downloads sean cada vez más difíciles de ejecutar con éxito.

---

## Limitaciones del ataque

- Si tu software está completamente actualizado, la mayoría de drive-by downloads fallan — necesitan una vulnerabilidad abierta
- Los navegadores modernos con sandboxing dificultan que el código malicioso salte fuera del navegador al sistema
- Un bloqueador de anuncios elimina la mayoría de los vectores antes de que carguen
- No es un ataque invencible — pero sí es invisible. Por eso es importante entenderlo

---

## Fuentes

[1] AppSecSanta (2026). 48,185 CVEs published in 2025 — approximately 131 per day. https://appsecsanta.com/research/software-vulnerability-statistics

---

## Ver también

- [Cómo funciona el malware](/aprender/como-funciona-el-malware)
- [Sitios web peligrosos](/reconocer/sitios-peligrosos)

---
