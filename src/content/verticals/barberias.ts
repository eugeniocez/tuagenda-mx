import type { VerticalContent } from './types';

export const barberias: VerticalContent = {
  slug: 'barberias',
  meta: {
    title: 'Solución para barberías — confirma turnos en automático | agendallena',
    description:
      'Solución que confirma turnos de barberías en automático por SMS, WhatsApp y llamada. Sin huecos sin aviso, sin esperar a alguien que no llega. $199 MXN/mes.',
  },
  hero: {
    eyebrow: 'Para barberías',
    h1: 'El turno apartado tiene que llegar',
    subtitle:
      'agendallena confirma a tus clientes antes de su turno. Sin barbero esperando, sin silla vacía sin aviso.',
  },
  problema: {
    cards: [
      {
        title: 'El turno fantasma',
        description:
          'Te reservan a las 5 y a las 4:45 todavía no hay señal. Con confirmación automática, lo sabrías desde el día anterior.',
      },
      {
        title: 'El WhatsApp de la barbería',
        description:
          'Manejas reservas, fotos de corte, preguntas de precio y más en el mismo chat. Las confirmaciones se pierden entre todo eso.',
      },
      {
        title: 'La semana que no cuadra',
        description:
          'Tienes 3 barberos y 8 turnos por día. Nunca sabes con certeza cuántos van a llegar. Esa incertidumbre tiene un costo.',
      },
    ],
  },
  testimonials: {
    heading: 'Barberías que controlaron su agenda.',
    items: [
      {
        quote:
          'En la barbería el ritmo es rápido. Con agendallena los clientes confirman solos y yo sé exactamente cuándo van a llegar.',
        name: 'Carlos Mendez',
        role: 'Barbería, Monterrey',
        initials: 'CM',
        avatarStyle: 'green',
      },
      {
        quote:
          'Antes el WhatsApp era un caos. Ahora las confirmaciones llegan solas y el chat es para lo que debe ser.',
        name: 'Rodrigo Vidal',
        role: 'Barbería & lounge, CDMX',
        initials: 'RV',
        avatarStyle: 'dark',
      },
      {
        quote:
          'El primer mes recuperamos los turnos perdidos que antes se iban sin aviso. Eso solo pagó el año entero.',
        name: 'Fernando Ríos',
        role: 'Barbería, Guadalajara',
        initials: 'FR',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Barberías y peluquerías masculinas',
    serviceType: 'Software de gestión de turnos para barberías',
  },
  smsContext: 'en BarberKing',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">barbería</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona si mis clientes agendan solo por WhatsApp?',
        answer:
          'Exactamente para eso está pensado. Sigues recibiendo los turnos como siempre — por WhatsApp, en persona, por mensaje — y los capturas en <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> en segundos. De ahí en adelante, la confirmación es automática. No necesitas cambiar cómo tus clientes agendan.',
      },
      {
        question: '¿Se puede usar con varios barberos?',
        answer:
          'Sí. Puedes agendar turnos para cada barbero por separado. El cliente recibe el recordatorio con su hora específica y el nombre del local. Desde la app ves el día completo de todos los barberos en una sola vista.',
      },
    ],
  },
  finalCta: {
    heading: 'Sin turnos fantasma. Sin esperar a alguien que no llega.',
    body: 'Un turno vacío entre clientes son $300 pesos y 30 minutos perdidos. Con agendallena, cada turno tiene confirmación antes del día. Si alguien no puede, te enteras a tiempo para no quedarte parado esperando.',
  },
  comparison: {
    competitor: {
      name: 'Fresha',
      rows: ['check', 'check', 'x', 'x', 'check', 'check', 'dash'],
    },
  },
};
