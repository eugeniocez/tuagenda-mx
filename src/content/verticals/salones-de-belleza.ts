import type { VerticalContent } from './types';

export const salonesDeBelleza: VerticalContent = {
  slug: 'salones-de-belleza',
  meta: {
    title: 'Solución para salones de belleza — agenda y confirma citas | agendallena',
    description:
      'Solución que confirma citas de salones de belleza en automático por SMS, WhatsApp y llamada. Sin huecos sin aviso, sin cancelaciones de último momento. $199 MXN/mes.',
  },
  hero: {
    eyebrow: 'Para salones de belleza',
    h1: 'Sin clientas que no llegan. Sin tiempo de trabajo perdido.',
    subtitle:
      'agendallena avisa y confirma a tus clientas antes de su cita. Sin correr para rellenar el horario, sin materiales listos para nadie.',
  },
  problema: {
    cards: [
      {
        title: 'El hueco de último momento',
        description:
          'Te cancelan a las 9 AM y ya no hay tiempo para llenar el espacio. Ese hueco te cuesta entre $300 y $800 pesos directos.',
      },
      {
        title: 'El WhatsApp del salón',
        description:
          'Tienes 40 conversaciones abiertas. Las confirmaciones se confunden con preguntas de precio, fotos de referencia y todo lo demás.',
      },
      {
        title: 'El día que no cuadra',
        description:
          'Organizaste tu horario contando con que todas llegarían. Siempre hay una que no. Y siempre te toma por sorpresa.',
      },
    ],
  },
  testimonials: {
    heading: 'Salones que llenaron su agenda y la mantienen llena.',
    items: [
      {
        quote:
          'Antes mi lunes empezaba con incertidumbre. Ahora sé exactamente quién llega y puedo preparar todo. Las clientas también llegan más puntuales.',
        name: 'Daniela Cruz',
        role: 'Salón de belleza, CDMX',
        initials: 'DC',
        avatarStyle: 'green',
      },
      {
        quote:
          'La solución manda el recordatorio sola. Las clientas confirman, y yo no tengo que estar pegada al teléfono entre clientes.',
        name: 'Mónica Reyes',
        role: 'Estilista independiente, Monterrey',
        initials: 'MR',
        avatarStyle: 'dark',
      },
      {
        quote:
          'Llenamos los espacios cancelados mucho más rápido. Las clientas saben que hay lista de espera y agendallena lo coordina solo.',
        name: 'Pamela Lagos',
        role: 'Salón & spa, Guadalajara',
        initials: 'PL',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Salones de belleza, estilistas y centros de estética',
    serviceType: 'Software de gestión de citas para salones de belleza',
  },
  smsContext: 'en Ponte Bella',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">salón</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona si tengo varios estilistas o sillas?',
        answer:
          'Sí. Puedes agendar citas para cada estilista por separado. El calendario distingue quién atiende cada cita y los recordatorios van al cliente con los datos correctos. Si tienes 3 sillas, controlas las 3 desde la misma cuenta.',
      },
      {
        question: '¿Mis clientas pueden reservar directamente desde su teléfono?',
        answer:
          'Por ahora las citas las creas tú directamente en <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> — no hay portal público de reservas. Es una decisión deliberada: tú mantienes el control sin depender de que la clienta navegue otra app. Lo que sí cambia es que una vez agendada, la confirmación y el recordatorio son automáticos.',
      },
    ],
  },
  finalCta: {
    heading: 'Sin huecos de último momento. Sin correr para rellenar.',
    body: 'Cada cita confirmada es una hora de tu día que ya puedes contar. agendallena avisa, recuerda y confirma sola — para que llegues al salón sabiendo exactamente cómo va el día.',
  },
  comparison: {
    competitor: {
      name: 'AgendaPro',
      rows: ['check', 'check', 'x', 'x', 'check', 'check', 'check'],
    },
  },
};
