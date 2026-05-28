import type { VerticalContent } from './types';

export const salonesDeUnas: VerticalContent = {
  slug: 'salones-de-unas',
  meta: {
    title: 'Solución para salones de uñas en México — agenda y confirma citas | agendallena',
    description:
      'Solución que confirma citas de salones de uñas en automático por SMS, WhatsApp y llamada. Menos lugares vacíos. $199 MXN/mes. Prueba gratis.',
  },
  hero: {
    eyebrow: 'Para salones de uñas',
    h1: 'Tu tiempo es demasiado exacto para un lugar vacío',
    subtitle:
      'agendallena confirma a tus clientas antes de su cita. Sin huecos sin aviso, sin lugar preparado que nadie aprovechó.',
  },
  problema: {
    cards: [
      {
        title: 'La clienta no llegó',
        description:
          'Separó lugar para el jueves, confirmaste por WhatsApp, preparaste todo. Llegó la hora y no apareció. El lugar vacío, tú esperando.',
      },
      {
        title: 'La agenda es un caos',
        description:
          'Tres nailistas, dos turnos, y cada quien maneja sus citas por WhatsApp personal. No sabes si el sábado hay lugar libre hasta que preguntas a cada una.',
      },
      {
        title: 'El material ya estaba separado',
        description:
          'El gel elegido, el diseño acordado, el tiempo bloqueado. La clienta que cancela a última hora no devuelve nada de eso.',
      },
    ],
  },
  testimonials: {
    heading: 'Salones que dejaron de tener lugares vacíos.',
    items: [
      {
        quote:
          'Antes perdía dos o tres citas a la semana sin aviso. Ahora la clienta confirma sola y el lugar siempre está ocupado.',
        name: 'Sofía Ramos',
        role: 'Salón de uñas, CDMX',
        initials: 'SR',
        avatarStyle: 'green',
      },
      {
        quote:
          'Ya no tengo que estar persiguiendo a nadie por WhatsApp. El sistema lo hace solo y yo me entero cuando alguien confirma o cancela.',
        name: 'Karla Gutiérrez',
        role: 'Nail studio, Monterrey',
        initials: 'KG',
        avatarStyle: 'dark',
      },
      {
        quote:
          'Mis nailistas saben exactamente cuántas clientas llegan. Eso les permite organizarse sin estar preguntando a cada rato.',
        name: 'Paulina Soto',
        role: 'Salón, Guadalajara',
        initials: 'PS',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Salones de uñas y nail studios',
    serviceType: 'Software de gestión de citas para salón de uñas',
  },
  smsContext: 'en Nail Studio MX',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">salón de uñas</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona si cada nailista maneja su agenda por separado?',
        answer:
          'Sí. <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> confirma cada cita de forma independiente, sin importar quién la agendó. No necesitas centralizar la agenda — el sistema trabaja con lo que ya tienes.',
      },
      {
        question: '¿Puedo cobrar depósito antes de confirmar la cita?',
        answer:
          'La confirmación automática se encarga de que la clienta responda antes del día. Si quieres cobrar depósito, puedes pedirlo por separado al agendar — agendallena se ocupa de que la clienta llegue, tú decides tus políticas de pago.',
      },
    ],
  },
  finalCta: {
    heading: 'Un lugar vacío es ingreso que no vuelve.',
    body: 'Cada cita que se pierde sin aviso es gel separado, diseño acordado y tiempo bloqueado sin retorno. agendallena confirma cada clienta antes del día — para que cuando abras el salón, ya sepas quién llega.',
  },
  comparison: {
    competitor: {
      name: 'Fresha',
      rows: ['check', 'check', 'x', 'x', 'check', 'check', 'dash'],
    },
  },
};
