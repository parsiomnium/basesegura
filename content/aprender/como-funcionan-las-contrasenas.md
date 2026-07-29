---
title: "Cómo funcionan las contraseñas por dentro"
description: "Qué pasa cuando escribes tu contraseña, cómo la guarda un sitio web, qué significa que sea 'fuerte', y cómo la rompen los atacantes."
section: aprender
level: intermedio
risk: medio
reading_time: 8
created: 2026-07-29
updated: 2026-07-29
tags: [contrasenas, entropia, hash, ataques, fundamentos]
related: [contrasenas-seguras, gestores-de-contrasenas]
status: published
content_type: learn
---

# Cómo funcionan las contraseñas por dentro

Sabes que necesitas una contraseña larga y aleatoria. Pero ¿por qué? ¿Qué pasa cuando la escribes? ¿Cómo la guarda un sitio web? ¿Cómo la rompe un atacante? Este artículo explica el mecanismo completo — sin jerga innecesaria, pero sin simplificar de más.

---

## Qué pasa cuando escribes tu contraseña

1. Escribes tu contraseña en el sitio web.
2. El sitio **no la guarda tal cual** — la transforma con una función matemática irreversible (un *hash*).
3. Lo que queda almacenado es el resultado de esa transformación, no tu contraseña original.
4. La próxima vez que entras, el sitio aplica la misma transformación a lo que escribiste y compara con lo que tiene guardado. Si coinciden, entras.

¿Por qué no guardar la contraseña directamente? Porque si alguien roba la base de datos del sitio (y pasa más seguido de lo que crees), no obtiene contraseñas reales — obtiene hashes. Y de un hash no se puede "volver atrás" a la contraseña original. Al menos, no directamente.

---

## Qué es un hash

Un hash es una función que convierte cualquier texto en una cadena de largo fijo. Siempre produce el mismo resultado para la misma entrada, pero es imposible hacer el camino inverso.

Ejemplo simplificado:

| Contraseña | Hash (SHA-256, primeros 16 caracteres) |
|---|---|
| `hola` | `b221d9dbb083a7f3` |
| `Hola` | `753692ec36adb4c2` |
| `hola1` | `1d31f2f1a9e4b6c8` |

Cambiar una sola letra produce un hash completamente distinto. No hay patrón que permita deducir la contraseña mirando el hash.

Los sitios serios usan funciones hash diseñadas específicamente para contraseñas (como bcrypt, scrypt o Argon2) que son intencionalmente lentas — para que un atacante no pueda probar millones por segundo.

---

## Cómo rompe un atacante tu contraseña

Un atacante que roba una base de datos obtiene hashes, no contraseñas. Para descubrir la contraseña original, tiene que **adivinarla probando opciones**:

### Ataque de diccionario

Prueba todas las palabras comunes, nombres, fechas, frases conocidas. Incluye variaciones como `P@ssw0rd`, `Hola123!`, `MiPerro2024`.

Los diccionarios de ataque tienen miles de millones de entradas recopiladas de filtraciones anteriores. Si tu contraseña se parece a algo que alguien haya usado antes, está en una de esas listas.

### Fuerza bruta

Prueba todas las combinaciones posibles, carácter por carácter: `a`, `b`, `c`... `aa`, `ab`, `ac`... hasta encontrar la correcta.

Funciona siempre — si tienes tiempo suficiente. Una contraseña de 4 caracteres se rompe en menos de un segundo. Una de 20 caracteres aleatorios no se rompe ni con todos los computadores del mundo trabajando juntos durante millones de años.

### Ataques reales combinados

En la práctica, los atacantes combinan ambos: empiezan con diccionarios (lo más probable), siguen con reglas (agregar números, cambiar letras por símbolos), y solo usan fuerza bruta pura como último recurso.

La velocidad depende del tipo de hash:
- MD5 (inseguro, sitios antiguos): un atacante puede probar **100 mil millones** de contraseñas por segundo con hardware especializado.
- bcrypt (seguro, sitios modernos): ~10,000 por segundo con el mismo hardware.

---

## Qué significa "entropía" y por qué importan los bits

La entropía mide cuántas opciones posibles tiene tu contraseña — es decir, cuántas combinaciones tendría que probar un atacante que no sabe nada sobre ti.

Se mide en **bits**. Cada bit duplica el número de posibilidades:

| Bits | Combinaciones posibles |
|------|----------------------|
| 1 | 2 |
| 10 | 1,024 |
| 20 | 1,048,576 (un millón) |
| 40 | 1,099,511,627,776 (un billón) |
| 60 | 1,152,921,504,606,846,976 (un trillón) |
| 80 | 1,208,925,819,614,629,174,706,176 |
| 128 | 340 undecillones (más que átomos en el universo observable) |

### ¿Cuántos bits necesitas?

- **Menos de 40 bits:** vulnerable. Un atacante con hardware moderno la rompe en horas o días.
- **40-60 bits:** aceptable contra ataques online (donde el sitio limita intentos), pero vulnerable si roban la base de datos.
- **60-80 bits:** fuerte. Resistente incluso si roban los hashes, siempre que el sitio use un hash moderno.
- **Más de 80 bits:** muy fuerte. No se rompe con tecnología actual.

### Cómo se calculan los bits

La fórmula es simple: `bits = log₂(opciones por posición) × largo`

**Para caracteres aleatorios:**
- Solo minúsculas (26 letras): cada carácter aporta ~4.7 bits.
- Minúsculas + números (36): ~5.2 bits por carácter.
- Mayúsculas + minúsculas + números + símbolos (95): ~6.6 bits por carácter.
- Una contraseña de 16 caracteres con todo: 16 × 6.6 = ~105 bits.

**Para frases de palabras aleatorias:**
- Con una lista de 2,048 palabras: cada palabra aporta 11 bits.
- 4 palabras: 44 bits.
- 5 palabras: 55 bits.
- 6 palabras: 66 bits.

Lo que importa es que las palabras o caracteres sean **realmente aleatorios** — elegidos por un generador, no por tu cabeza. Los humanos somos pésimos generando aleatoriedad: elegimos fechas, nombres, patrones de teclado, frases que nos gustan. Todo eso reduce la entropía real a una fracción de lo que debería ser.

---

## Por qué "Tr0b4d0r&3" es peor que "caballo batería grapa correcto"

Esto viene de una explicación famosa: una contraseña que parece compleja (`Tr0b4dor&3`) tiene en realidad poca entropía porque sigue patrones predecibles que los diccionarios de ataque ya incluyen — palabra base + sustituciones + número + símbolo.

En cambio, cuatro palabras verdaderamente aleatorias (`caballo batería grapa correcto`) tienen más entropía porque no siguen ningún patrón. El largo y la aleatoriedad real ganan sobre la complejidad aparente.

La lección: **lo que importa no es cómo se ve la contraseña, sino cómo se generó**. Si la elegiste tú pensando "esto parece difícil", probablemente no lo es tanto. Si la generó un programa aleatorio, las matemáticas te protegen.

---

## Qué hacer con esto

1. **Usa un generador** para crear contraseñas — no las inventes de memoria. Puedes usar el [generador de contraseñas](/herramientas/generador-contrasenas) de Base Segura.
2. **Usa un gestor** para guardarlas. Solo necesitas memorizar una contraseña: la del gestor. Que sea una frase de 5-6 palabras aleatorias.
3. **Activa verificación en dos pasos** en tus cuentas importantes. Así, aunque alguien descubra tu contraseña, no puede entrar sin el segundo factor.

---

## Fuentes

[1] NIST SP 800-63B Rev. 4 (2025). Digital Identity Guidelines: Authentication and Lifecycle Management. https://pages.nist.gov/800-63-4/sp800-63b.html

[2] OWASP (2024). Password Storage Cheat Sheet. https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html

[3] Bonneau, J. et al. (2012). "The Science of Guessing: Analyzing an Anonymized Corpus of 70 Million Passwords." IEEE Symposium on Security and Privacy. https://ieeexplore.ieee.org/document/6234435

[4] Hashcat benchmarks (2024). Velocidades de cracking por tipo de hash y hardware. https://hashcat.net/hashcat/

---
