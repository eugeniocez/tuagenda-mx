import type { VerticalContent } from './types';

export const estudiosDeYoga: VerticalContent = {
  slug: 'estudios-de-yoga',
  meta: {
    title: 'Solución para estudios de yoga en México — confirma clases | agendallena',
    description:
      'Solución que confirma lugares en clases de yoga y pilates en automático por SMS, WhatsApp y llamada. Menos lugares vacíos. $199 MXN/mes. Prueba gratis.',
  },
  hero: {
    eyebrow: 'Para estudios de yoga y pilates',
    h1: 'El lugar en la clase tiene que estar ocupado',
    subtitle:
      'agendallena confirma a tus alumnos antes de cada clase. Sin lugares vacíos, sin instructor preparando una clase para nadie.',
  },
  problema: {
    cards: [
      {
        title: 'El alumno no llegó',
        description:
          'Reservó lugar para la clase de las 7 am, el instructor preparó la sesión. A la hora, faltó un lugar. Y ese lugar ya no se puede llenar.',
      },
      {
        title: 'La lista no es real',
        description:
          'Doce lugares reservados no significa doce alumnos presentes. Sin confirmación, la clase del martes es un estimado, no un hecho.',
      },
      {
        title: 'El grupo se rompe',
        description:
          'Una clase de yoga funciona con energía colectiva. Cuando varios alumnos faltan sin aviso, la experiencia cambia para todos — y el ingreso, también.',
      },
    ],
  },
  testimonials: {
    heading: 'Estudios que dejaron de tener lugares vacíos en clase.',
    items: [
      {
        quote:
          'Antes no sabía cuántos alumnos llegaban hasta el momento de la clase. Ahora el instructor sabe desde la noche anterior cuántos vienen.',
        name: 'Ana Luz Guerrero',
        role: 'Estudio de yoga, CDMX',
        initials: 'AG',
        avatarStyle: 'green',
      },
      {
        quote:
          'Los alumnos cancelan con más anticipación desde que reciben el recordatorio. Eso me permite abrir el lugar para alguien más.',
        name: 'Beatriz Navarro',
        role: 'Centro de yoga, Monterrey',
        initials: 'BN',
        avatarStyle: 'dark',
      },
      {
        quote:
          'La clase fluye mejor cuando todos confirmaron. Ya no hay incertidumbre — y mis instructores llegan con la energía correcta.',
        name: 'Mariana Aguilar',
        role: 'Yoga y bienestar, Guadalajara',
        initials: 'MA',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Estudios de yoga, pilates y bienestar',
    serviceType: 'Software de gestión de clases para estudios de yoga',
  },
  smsContext: 'en el estudio',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">estudio</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona si manejo clases grupales con cupo limitado?',
        answer:
          'Sí. Cada lugar reservado genera su propia confirmación automática. Si un alumno no confirma o cancela, lo sabes con anticipación — y puedes abrir el lugar para alguien más antes de que sea tarde.',
      },
      {
        question: '¿Puedo usarlo para clases privadas también?',
        answer:
          'Sí. <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> funciona igual para clases grupales y sesiones privadas. Cada cita recibe su recordatorio y confirmación automática, sin importar el formato.',
      },
    ],
  },
  finalCta: {
    heading: 'Un lugar vacío en la clase es ingreso que no vuelve.',
    body: 'Cada alumno que no confirma es un lugar que no puedes ofrecer a otro. agendallena confirma cada reservación antes del día — para que cuando el instructor llegue, ya sepa con cuántos alumnos cuenta.',
  },
  comparison: {
    competitor: {
      name: 'Mindbody',
      rows: ['check', 'check', 'x', 'x', 'check', 'x', 'x'],
    },
  },
};
