export interface PhishingEmail {
  id: number
  from: string
  subject: string
  body: string
  isPhishing: boolean
  signals: string[]
  explanation: string
}

export const emails: PhishingEmail[] = [
  {
    id: 1,
    from: 'seguridad@banco-estado.cl.secure-verify.com',
    subject: 'URGENTE: Tu cuenta será bloqueada en 24 horas',
    body: `Estimado cliente,

Hemos detectado actividad inusual en su cuenta. Si no verifica su identidad en las próximas 24 horas, su cuenta será suspendida permanentemente.

Haga clic aquí para verificar su identidad: https://banco-estado.cl.secure-verify.com/verificar

Atentamente,
Equipo de Seguridad BancoEstado`,
    isPhishing: true,
    signals: [
      'El dominio real es secure-verify.com, no banco-estado.cl',
      'Urgencia artificial (24 horas)',
      'Amenaza de bloqueo permanente',
      'El enlace lleva a un dominio falso',
    ],
    explanation:
      'Este correo usa un subdominio engañoso: parece de BancoEstado, pero el dominio real es secure-verify.com. Ningún banco te amenaza con bloquear tu cuenta por correo. Si tienes dudas, entra directo a bancoestado.cl desde tu navegador.',
  },
  {
    id: 2,
    from: 'noreply@google.com',
    subject: 'Alerta de seguridad: nuevo inicio de sesión',
    body: `Hola:

Se inició sesión en tu Cuenta de Google en un dispositivo nuevo.

Dispositivo: Windows (Chrome)
Ubicación: Santiago, Chile
Hora: 29 de julio de 2026, 14:32 (hora local)

Si fuiste tú, no necesitas hacer nada.
Si no fuiste tú, revisa la actividad de tu cuenta en https://myaccount.google.com/security

— El equipo de Google`,
    isPhishing: false,
    signals: [
      'El remitente es noreply@google.com (dominio legítimo)',
      'El enlace apunta al dominio real de Google',
      'No hay urgencia ni amenaza',
      'No pide contraseña ni datos personales',
    ],
    explanation:
      'Este es un correo real de Google. Tiene el dominio correcto, no te pide contraseña, y el enlace va directo a myaccount.google.com. Google realmente envía estas alertas cuando detecta un inicio de sesión nuevo.',
  },
  {
    id: 3,
    from: 'soporte@netfl1x-billing.com',
    subject: 'Problema con tu método de pago — actualiza tus datos',
    body: `Hola,

No pudimos procesar tu último pago. Tu suscripción será cancelada si no actualizas tu método de pago antes del 31 de julio.

Actualiza tu pago aquí: https://netfl1x-billing.com/actualizar-pago

Si no resuelves esto, perderás acceso a tu cuenta y todo tu historial.

Equipo de Netflix`,
    isPhishing: true,
    signals: [
      'El dominio es netfl1x-billing.com (con un 1 en vez de i)',
      'Amenaza de perder "todo tu historial"',
      'Urgencia con fecha límite',
      'Netflix no envía correos desde ese dominio',
    ],
    explanation:
      'El dominio usa un 1 en lugar de una i (netfl1x). Es una técnica clásica de typosquatting. Netflix nunca te amenaza con perder tu historial, y si hay un problema de pago real, lo ves directamente en netflix.com/account.',
  },
  {
    id: 4,
    from: 'contacto@mercadolibre.cl',
    subject: 'Tu compra #4892-7731 fue enviada',
    body: `Hola,

Tu compra fue despachada. Aquí están los detalles:

Producto: Audífonos Bluetooth JBL Tune 510BT
Número de seguimiento: CL9284710283
Entrega estimada: 1-3 días hábiles

Puedes seguir tu envío en: https://mercadolibre.cl/tracking/CL9284710283

¿Necesitas ayuda? Escríbenos desde la app.

— Mercado Libre`,
    isPhishing: false,
    signals: [
      'El remitente usa el dominio real mercadolibre.cl',
      'El enlace apunta al dominio real',
      'No pide datos personales ni contraseña',
      'Tono neutro, sin urgencia ni amenaza',
    ],
    explanation:
      'Este es un correo legítimo de Mercado Libre. Usa el dominio correcto, tiene un número de seguimiento, no te pide datos, y te dirige a la plataforma real. Si no hiciste la compra, revisa tu cuenta directamente en la app.',
  },
  {
    id: 5,
    from: 'rrhh-empresa@outlook.com',
    subject: 'Bono de fin de año — confirma tus datos bancarios',
    body: `Estimado/a colaborador/a:

La empresa confirmó un bono extraordinario de $150.000 para todos los funcionarios. Para depositarlo necesitamos que confirmes tus datos bancarios.

Por favor responde este correo con:
- Nombre completo
- RUT
- Número de cuenta
- Banco

Tienes plazo hasta el viernes.

Saludos,
Recursos Humanos`,
    isPhishing: true,
    signals: [
      'Usa un correo genérico de Outlook, no el dominio de la empresa',
      'Pide datos bancarios por correo (ninguna empresa real hace esto)',
      'Plazo corto para presionar',
      'No menciona el nombre de la empresa ni del empleado',
    ],
    explanation:
      'Ninguna empresa legítima pide datos bancarios por correo electrónico — ya los tiene en su sistema. Este correo viene de un Outlook genérico, no del dominio corporativo, y no te llama por tu nombre. Es ingeniería social pura.',
  },
  {
    id: 6,
    from: 'alertas@servel.cl',
    subject: 'Confirmación de tu cambio de domicilio electoral',
    body: `Estimado/a ciudadano/a:

Se ha registrado correctamente tu cambio de domicilio electoral en el sistema del Servel.

Nuevo local de votación: Escuela Municipal N°42, Providencia
Próxima elección: 15 de noviembre de 2026

Si no solicitaste este cambio, puedes revisarlo en https://www.servel.cl/consulta-de-datos-electorales/

Servicio Electoral de Chile`,
    isPhishing: false,
    signals: [
      'Dominio real del Servel (servel.cl)',
      'Enlace al sitio oficial del Servel',
      'No pide datos personales',
      'Información específica y verificable',
    ],
    explanation:
      'El Servel realmente envía confirmaciones cuando cambias tu domicilio electoral. El enlace va al sitio oficial, no te pide contraseña, y te da información que puedes verificar directamente. Si no hiciste el cambio, el mismo enlace te permite revisarlo.',
  },
  {
    id: 7,
    from: 'premio-ganador@apple-store.promo-oficial.net',
    subject: '¡Felicidades! Has ganado un iPhone 16 Pro',
    body: `¡FELICIDADES!

Tu correo fue seleccionado entre 10.000 participantes para recibir un iPhone 16 Pro GRATIS.

Para reclamar tu premio, solo necesitas pagar el envío ($4.990):
https://apple-store.promo-oficial.net/reclamar-premio

IMPORTANTE: Esta oferta expira en 2 horas.

Equipo Apple Store`,
    isPhishing: true,
    signals: [
      'El dominio real es promo-oficial.net, no Apple',
      'Premios que no pediste = estafa',
      'Pide un pago para "reclamar" algo gratis',
      'Urgencia extrema (2 horas)',
      'Uso excesivo de mayúsculas y signos de exclamación',
    ],
    explanation:
      'Nadie regala iPhones por correo. Apple no hace sorteos así. El dominio real es promo-oficial.net (no apple.com), y te piden pagar para recibir algo "gratis". Es una estafa clásica de premio falso.',
  },
  {
    id: 8,
    from: 'no-reply@spotify.com',
    subject: 'Tu recibo de Spotify Premium — julio 2026',
    body: `Hola,

Gracias por ser Premium. Aquí está tu recibo:

Plan: Spotify Premium Individual
Período: 1 jul 2026 – 31 jul 2026
Cobro: $5.490 CLP
Método: Visa terminada en 8421

Puedes ver tu historial de pagos en tu cuenta: https://www.spotify.com/account/subscription/

¿Preguntas? Visita https://support.spotify.com

Spotify`,
    isPhishing: false,
    signals: [
      'Dominio real de Spotify (spotify.com)',
      'No pide acción urgente',
      'Información específica del plan y monto',
      'Enlaces al dominio real',
      'Tono neutro e informativo',
    ],
    explanation:
      'Este es un recibo legítimo de Spotify. Viene del dominio correcto, tiene datos específicos de tu plan, no te pide hacer nada urgente, y todos los enlaces van a spotify.com. Si no reconoces el cobro, revisa directo en tu cuenta.',
  },
  {
    id: 9,
    from: 'soporte-whatsapp@mail.com',
    subject: 'Tu cuenta de WhatsApp será eliminada — verifica ahora',
    body: `Estimado usuario de WhatsApp,

Hemos detectado que tu cuenta viola nuestras políticas de uso. Si no verificas tu identidad en 48 horas, tu cuenta será eliminada permanentemente.

Haz clic aquí para verificar: https://whatsapp-verify-account.com/confirmar

Necesitamos:
- Tu número de teléfono
- El código de verificación que recibirás por SMS

Equipo de Soporte WhatsApp`,
    isPhishing: true,
    signals: [
      'WhatsApp no envía correos desde mail.com',
      'Amenaza de eliminación de cuenta',
      'Pide tu código de verificación SMS (nunca compartas esto)',
      'Enlace a dominio que no es whatsapp.com',
      'WhatsApp se comunica por la app, no por correo',
    ],
    explanation:
      'WhatsApp nunca te contacta por correo electrónico para verificar tu cuenta — todo pasa dentro de la app. Si alguien te pide tu código de verificación SMS, quiere robarte la cuenta. El dominio whatsapp-verify-account.com no tiene nada que ver con WhatsApp.',
  },
  {
    id: 10,
    from: 'facturacion@entel.cl',
    subject: 'Tu boleta electrónica de julio está disponible',
    body: `Hola,

Tu boleta electrónica del período julio 2026 ya está disponible.

Monto: $18.990
Vencimiento: 10 de agosto de 2026
Plan: Entel Full 50GB

Puedes descargarla en Mi Entel: https://www.entel.cl/mi-entel/

Si ya pagaste, ignora este mensaje.

Entel`,
    isPhishing: false,
    signals: [
      'Dominio real de Entel (entel.cl)',
      'Información específica y verificable',
      'No presiona ni amenaza',
      'Enlace al sitio oficial',
      'Ofrece salida: "si ya pagaste, ignora"',
    ],
    explanation:
      'Este es un correo real de Entel. Usa el dominio correcto, tiene datos específicos de tu plan, el enlace va a entel.cl, y no te amenaza con consecuencias. Si dudas del monto, entra directo a Mi Entel desde tu navegador.',
  },
]
