import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vigencia del contenido — Base Segura',
  description: 'Cómo funciona el sistema de vigencia de los artículos de Base Segura.',
}

export default function VigenciaPage() {
  return (
    <div className="prose max-w-none">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] mb-2 inline-block no-underline"
        >
          ← Inicio
        </Link>
      </div>

      <h1>Vigencia del contenido</h1>

      <p>
        La seguridad digital cambia constantemente. Las aplicaciones actualizan sus interfaces, los
        métodos de ataque evolucionan, y lo que era una buena recomendación hace un año puede no
        serlo hoy. Por eso cada artículo de Base Segura tiene un sistema de vigencia visible.
      </p>

      <h2>Cómo funciona</h2>

      <p>Cada artículo muestra su fecha de última actualización. Dependiendo del tiempo transcurrido
      y del tipo de contenido, puede aparecer un aviso:</p>

      <table>
        <thead>
          <tr>
            <th>Estado</th>
            <th>Qué significa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Sin aviso</strong></td>
            <td>El contenido ha sido revisado recientemente y está vigente.</td>
          </tr>
          <tr>
            <td><strong>Aviso amarillo</strong></td>
            <td>Ha pasado un tiempo desde la última revisión. La información general sigue vigente, pero algunos pasos o capturas podrían verse diferente en la versión actual de una app o servicio.</td>
          </tr>
          <tr>
            <td><strong>Aviso naranja</strong></td>
            <td>El artículo lleva bastante tiempo sin actualización. Puede contener información obsoleta. Está en proceso de revisión.</td>
          </tr>
        </tbody>
      </table>

      <h2>No todo envejece igual</h2>

      <p>Los tiempos de revisión varían según el tipo de contenido:</p>

      <table>
        <thead>
          <tr>
            <th>Tipo de contenido</th>
            <th>Por qué caduca</th>
            <th>Revisión cada</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Guías por plataforma</strong> (WhatsApp, Gmail, etc.)</td>
            <td>Las apps cambian interfaces seguido</td>
            <td>4 meses</td>
          </tr>
          <tr>
            <td><strong>Artículos de reacción</strong> (me hackearon, me robaron)</td>
            <td>Los procesos y contactos pueden cambiar</td>
            <td>6 meses</td>
          </tr>
          <tr>
            <td><strong>Artículos de prevención</strong> (contraseñas, phishing, privacidad)</td>
            <td>Los principios son estables, los detalles cambian lento</td>
            <td>9 meses</td>
          </tr>
          <tr>
            <td><strong>Artículos educativos</strong> (qué es la seguridad digital)</td>
            <td>Conceptos fundamentales, cambian muy poco</td>
            <td>12 meses</td>
          </tr>
        </tbody>
      </table>

      <h2>Compromiso</h2>

      <p>
        Me comprometo a revisar cada artículo dentro de su plazo. Si ves un aviso de vigencia, significa
        que sé que necesita revisión y está en mi lista. Si encuentras algo que ya no es correcto,
        puedes{' '}
        <a href="https://github.com/parsiomnium/basesegura/issues" target="_blank" rel="noopener noreferrer">
          abrir un issue en GitHub
        </a>{' '}
        para que lo corrija más rápido.
      </p>
    </div>
  )
}
