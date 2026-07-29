export interface UrlChallenge {
  id: number
  url: string
  isLegitimate: boolean
  signals: string[]
  explanation: string
}

export const urls: UrlChallenge[] = [
  {
    id: 1,
    url: 'https://www.bancoestado.cl/personas',
    isLegitimate: true,
    signals: ['Dominio real de BancoEstado', 'HTTPS presente', 'Ruta simple y coherente'],
    explanation:
      'bancoestado.cl es el dominio oficial del banco. La ruta /personas es una sección real del sitio.',
  },
  {
    id: 2,
    url: 'https://bancoestado.cl.verificar-cuenta.com/login',
    isLegitimate: false,
    signals: [
      'El dominio real es verificar-cuenta.com, no bancoestado.cl',
      'bancoestado.cl es solo un subdominio del sitio falso',
      'Ruta /login busca robar credenciales',
    ],
    explanation:
      'Lo que parece ser bancoestado.cl es en realidad un subdominio de verificar-cuenta.com. El dominio real siempre es lo que está justo antes del primer / después de https://.',
  },
  {
    id: 3,
    url: 'https://accounts.google.com/signin',
    isLegitimate: true,
    signals: [
      'Dominio oficial de Google (google.com)',
      'Subdominio accounts es real y conocido',
      'HTTPS presente',
    ],
    explanation:
      'accounts.google.com es la página real de inicio de sesión de Google. El subdominio "accounts" pertenece al dominio google.com.',
  },
  {
    id: 4,
    url: 'https://google.com.login-seguro.net/cuenta',
    isLegitimate: false,
    signals: [
      'El dominio real es login-seguro.net',
      'google.com es un subdominio falso',
      'Patrón clásico de phishing: marca + dominio genérico',
    ],
    explanation:
      'El dominio real es login-seguro.net — "google.com" está puesto delante como subdominio para engañar. Google nunca usa dominios que no sean google.com.',
  },
  {
    id: 5,
    url: 'https://www.netflix.com/browse',
    isLegitimate: true,
    signals: ['Dominio oficial de Netflix', 'HTTPS presente', 'Ruta /browse es real'],
    explanation:
      'netflix.com es el dominio real. /browse es la página principal después de iniciar sesión.',
  },
  {
    id: 6,
    url: 'https://netffix-cuenta.com/restablecer-pago',
    isLegitimate: false,
    signals: [
      'Doble f en "netffix" (typosquatting)',
      'Dominio completamente distinto a netflix.com',
      'Ruta diseñada para robar datos de pago',
    ],
    explanation:
      'netffix-cuenta.com no es Netflix. La doble f es un error intencional difícil de notar a primera vista. Netflix solo opera desde netflix.com.',
  },
  {
    id: 7,
    url: 'https://www.mercadolibre.cl/ofertas',
    isLegitimate: true,
    signals: ['Dominio oficial de Mercado Libre Chile', 'HTTPS', 'Ruta simple'],
    explanation:
      'mercadolibre.cl es el dominio real para Chile. La sección /ofertas existe en el sitio.',
  },
  {
    id: 8,
    url: 'https://mercadolibre-ofertas.cl/descuento-especial',
    isLegitimate: false,
    signals: [
      'El dominio es mercadolibre-ofertas.cl, no mercadolibre.cl',
      'Mercado Libre no usa dominios con guiones adicionales',
      'Ruta genérica diseñada para atraer clics',
    ],
    explanation:
      'mercadolibre-ofertas.cl es un dominio completamente distinto a mercadolibre.cl. Los guiones dentro del nombre de dominio son una señal de alerta cuando imitan una marca conocida.',
  },
  {
    id: 9,
    url: 'https://web.whatsapp.com',
    isLegitimate: true,
    signals: [
      'Dominio oficial de WhatsApp',
      'Subdominio web es real (WhatsApp Web)',
      'HTTPS presente',
    ],
    explanation:
      'web.whatsapp.com es la dirección real de WhatsApp Web, la versión para navegador de WhatsApp.',
  },
  {
    id: 10,
    url: 'https://whatsapp-web.com/iniciar-sesion',
    isLegitimate: false,
    signals: [
      'El dominio es whatsapp-web.com, no whatsapp.com',
      'La versión real es web.whatsapp.com (subdominio)',
      'Ruta /iniciar-sesion busca robar el código QR',
    ],
    explanation:
      'whatsapp-web.com es un dominio falso. La versión real es web.whatsapp.com (subdominio de whatsapp.com). La diferencia es sutil pero crítica: un guión vs. un punto.',
  },
  {
    id: 11,
    url: 'https://www.sii.cl/servicios_online/',
    isLegitimate: true,
    signals: ['Dominio real del SII (Servicio de Impuestos Internos)', 'HTTPS', 'Ruta real'],
    explanation:
      'sii.cl es el dominio oficial del Servicio de Impuestos Internos de Chile. Los guiones bajos en la ruta son normales.',
  },
  {
    id: 12,
    url: 'https://sii-devolucion.cl/reclamar',
    isLegitimate: false,
    signals: [
      'El dominio es sii-devolucion.cl, no sii.cl',
      'El SII no tiene dominios con guiones',
      '"Reclamar" busca que entregues datos',
    ],
    explanation:
      'El SII opera exclusivamente desde sii.cl. Cualquier variante con guiones o palabras adicionales es falsa. Las devoluciones se consultan solo en el sitio oficial.',
  },
  {
    id: 13,
    url: 'https://outlook.live.com/mail/',
    isLegitimate: true,
    signals: [
      'Dominio real de Microsoft (live.com)',
      'Subdominio outlook es oficial',
      'HTTPS presente',
    ],
    explanation:
      'outlook.live.com es la dirección real del correo de Outlook/Hotmail de Microsoft. live.com es un dominio que pertenece a Microsoft.',
  },
  {
    id: 14,
    url: 'https://0utlook-login.com/verificar',
    isLegitimate: false,
    signals: [
      'Usa un 0 (cero) en lugar de la O',
      'Dominio completamente falso',
      'Ruta /verificar busca robar credenciales',
    ],
    explanation:
      'El cero (0) reemplaza la O en "outlook". Es una técnica de homoglifos — caracteres que se ven similares pero son distintos. Outlook solo funciona desde outlook.live.com o outlook.com.',
  },
  {
    id: 15,
    url: 'https://www.spotify.com/cl/account/',
    isLegitimate: true,
    signals: ['Dominio real de Spotify', '/cl/ indica la versión para Chile', 'HTTPS presente'],
    explanation:
      'spotify.com es el dominio oficial. /cl/ es el prefijo de país para Chile. Ruta legítima para gestionar tu cuenta.',
  },
  {
    id: 16,
    url: 'https://spotify-premium-gratis.com/activar',
    isLegitimate: false,
    signals: [
      'El dominio no es spotify.com',
      '"Premium gratis" es un gancho de estafa',
      'Spotify no regala su servicio de pago',
    ],
    explanation:
      'Spotify Premium cuesta dinero — nadie lo regala. El dominio spotify-premium-gratis.com no tiene ninguna relación con Spotify. Es una estafa para robar datos o instalar malware.',
  },
  {
    id: 17,
    url: 'https://myaccount.google.com/security',
    isLegitimate: true,
    signals: [
      'Dominio real de Google',
      'Subdominio myaccount es oficial',
      'Ruta /security es la página de seguridad real',
    ],
    explanation:
      'myaccount.google.com es la dirección real para gestionar la seguridad de tu cuenta de Google.',
  },
  {
    id: 18,
    url: 'https://www.paypal.com.secure-update.info/confirmar',
    isLegitimate: false,
    signals: [
      'El dominio real es secure-update.info',
      'paypal.com es solo un subdominio del sitio falso',
      'Patrón: marca.dominio-falso.tld',
    ],
    explanation:
      'El dominio real aquí es secure-update.info. Todo lo que está antes (www.paypal.com) son subdominios que el atacante puede crear libremente. PayPal solo opera desde paypal.com.',
  },
  {
    id: 19,
    url: 'https://www.amazon.com/-/es/gp/help/customer/display.html',
    isLegitimate: true,
    signals: [
      'Dominio real de Amazon',
      'Ruta larga pero en dominio legítimo',
      '/-/es/ indica la versión en español',
    ],
    explanation:
      'amazon.com es el dominio real. Las URLs de Amazon suelen ser largas y complejas — eso es normal. Lo importante es que el dominio base sea correcto.',
  },
  {
    id: 20,
    url: 'https://amazon-cl.shop/oferta-exclusiva-50-descuento',
    isLegitimate: false,
    signals: [
      'El dominio es amazon-cl.shop, no amazon.com',
      'Amazon no usa extensión .shop',
      '"Oferta exclusiva 50% descuento" es un gancho típico',
      'Amazon Chile opera desde amazon.com/-/es/',
    ],
    explanation:
      'Amazon no opera desde dominios con extensión .shop ni con guiones. Amazon para Chile es amazon.com con localización en español. Las "ofertas exclusivas" en dominios falsos son estafas.',
  },
]
