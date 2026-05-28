import type { VerticalContent } from './types';

export const spas: VerticalContent = {
  slug: 'spas',
  meta: {
    title: 'Solución para spas en México — agenda y confirma citas | agendallena',
    description:
      'Solución que confirma reservaciones de spa en automático por SMS, WhatsApp y llamada. Menos cabinas vacías. $199 MXN/mes. Prueba gratis.',
  },
  hero: {
    eyebrow: 'Para spas y centros de bienestar',
    h1: 'La cabina reservada no puede estar vacía',
    subtitle:
      'agendallena confirma a tus clientes antes de su reservación. Sin preparar un servicio para nadie, sin terapeuta esperando sin motivo.',
  },
  problema: {
    cards: [
      {
        title: 'El cliente no llegó',
        description:
          'Agendó masaje para las 4, confirmaste por WhatsApp. Llegó la hora, la terapeuta esperó 20 minutos. La cabina estuvo vacía, el tiempo no vuelve.',
      },
      {
        title: 'La agenda tiene correcciones',
        description:
          'Cuatro tratamientos, tres terapeutas, dos días a la semana. La libreta tiene tachaduras. El viernes no sabes con certeza quién llega.',
      },
      {
        title: 'La terapeuta esperó preparada',
        description:
          '60 minutos de trabajo listo: camilla, aceites, música. El cliente simplemente no apareció. Y eso no tiene reembolso.',
      },
    ],
  },
  testimonials: {
    heading: 'Spas que dejaron de preparar cabinas vacías.',
    items: [
      {
        quote:
          'Antes perdía dos o tres reservaciones a la semana sin aviso. Ahora la solución confirma sola y la cabina casi siempre está ocupada.',
        name: 'Marcela Torres',
        role: 'Spa, Monterrey',
        initials: 'MT',
        avatarStyle: 'green',
      },
      {
        quote:
          'Mis terapeutas ya no esperan sentadas. Saben exactamente cuántas personas llegan y a qué hora. Eso cambió la dinámica del día.',
        name: 'Daniela Fuentes',
        role: 'Centro de bienestar, CDMX',
        initials: 'DF',
        avatarStyle: 'dark',
      },
      {
        quote:
          'Los clientes dicen que es más fácil confirmar con nosotros que con cualquier otro spa. Eso solo ya vale los $199.',
        name: 'Andrea Morales',
        role: 'Spa, Guadalajara',
        initials: 'AM',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Spas y centros de bienestar',
    serviceType: 'Software de gestión de citas para spa',
  },
  smsContext: 'en Spa Serenità',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">spa</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona si tengo varias terapeutas en el spa?',
        answer:
          'Sí. Cada cita se confirma de forma independiente, sin importar cuántas terapeutas tengas. <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> maneja el flujo de confirmación de cada reservación por separado, sin que las terapeutas necesiten hacer nada adicional.',
      },
      {
        question: '¿El cliente puede reagendar desde el SMS de confirmación?',
        answer:
          'Sí. Si un cliente responde que quiere reagendar, recibe un link directo a tu WhatsApp con un mensaje prellenado. Tú o tu recepcionista coordinan el nuevo horario sin buscar el historial de la conversación.',
      },
    ],
  },
  finalCta: {
    heading: 'Una cabina vacía es ingreso que no vuelve.',
    body: 'Cada sesión que se cancela tarde es tiempo preparado, material listo y agenda bloqueada sin retorno. agendallena confirma cada reservación antes de que llegue el día — para que cuando abra el spa, ya sepas cómo va.',
  },
  comparison: {
    competitor: {
      name: 'Fresha',
      rows: ['check', 'check', 'x', 'x', 'check', 'check', 'dash'],
    },
  },
};
