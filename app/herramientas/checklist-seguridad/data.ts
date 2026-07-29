export interface ChecklistItem {
  id: number
  category: string
  question: string
  recommendation: string
  articleLink: string
  articleLabel: string
}

export const items: ChecklistItem[] = [
  {
    id: 1,
    category: 'Contraseñas',
    question: '¿Usas una contraseña distinta para cada cuenta importante?',
    recommendation:
      'Reutilizar contraseñas es el error más peligroso. Si una se filtra, todas tus cuentas quedan expuestas.',
    articleLink: '/prevenir/contrasenas-seguras',
    articleLabel: 'Cómo crear contraseñas seguras',
  },
  {
    id: 2,
    category: 'Contraseñas',
    question: '¿Usas un gestor de contraseñas?',
    recommendation:
      'Un gestor (como Bitwarden o KeePassXC) genera y guarda contraseñas seguras por ti. No necesitas memorizar nada.',
    articleLink: '/prevenir/gestores-de-contrasenas',
    articleLabel: 'Gestores de contraseñas',
  },
  {
    id: 3,
    category: 'Contraseñas',
    question: '¿Tus contraseñas tienen al menos 12 caracteres?',
    recommendation:
      'Las contraseñas cortas se rompen en minutos. 12 caracteres es el mínimo recomendado; 16+ es ideal.',
    articleLink: '/prevenir/contrasenas-seguras',
    articleLabel: 'Cómo crear contraseñas seguras',
  },
  {
    id: 4,
    category: 'Autenticación',
    question: '¿Tienes verificación en dos pasos activada en tu correo principal?',
    recommendation:
      'Tu correo es la llave a todas tus otras cuentas (recuperación de contraseña). Protégelo con 2FA siempre.',
    articleLink: '/prevenir/verificacion-en-dos-pasos',
    articleLabel: 'Verificación en dos pasos',
  },
  {
    id: 5,
    category: 'Autenticación',
    question: '¿Tienes verificación en dos pasos en tus redes sociales?',
    recommendation:
      'Las redes sociales son objetivo frecuente de robo de cuentas. Activa 2FA en todas.',
    articleLink: '/prevenir/verificacion-en-dos-pasos',
    articleLabel: 'Verificación en dos pasos',
  },
  {
    id: 6,
    category: 'Autenticación',
    question: '¿Tienes verificación en dos pasos en WhatsApp?',
    recommendation:
      'WhatsApp permite activar un PIN de 6 dígitos como segunda capa. Sin esto, alguien puede clonar tu cuenta.',
    articleLink: '/guias/whatsapp/seguridad-y-privacidad',
    articleLabel: 'Seguridad en WhatsApp',
  },
  {
    id: 7,
    category: 'Dispositivos',
    question: '¿Tu teléfono tiene bloqueo con PIN, huella o rostro?',
    recommendation:
      'Si te roban el teléfono sin bloqueo, tienen acceso a todo: correo, banco, fotos, mensajes.',
    articleLink: '/reaccionar/me-robaron-el-telefono',
    articleLabel: 'Qué hacer si te robaron el teléfono',
  },
  {
    id: 8,
    category: 'Dispositivos',
    question: '¿Mantienes tu teléfono y computador actualizados?',
    recommendation:
      'Las actualizaciones corrigen vulnerabilidades de seguridad. Postergarlas te deja expuesto a ataques conocidos.',
    articleLink: '/aprender/que-es-la-seguridad-digital',
    articleLabel: 'Qué es la seguridad digital',
  },
  {
    id: 9,
    category: 'Dispositivos',
    question: '¿Sabes cómo encontrar o borrar tu teléfono de forma remota si lo pierdes?',
    recommendation:
      'Configura "Encontrar mi dispositivo" (Android) o "Find My" (iPhone) antes de que pase algo.',
    articleLink: '/reaccionar/me-robaron-el-telefono',
    articleLabel: 'Qué hacer si te robaron el teléfono',
  },
  {
    id: 10,
    category: 'Navegación',
    question: '¿Sabes identificar un sitio web falso antes de poner tus datos?',
    recommendation:
      'Revisa siempre el dominio completo antes de ingresar contraseñas o datos de pago.',
    articleLink: '/reconocer/sitios-peligrosos',
    articleLabel: 'Cómo identificar sitios peligrosos',
  },
  {
    id: 11,
    category: 'Navegación',
    question: '¿Usas un bloqueador de anuncios?',
    recommendation:
      'Los anuncios maliciosos (malvertising) son una fuente real de malware. Un bloqueador como uBlock Origin los elimina.',
    articleLink: '/guias/ublock-origin/instalar-y-configurar',
    articleLabel: 'Cómo instalar uBlock Origin',
  },
  {
    id: 12,
    category: 'Navegación',
    question: '¿Evitas descargar programas de sitios que no son el oficial?',
    recommendation:
      'Descargar software de sitios no oficiales es una de las formas más comunes de infectarse con malware.',
    articleLink: '/aprender/drive-by-download',
    articleLabel: 'Qué es un drive-by download',
  },
  {
    id: 13,
    category: 'Estafas',
    question: '¿Sabes reconocer un correo de phishing?',
    recommendation:
      'El phishing sigue siendo el ataque más efectivo. Aprende a identificar remitentes falsos, urgencia artificial y enlaces engañosos.',
    articleLink: '/reconocer/phishing',
    articleLabel: 'Cómo detectar phishing',
  },
  {
    id: 14,
    category: 'Estafas',
    question: '¿Desconfías de mensajes que te piden actuar urgentemente?',
    recommendation:
      'La urgencia es la herramienta principal de los estafadores. Si te presionan, detente y verifica por otro canal.',
    articleLink: '/reconocer/estafas-por-whatsapp',
    articleLabel: 'Estafas por WhatsApp',
  },
  {
    id: 15,
    category: 'Estafas',
    question:
      '¿Verificas por otro canal antes de transferir dinero a alguien que te escribe por mensaje?',
    recommendation:
      'Los estafadores se hacen pasar por familiares o amigos. Antes de transferir, llama o verifica en persona.',
    articleLink: '/reconocer/estafas-por-whatsapp',
    articleLabel: 'Estafas por WhatsApp',
  },
  {
    id: 16,
    category: 'Privacidad',
    question: '¿Revisas los permisos que piden las apps antes de instalarlas?',
    recommendation:
      'Una app de linterna no necesita acceso a tu cámara ni contactos. Permisos excesivos son señal de alerta.',
    articleLink: '/aprender/que-es-la-seguridad-digital',
    articleLabel: 'Qué es la seguridad digital',
  },
  {
    id: 17,
    category: 'Privacidad',
    question: '¿Sabes qué datos compartes con servicios de IA como ChatGPT o Gemini?',
    recommendation:
      'Todo lo que escribes en un chat de IA puede ser usado para entrenar el modelo. No compartas datos sensibles.',
    articleLink: '/prevenir/privacidad-e-inteligencia-artificial',
    articleLabel: 'Privacidad e inteligencia artificial',
  },
  {
    id: 18,
    category: 'Privacidad',
    question: '¿Usas una VPN cuando te conectas a redes Wi-Fi públicas?',
    recommendation:
      'En redes públicas (cafés, aeropuertos) tu tráfico puede ser interceptado. Una VPN lo cifra todo.',
    articleLink: '/prevenir/vpn',
    articleLabel: 'Qué es una VPN y cuándo usarla',
  },
  {
    id: 19,
    category: 'Respaldo',
    question: '¿Tienes respaldo de tus fotos y documentos importantes?',
    recommendation:
      'Si te roban el teléfono o falla un disco, sin respaldo lo pierdes todo. Usa nube o disco externo.',
    articleLink: '/aprender/que-es-la-seguridad-digital',
    articleLabel: 'Qué es la seguridad digital',
  },
  {
    id: 20,
    category: 'Respaldo',
    question: '¿Sabes qué hacer si te hackean una cuenta?',
    recommendation:
      'Tener un plan reduce el pánico y el daño. Los primeros minutos son los más importantes.',
    articleLink: '/reaccionar/me-hackearon-una-cuenta',
    articleLabel: 'Qué hacer si te hackearon una cuenta',
  },
]
