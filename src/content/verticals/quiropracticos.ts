import type { VerticalContent } from './types';

export const quiropracticos: VerticalContent = {
  slug: 'quiropracticos',
  meta: {
    title: 'Solución para quiroprácticos en México — agenda y confirma citas | agendallena',
    description:
      'Solución que confirma citas de quiroprácticos en automático por SMS, WhatsApp y llamada. Menos sesiones perdidas. $199 MXN/mes. Prueba gratis.',
  },
  hero: {
    eyebrow: 'Para quiroprácticos',
    h1: 'El ajuste preparado necesita al paciente que lo pidió',
    subtitle:
      'agendallena avisa y confirma a tus pacientes antes de cada sesión. Sin esperar a alguien que no llega, sin ajuste preparado para nadie.',
  },
  problema: {
    cards: [
      {
        title: 'El paciente no llegó',
        description:
          'Agendó su ajuste para las 10, confirmaste por WhatsApp. A la hora señalada, nadie. La sala lista, el tiempo perdido.',
      },
      {
        title: 'La continuidad se rompe',
        description:
          'El tratamiento quiropráctico necesita constancia. Un paciente que falta sin aviso rompe su protocolo — y tú te quedas con la hora vacía.',
      },
      {
        title: 'El seguimiento cae en ti',
        description:
          'El día antes, entre pacientes, mandas el recordatorio. Algunos contestan, otros no. Tú tienes que rastrear quién confirmó y quién no.',
      },
    ],
  },
  testimonials: {
    heading: 'Quiroprácticos que dejaron de tener horas vacías.',
    items: [
      {
        quote:
          'Antes de agendallena perdía una o dos sesiones a la semana. Ahora los pacientes confirman solos y mi agenda es predecible.',
        name: 'Dr. Samuel Herrera',
        role: 'Quiropráctica, CDMX',
        initials: 'SH',
        avatarStyle: 'green',
      },
      {
        quote:
          'Lo que más me ayudó es la llamada automática cuando el paciente no responde el SMS. Antes esa llamada la tenía que hacer yo.',
        name: 'Dr. Raúl Mendoza',
        role: 'Consultorio, Monterrey',
        initials: 'RM',
        avatarStyle: 'dark',
      },
      {
        quote:
          'Mis pacientes llegan más comprometidos con su tratamiento. El recordatorio automático les recuerda la importancia de la constancia.',
        name: 'Dra. Elena Castro',
        role: 'Quiropráctica, Guadalajara',
        initials: 'EC',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Consultorios quiroprácticos',
    serviceType: 'Software de gestión de citas para quiroprácticos',
  },
  smsContext: 'con tu quiropráctico',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">consultorio</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona si manejo protocolos de varias sesiones por paciente?',
        answer:
          'Sí. Cada cita se confirma de forma independiente. Si un paciente tiene sesiones programadas semanalmente, cada una recibe su recordatorio automático — sin que necesites configurar nada especial por cada paciente.',
      },
      {
        question: '¿Los pacientes pueden reagendar solos desde el mensaje?',
        answer:
          'Sí. Si un paciente responde que quiere reagendar, recibe un link directo a tu WhatsApp con un mensaje prellenado. Tú coordinas el nuevo horario sin tener que buscar el historial de la conversación.',
      },
    ],
  },
  finalCta: {
    heading: 'Una sesión vacía rompe el protocolo — y es ingreso que no vuelve.',
    body: 'Cada paciente que no se presenta es preparación perdida y un tratamiento interrumpido. agendallena confirma cada sesión antes del día — para que cuando llegues al consultorio, ya sepas con quién cuentas.',
  },
  comparison: {
    competitor: {
      name: 'Doctoralia',
      rows: ['check', 'check', 'x', 'x', 'check', 'x', 'check'],
    },
  },
};
