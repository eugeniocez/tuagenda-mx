import type { VerticalContent } from './types';

export const entrenadoresPersonales: VerticalContent = {
  slug: 'entrenadores-personales',
  meta: {
    title: 'Solución para entrenadores personales en México — confirma sesiones | agendallena',
    description:
      'Solución que confirma sesiones de entrenamiento en automático por SMS, WhatsApp y llamada. Menos sesiones perdidas. $199 MXN/mes. Prueba gratis.',
  },
  hero: {
    eyebrow: 'Para entrenadores personales',
    h1: 'La sesión que diseñaste tiene que suceder',
    subtitle:
      'agendallena avisa y confirma a tus clientes antes de cada sesión. Sin esperar a alguien que no llega, sin horas de entrenamiento perdidas.',
  },
  problema: {
    cards: [
      {
        title: 'El cliente no apareció',
        description:
          'Reservó sesión para las 7 am, preparaste la rutina, llegaste al gimnasio. El cliente simplemente no vino. Y la hora ya no vuelve.',
      },
      {
        title: 'El horario se mueve tarde',
        description:
          'Cinco clientes, tres días, horarios distintos. Cuando uno cancela a destiempo, ya es tarde para llenar ese espacio. La hora se va vacía.',
      },
      {
        title: 'El mensaje se vio',
        description:
          'Mandaste el recordatorio por WhatsApp. Lo vio, no contestó. A la hora de la sesión, nada. El "ay sí, se me fue" ya no alcanza.',
      },
    ],
  },
  testimonials: {
    heading: 'Entrenadores que dejaron de perder sesiones.',
    items: [
      {
        quote:
          'Antes llegaba al gimnasio sin saber si el cliente iba a venir. Ahora llego sabiendo exactamente quién me espera.',
        name: 'Rodrigo Martínez',
        role: 'Entrenador personal, CDMX',
        initials: 'RM',
        avatarStyle: 'green',
      },
      {
        quote:
          'Dejé de mandar recordatorios por WhatsApp a cada cliente. El sistema lo hace solo y mis clientes confirman antes del día.',
        name: 'Fernanda Ríos',
        role: 'Entrenadora, Monterrey',
        initials: 'FR',
        avatarStyle: 'dark',
      },
      {
        quote:
          'Mis clientes dicen que les gusta recibir el recordatorio automático. Menos excusas de "se me olvidó" — y yo cobro mis sesiones completas.',
        name: 'Diego López',
        role: 'Personal trainer, Guadalajara',
        initials: 'DL',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Entrenadores personales y coaches fitness',
    serviceType: 'Software de gestión de sesiones para entrenador personal',
  },
  smsContext: 'con tu entrenador',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">agenda de sesiones</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona si entreno en distintos gimnasios o a domicilio?',
        answer:
          'Sí. <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> confirma la sesión sin importar dónde sea. El cliente recibe el recordatorio y confirma — tú decides el lugar y los detalles de cada sesión como siempre.',
      },
      {
        question: '¿Mis clientes necesitan instalar alguna aplicación?',
        answer:
          'No. El cliente recibe un SMS o llamada directamente a su número. No necesita descargar nada, crear cuenta ni aprender a usar ninguna plataforma. Solo responde al mensaje y la cita queda confirmada.',
      },
    ],
  },
  finalCta: {
    heading: 'Una sesión perdida es tiempo y energía que no vuelven.',
    body: 'Cada cliente que no aparece es rutina preparada, hora bloqueada e ingreso sin retorno. agendallena confirma cada sesión antes del día — para que cuando llegues al gimnasio, ya sepas quién te está esperando.',
  },
  comparison: {
    competitor: {
      name: 'Mindbody',
      rows: ['check', 'check', 'x', 'x', 'check', 'x', 'x'],
    },
  },
};
