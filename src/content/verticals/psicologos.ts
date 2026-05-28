import type { VerticalContent } from './types';

export const psicologos: VerticalContent = {
  slug: 'psicologos',
  meta: {
    title: 'Solución para psicólogos — agenda y confirma sesiones | agendallena',
    description:
      'Solución que confirma sesiones de psicólogos en automático por SMS, WhatsApp y llamada. Menos ausencias, sin interrumpir tu consulta. $199 MXN/mes.',
  },
  hero: {
    eyebrow: 'Para psicólogos y terapeutas',
    h1: 'La sesión que preparaste no puede perderse por falta de confirmación',
    subtitle:
      'agendallena confirma a tus pacientes antes de cada sesión. Sin interrumpir tu consulta, sin sesiones vacías, sin perseguir a nadie.',
  },
  problema: {
    cards: [
      {
        title: 'El aviso no llegó',
        description:
          'Tu paciente leyó el mensaje y pensó "lo confirmo después". Después llegó tarde. La sesión, no.',
      },
      {
        title: 'La espera sin saber',
        description:
          'Llegar a tu consultorio sin saber si tu primera sesión se va a presentar es un inicio de día que desgasta.',
      },
      {
        title: 'Una sesión son 50 minutos',
        description:
          'Cada hora vacía en tu agenda es una pérdida que no se recupera. Solo con confirmación automática se puede prevenir.',
      },
    ],
  },
  testimonials: {
    heading: 'Psicólogos que recuperaron sesiones perdidas.',
    items: [
      {
        quote:
          'Mis pacientes confirman solos. El recordatorio les llega en el momento justo y yo no tengo que interrumpir mi día para hacer seguimiento.',
        name: 'Mtra. Valeria Soto',
        role: 'Psicología clínica, CDMX',
        initials: 'VS',
        avatarStyle: 'green',
      },
      {
        quote:
          'Lo que más valoro es que la solución respeta la discreción de mis pacientes. Reciben un SMS, confirman, y listo. Sin llamadas incómodas.',
        name: 'Dr. Iván Mendoza',
        role: 'Terapia individual, Monterrey',
        initials: 'IM',
        avatarStyle: 'dark',
      },
      {
        quote:
          'Pasé de 3 ausencias semanales a casi ninguna. Para consulta privada, eso es muy significativo.',
        name: 'Lic. Andrea Fuentes',
        role: 'Psicóloga, Guadalajara',
        initials: 'AF',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Psicólogos, terapeutas y consultorios de salud mental',
    serviceType: 'Software de gestión de sesiones de psicología',
  },
  smsContext: 'con la psicóloga Soto',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">consulta</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿El mensaje respeta la privacidad del paciente?',
        answer:
          'Completamente. El SMS solo menciona la fecha, la hora y el nombre del consultorio — sin mencionar el tipo de servicio ni ningún dato sensible. Está diseñado para ser discreto. El paciente confirma sin exponer información personal.',
      },
      {
        question: '¿Puedo usarlo si mis sesiones tienen horario variable?',
        answer:
          'Sí. Cada cita se agenda de forma individual con su propia fecha y hora. Si un paciente tiene sesión cada martes a las 6 PM, simplemente repites el proceso cada semana. No hay horarios fijos que configurar.',
      },
    ],
  },
  finalCta: {
    heading: 'Tu agenda, sin el desgaste de perseguir pacientes.',
    body: 'Una sesión perdida no es solo ingreso que se va — es tiempo de tu jornada que no se recupera. agendallena confirma cada sesión antes de que llegue el día, en silencio, sin interrumpir tu flujo de trabajo.',
  },
  comparison: {
    competitor: {
      name: 'Doctoralia',
      rows: ['check', 'check', 'x', 'x', 'check', 'x', 'check'],
    },
  },
};
