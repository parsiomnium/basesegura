export const SITE_NAME = 'Base Segura'
export const SITE_TITLE = `${SITE_NAME} — Seguridad digital para todas las personas`
export const SITE_DESCRIPTION =
  'Base de conocimiento pública y gratuita sobre seguridad digital en español. Guías simples, sin jerga, para proteger tu vida digital.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://basesegura.org'
export const REPO_URL = 'https://github.com/parsiomnium/basesegura'

export const sections: Record<string, { label: string; description: string }> = {
  prevenir: {
    label: 'Prevenir',
    description: 'Protege tus cuentas y dispositivos antes de que pase algo',
  },
  reconocer: {
    label: 'Reconocer',
    description: 'Aprende a identificar estafas y mensajes falsos',
  },
  reaccionar: {
    label: 'Reaccionar',
    description: 'Te robaron, te hackearon o ves algo raro — actúa rápido',
  },
}
