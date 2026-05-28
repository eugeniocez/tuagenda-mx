import type { VerticalContent } from './types';

export const nutriologos: VerticalContent = {
  slug: 'nutriologos',
  meta: {
    title: 'Solución para nutriólogos en México — agenda y confirma consultas | agendallena',
    description:
      'Solución que confirma consultas de nutriólogos en automático por SMS, WhatsApp y llamada. Menos seguimientos interrumpidos. $199 MXN/mes. Prueba gratis.',
  },
  hero: {
    eyebrow: 'Para nutriólogos',
    h1: 'El seguimiento que preparaste necesita que tu paciente aparezca',
    subtitle:
      'agendallena confirma a tus pacientes antes de cada consulta. Sin seguimientos que se cortan, sin proceso interrumpido.',
  },
  problema: {
    cards: [
      {
        title: 'El paciente no llegó a la consulta',
        description:
          'Revisaste su historial, preparaste el seguimiento, reservaste el tiempo. A la hora indicada, no apareció. La consulta, el avance y el ingreso se fueron.',
      },
      {
        title: 'El seguimiento mensual se rompe',
        description:
          'Un plan de alimentación funciona con constancia. Cuando el paciente falta sin avisar, pierde su seguimiento — y tú pierdes el tiempo.',
      },
      {
        title: 'El recordatorio no basta',
        description:
          'Le mandaste WhatsApp el día antes. Vio el mensaje. No contestó. Y al día siguiente ya era tarde para reagendar o llenar el espacio.',
      },
    ],
  },
  testimonials: {
    heading: 'Nutriólogos que dejaron de perder consultas de seguimiento.',
    items: [
      {
        quote:
          'Mis pacientes de seguimiento mensual antes faltaban sin avisar. Ahora confirman solos y el plan no se interrumpe.',
        name: 'Nut. Carmen Salazar',
        role: 'Consultoría nutricional, CDMX',
        initials: 'CS',
        avatarStyle: 'green',
      },
      {
        quote:
          'Lo que más me gustó es la llamada automática si el paciente no responde el SMS. Antes esa llamada la tenía que hacer yo entre consultas.',
        name: 'Nut. Jorge Medina',
        role: 'Nutrición, Monterrey',
        initials: 'JM',
        avatarStyle: 'dark',
      },
      {
        quote:
          'Mis pacientes llegan más motivados cuando reciben el recordatorio. Se preparan para la consulta y el tiempo se aprovecha mejor.',
        name: 'Nut. Lucía Peña',
        role: 'Consultorio, Guadalajara',
        initials: 'LP',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Nutriólogos y consultorios de nutrición',
    serviceType: 'Software de gestión de consultas para nutriólogos',
  },
  smsContext: 'con tu nutriólogo',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">consultorio</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona para consultas de seguimiento mensual?',
        answer:
          'Sí. Cada consulta agendada, sin importar la frecuencia, recibe su recordatorio automático 24 horas antes. <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> mantiene el seguimiento con tus pacientes sin que tengas que recordarlo manualmente.',
      },
      {
        question: '¿Mis pacientes pueden reagendar sin tener que llamarme?',
        answer:
          'Sí. Si un paciente responde que quiere reagendar, recibe un link directo a tu WhatsApp con un mensaje prellenado. Tú coordinas el nuevo horario sin tener que buscar el historial de la conversación.',
      },
    ],
  },
  finalCta: {
    heading: 'Una consulta perdida interrumpe el plan — y es ingreso que no vuelve.',
    body: 'Cada paciente que no se presenta es seguimiento interrumpido, tiempo perdido e ingreso sin retorno. agendallena confirma cada consulta antes del día — para que cuando llegues al consultorio, ya sepas con quién trabajas.',
  },
  comparison: {
    competitor: {
      name: 'Doctoralia',
      rows: ['check', 'check', 'x', 'x', 'check', 'x', 'check'],
    },
  },
};
