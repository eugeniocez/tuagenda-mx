import type { VerticalContent } from './types';

export const despachosLegales: VerticalContent = {
  slug: 'despachos-legales',
  meta: {
    title: 'Solución para despachos legales en México — confirma consultas | agendallena',
    description:
      'Solución que confirma consultas jurídicas en automático por SMS, WhatsApp y llamada. Menos horas de asesoría perdidas. $199 MXN/mes. Prueba gratis.',
  },
  hero: {
    eyebrow: 'Para despachos legales',
    h1: 'La hora de consultoría no puede irse sin facturarse',
    subtitle:
      'agendallena confirma a tus clientes antes de cada consulta. Sin reuniones que no ocurren, sin horas de asesoría perdidas.',
  },
  problema: {
    cards: [
      {
        title: 'El cliente no llegó a la consulta',
        description:
          'Agendó para el martes, quedaron de verse en el despacho. A la hora indicada, nadie llegó. Una hora de asesoría, facturada o no, ya se fue.',
      },
      {
        title: 'La agenda tiene compromisos inciertos',
        description:
          'Cuatro consultas esta semana, dos sin confirmar, una reagendada. No sabes cuáles van a caer hasta que llega el día.',
      },
      {
        title: 'El seguimiento cae en ti',
        description:
          'Mandas el recordatorio el día antes entre audiencias y redacciones. El cliente responde a medias. Tú das seguimiento mientras atiendes lo urgente.',
      },
    ],
  },
  testimonials: {
    heading: 'Despachos que dejaron de perder horas de consulta.',
    items: [
      {
        quote:
          'Antes tenía clientes que simplemente no llegaban. Ahora confirman solos el día anterior y puedo planear la semana con certeza.',
        name: 'Lic. Alejandro Vega',
        role: 'Despacho jurídico, CDMX',
        initials: 'AV',
        avatarStyle: 'green',
      },
      {
        quote:
          'Mi secretaria dejó de perseguir clientes por teléfono. El sistema manda el recordatorio automático y ella se concentra en lo que importa.',
        name: 'Lic. Rebeca Ibáñez',
        role: 'Consultoría legal, Monterrey',
        initials: 'RI',
        avatarStyle: 'dark',
      },
      {
        quote:
          'Los clientes llegan más preparados cuando reciben el recordatorio. La consulta se aprovecha mejor y la relación mejora.',
        name: 'Lic. Carlos Durán',
        role: 'Despacho, Guadalajara',
        initials: 'CD',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Despachos legales y consultorios jurídicos',
    serviceType: 'Software de gestión de consultas para despacho legal',
  },
  smsContext: 'con tu despacho',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">despacho</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿El sistema es discreto para clientes que requieren confidencialidad?',
        answer:
          'Sí. El mensaje de confirmación solo incluye la fecha, la hora y el nombre del despacho — sin detalles del caso ni información sensible. <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> confirma la asistencia, no revela el motivo de la consulta.',
      },
      {
        question: '¿Funciona si tenemos secretaria que agenda las consultas?',
        answer:
          'Sí, y de hecho es donde más ayuda. Tu secretaria sigue agendando como siempre — <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> se encarga de confirmar cada consulta automáticamente. No necesita cambiar su flujo de trabajo.',
      },
    ],
  },
  finalCta: {
    heading: 'Una hora de consulta no usada es ingreso que no vuelve.',
    body: 'Cada cliente que no se presenta es preparación, tiempo y agenda perdidos. agendallena confirma cada consulta antes del día — para que cuando llegues al despacho, ya sepas con qué agenda cuentas.',
  },
  comparison: {
    competitor: {
      name: 'Calendly',
      rows: ['check', 'check', 'x', 'x', 'x', 'x', 'x'],
    },
  },
};
