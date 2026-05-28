import type { VerticalContent } from './types';

export const tatuadores: VerticalContent = {
  slug: 'tatuadores',
  meta: {
    title: 'Solución para tatuadores en México — agenda y confirma sesiones | agendallena',
    description:
      'Solución que confirma sesiones de tatuaje en automático por SMS, WhatsApp y llamada. Menos sesiones perdidas. $199 MXN/mes. Prueba gratis.',
  },
  hero: {
    eyebrow: 'Para tatuadores',
    h1: 'Horas de diseño y preparación que alguien tiene que aprovechar',
    subtitle:
      'agendallena confirma a tus clientes antes de cada sesión. Sin prep para nadie, sin horas de trabajo perdidas por un plantón.',
  },
  problema: {
    cards: [
      {
        title: 'El cliente no llegó',
        description:
          'Diseño listo, tinta separada, tiempo bloqueado para la sesión. El cliente simplemente no apareció. Y no es la primera vez.',
      },
      {
        title: 'El depósito no compensa',
        description:
          'El anticipo cubre una parte. No cubre las horas que preparaste el diseño, el tiempo que bloqueaste ni el cliente que no pudiste agendar en ese espacio.',
      },
      {
        title: 'El mensaje se quedó en visto',
        description:
          'Le escribiste el día antes para confirmar. Vio el mensaje, no contestó. Y tú no sabes si llegará hasta que pasan cinco minutos de la hora.',
      },
    ],
  },
  testimonials: {
    heading: 'Tatuadores que dejaron de tener sesiones perdidas.',
    items: [
      {
        quote:
          'Antes llegaba al estudio sin saber si el cliente venía. Ahora llego sabiendo. Eso solo cambió cómo arranco el día.',
        name: 'Oscar Lozano',
        role: 'Estudio de tatuaje, CDMX',
        initials: 'OL',
        avatarStyle: 'green',
      },
      {
        quote:
          'Mis clientes confirman el día anterior. Si no pueden, avisan con tiempo y puedo llenar el espacio. Antes eso no pasaba.',
        name: 'Alejandro Cruz',
        role: 'Tattoo studio, Monterrey',
        initials: 'AC',
        avatarStyle: 'dark',
      },
      {
        quote:
          'La llamada automática cuando el cliente no responde el SMS es lo que más me ayudó. Antes esa llamada la hacía yo entre preparaciones.',
        name: 'Sebastián Mora',
        role: 'Estudio, Guadalajara',
        initials: 'SM',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Tatuadores y estudios de tatuaje',
    serviceType: 'Software de gestión de citas para tatuadores',
  },
  smsContext: 'con tu tatuador',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">estudio</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona si manejo sesiones de varias horas?',
        answer:
          'Sí. <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> confirma la sesión completa, sin importar la duración. El cliente recibe el recordatorio 24 horas antes y la llamada automática si no responde — para que sepas si el bloque de tiempo está confirmado.',
      },
      {
        question: '¿El cliente puede reagendar desde el mensaje de confirmación?',
        answer:
          'Sí. Si un cliente responde que quiere reagendar, recibe un link directo a tu WhatsApp con un mensaje prellenado. Tú coordinas el nuevo horario sin tener que buscar el historial de la conversación.',
      },
    ],
  },
  finalCta: {
    heading: 'Una sesión perdida son horas de preparación que no vuelven.',
    body: 'Cada cliente que no llega es diseño preparado, tiempo bloqueado e ingreso sin retorno. agendallena confirma cada sesión antes del día — para que cuando llegues al estudio, ya sepas quién te espera.',
  },
  comparison: {
    competitor: {
      name: 'Fresha',
      rows: ['check', 'check', 'x', 'x', 'check', 'check', 'dash'],
    },
  },
};
