---
title: "Cómo se filtra una base de datos"
description: "Qué significa una filtración de datos, cómo pasa, qué obtiene el atacante, y por qué una contraseña filtrada en un sitio puede afectar todas tus cuentas."
section: aprender
level: intermedio
risk: alto
reading_time: 7
created: 2026-07-29
updated: 2026-07-29
tags: [filtraciones, brechas, datos, ataques, fundamentos]
related: [como-funcionan-las-contrasenas, contrasenas-seguras]
status: published
content_type: learn
---

# Cómo se filtra una base de datos

El evaluador de contraseñas te dice "esta contraseña apareció en 47 filtraciones". Pero ¿qué significa eso exactamente? ¿Alguien robó tu contraseña? ¿De dónde? ¿Cómo? Y lo más importante: ¿por qué eso te afecta?

---

## Qué es una filtración de datos

Una filtración (o brecha) ocurre cuando alguien accede sin autorización a la base de datos de un servicio — un sitio web, una tienda online, un foro, una red social — y copia la información de sus usuarios.

Esa información puede incluir:

- Correos electrónicos
- Nombres de usuario
- Contraseñas (a veces en texto plano, a veces como hashes)
- Nombres reales, teléfonos, direcciones
- Datos de pago (en los peores casos)

Las bases de datos filtradas circulan en foros y mercados ilegales. Cualquiera puede descargarlas.

---

## Cómo pasa

No hay una sola forma. Las más comunes:

### Vulnerabilidades en el software

El sitio usa un programa con un error de seguridad conocido. El atacante explota ese error para acceder al servidor y copiar la base de datos. Esto pasa cuando los sitios no actualizan su software.

### Inyección SQL

El sitio no valida correctamente lo que escriben los usuarios. Un atacante escribe código malicioso en un campo de búsqueda o formulario, y el servidor lo ejecuta como si fuera una instrucción legítima — devolviendo datos que no debería.

### Credenciales robadas de empleados

Un empleado con acceso al servidor cae en phishing, o usa una contraseña débil, o reutiliza una que ya fue filtrada en otro sitio. El atacante entra con sus credenciales legítimas.

### Configuración errónea

El servidor está configurado para que cualquiera pueda acceder a la base de datos sin contraseña. Suena absurdo, pero pasa constantemente — bases de datos expuestas públicamente sin protección [1].

---

## Qué obtiene el atacante

Depende de cómo el sitio almacenaba las contraseñas:

### Peor caso: contraseñas en texto plano

Algunos sitios (más de los que quisieras saber) guardan tu contraseña tal cual la escribiste. Si los hackean, el atacante tiene tu correo + tu contraseña lista para usar.

### Caso intermedio: hashes débiles (MD5, SHA-1)

El sitio guardó un hash de tu contraseña, pero usó un algoritmo rápido como MD5. Un atacante puede probar 100 mil millones de combinaciones por segundo y romper la mayoría de las contraseñas en horas.

### Mejor caso: hashes fuertes (bcrypt, Argon2)

El sitio usó un hash lento diseñado para contraseñas. El atacante puede probar ~10,000 por segundo — las contraseñas largas y aleatorias resisten años o siglos de ataque.

---

## El efecto dominó: por qué una filtración te afecta en otros sitios

Aquí está el problema real. Si usas la misma contraseña en tu correo, en una tienda online y en un foro:

1. El foro se filtra (seguridad mediocre, base de datos robada).
2. El atacante obtiene tu correo + tu contraseña del foro.
3. Prueba esa misma combinación en Gmail, Hotmail, Facebook, Instagram, bancos.
4. Si funciona en alguno, tiene acceso.

Este ataque se llama **credential stuffing** — no es fuerza bruta ni ingeniería social. Es simplemente probar contraseñas que ya se sabe que alguien usa. Los atacantes lo automatizan: prueban millones de combinaciones correo/contraseña en cientos de sitios simultáneamente [2].

Por eso la regla más importante de seguridad de contraseñas no es "usa mayúsculas y símbolos" sino **nunca repitas una contraseña entre sitios**.

---

## Qué significa "tu contraseña apareció en X filtraciones"

Cuando el [evaluador de contraseñas](/herramientas/evaluador-contrasenas) te dice esto, significa que esa contraseña exacta (no necesariamente la tuya, pero la misma cadena de caracteres) fue encontrada en bases de datos filtradas.

Puede significar dos cosas:

1. **Alguien más usó la misma contraseña** y el sitio donde la usó fue hackeado. Esa contraseña está ahora en diccionarios de ataque — los programas la prueban entre las primeras.
2. **Tu propia cuenta fue parte de una filtración** y esa contraseña está asociada a tu correo en alguna base de datos circulando.

En ambos casos: no la uses. Si la usas en varios sitios, cámbiala en todos.

---

## Cómo saber si tus datos fueron filtrados

- [Have I Been Pwned](https://haveibeenpwned.com) — escribe tu correo y te dice en qué filtraciones apareció.
- El [evaluador de contraseñas](/herramientas/evaluador-contrasenas) de Base Segura verifica si una contraseña específica está en la lista.

---

## Qué hacer

1. **No repitas contraseñas.** Es la defensa principal contra credential stuffing.
2. **Usa un gestor de contraseñas.** Genera una distinta para cada sitio.
3. **Activa 2FA.** Si tu contraseña se filtra, el segundo factor impide que entren.
4. **Revisa Have I Been Pwned** con tu correo. Si apareces en filtraciones, cambia las contraseñas de esos servicios.
5. **No confíes en que un sitio protegerá bien tus datos.** Muchos no lo hacen. Protégete tú.

---

## Fuentes

[1] Shodan/Censys (2024). Bases de datos expuestas públicamente. https://www.shodan.io/

[2] OWASP (2024). Credential Stuffing Prevention. https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html

[3] Verizon (2025). Data Breach Investigations Report. https://www.verizon.com/business/resources/reports/dbir/

[4] Have I Been Pwned (2024). About. https://haveibeenpwned.com/About

---
