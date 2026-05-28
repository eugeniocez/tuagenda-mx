import type { VerticalContent } from './types';

export const talleresMecanicos: VerticalContent = {
  slug: 'talleres-mecanicos',
  meta: {
    title: 'Solución para talleres mecánicos en México — agenda y confirma citas | agendallena',
    description:
      'Solución que confirma citas de talleres mecánicos en automático por SMS, WhatsApp y llamada. Menos bahías vacías. $199 MXN/mes. Prueba gratis.',
  },
  hero: {
    eyebrow: 'Para talleres mecánicos',
    h1: 'La bahía que apartaste tiene que estar trabajando',
    subtitle:
      'agendallena confirma a tus clientes antes de llevar el coche. Sin bahías bloqueadas sin trabajo, sin refacciones compradas para nadie.',
  },
  problema: {
    cards: [
      {
        title: 'El cliente no llegó con el auto',
        description:
          'Tenías la bahía apartada, el técnico asignado, las refacciones en orden. El cliente simplemente no llegó. Y el tiempo bloqueado no se recupera.',
      },
      {
        title: 'La agenda no avisa',
        description:
          'Cinco trabajos esta semana, dos pendientes de confirmar. Cuando uno cae, ya es tarde para reubicar al técnico o liberar la bahía para otro cliente.',
      },
      {
        title: 'El recordatorio por WhatsApp se pierde',
        description:
          'Le avisas el día antes entre trabajos. El mensaje se ve, no se contesta. Al día siguiente la sorpresa: el cliente "se le olvidó".',
      },
    ],
  },
  testimonials: {
    heading: 'Talleres que dejaron de tener bahías vacías.',
    items: [
      {
        quote:
          'Antes tenía trabajos que no llegaban y ya era tarde para llenar la bahía. Ahora el cliente confirma el día antes y puedo reorganizar si hace falta.',
        name: 'Miguel Ángel Sandoval',
        role: 'Taller mecánico, CDMX',
        initials: 'MS',
        avatarStyle: 'green',
      },
      {
        quote:
          'Mis técnicos saben exactamente cuántos autos llegan. No hay tiempo muerto esperando a alguien que no aparece.',
        name: 'Roberto Jiménez',
        role: 'Taller, Monterrey',
        initials: 'RJ',
        avatarStyle: 'dark',
      },
      {
        quote:
          'Los clientes llegan más puntuales cuando reciben el recordatorio. Y si no pueden venir, avisan antes — no a la hora del servicio.',
        name: 'Ernesto Vargas',
        role: 'Servicio automotriz, Guadalajara',
        initials: 'EV',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Talleres mecánicos y servicios automotrices',
    serviceType: 'Software de gestión de citas para taller mecánico',
  },
  smsContext: 'en el taller',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">taller</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question:
          '¿Funciona si necesito confirmar que el cliente traiga el auto a una hora específica?',
        answer:
          'Sí. El mensaje de confirmación incluye la hora y el lugar que agendaste. El cliente confirma que llegará a la hora indicada — y si necesita reagendar, puede hacerlo por WhatsApp directo con el taller.',
      },
      {
        question: '¿Puedo usarlo si tengo varios técnicos y bahías?',
        answer:
          '<strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> confirma cada cita de forma independiente. No importa cuántos técnicos o bahías tenga tu taller — cada trabajo agendado recibe su confirmación automática.',
      },
    ],
  },
  finalCta: {
    heading: 'Una bahía vacía es tiempo de técnico que no vuelve.',
    body: 'Cada trabajo que no llega es bahía bloqueada, técnico sin asignar e ingreso perdido. agendallena confirma cada cita antes del día — para que cuando abra el taller, ya sepas cuántos autos llegan.',
  },
  comparison: {
    competitor: {
      name: 'Calendly',
      rows: ['check', 'check', 'x', 'x', 'x', 'x', 'x'],
    },
  },
};
