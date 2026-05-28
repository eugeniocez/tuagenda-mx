import type { VerticalContent } from './types';

export const terapistas: VerticalContent = {
  slug: 'terapistas',
  meta: {
    title: 'Solución para terapistas y fisioterapeutas en México — confirma citas | agendallena',
    description:
      'Solución que confirma sesiones de terapia en automático por SMS, WhatsApp y llamada. Menos sesiones perdidas. $199 MXN/mes. Prueba gratis.',
  },
  hero: {
    eyebrow: 'Para terapistas y fisioterapeutas',
    h1: 'La sesión preparada necesita al paciente que la pidió',
    subtitle:
      'agendallena confirma a tus pacientes antes de cada sesión. Sin equipo listo para nadie, sin interrumpir el proceso de recuperación.',
  },
  problema: {
    cards: [
      {
        title: 'El paciente no llegó',
        description:
          'Preparaste la sala, el equipo, el protocolo. El paciente tenía sesión a las 11. A las 11:05 ya sabías que no iba a llegar.',
      },
      {
        title: 'La agenda no habla',
        description:
          'Cinco sesiones al día, algunas de seguimiento, otras nuevas. No todas están confirmadas. No sabes hasta el último momento cuántas van a llegar.',
      },
      {
        title: 'La recuperación no espera',
        description:
          'Un paciente que falta a su sesión no solo te hace perder dinero — pierde su propio avance. Y eso tampoco tiene reembolso.',
      },
    ],
  },
  testimonials: {
    heading: 'Terapistas que dejaron de perder sesiones.',
    items: [
      {
        quote:
          'Antes no sabía cuántos pacientes iban a llegar hasta que llegaban. Ahora empiezo el día sabiendo exactamente cómo está mi agenda.',
        name: 'Lcda. Patricia Gómez',
        role: 'Fisioterapia, CDMX',
        initials: 'PG',
        avatarStyle: 'green',
      },
      {
        quote:
          'Mis pacientes confirman solos. Ya no tengo que mandar recordatorios entre sesiones ni rastrear quién contestó y quién no.',
        name: 'Mtro. Iván Cervantes',
        role: 'Terapia física, Monterrey',
        initials: 'IC',
        avatarStyle: 'dark',
      },
      {
        quote:
          'Lo que más valoro es que el sistema llama si el paciente no responde al SMS. Eso antes lo tenía que hacer yo.',
        name: 'Dra. Valeria Reyes',
        role: 'Rehabilitación, Guadalajara',
        initials: 'VR',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Terapistas y fisioterapeutas',
    serviceType: 'Software de gestión de citas para terapistas',
  },
  smsContext: 'con tu terapeuta',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">consultorio</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona para terapia a domicilio?',
        answer:
          'Sí. <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> confirma la sesión sin importar dónde sea. El paciente recibe el recordatorio y confirma — tú defines los detalles de ubicación al agendar, como siempre.',
      },
      {
        question: '¿Puedo ver cuántos pacientes confirmaron para el día de mañana?',
        answer:
          'Sí. El estado de cada cita se actualiza en tiempo real en el calendario de agendallena. Puedes ver de un vistazo cuántos pacientes confirmaron, cuántos están pendientes y si alguien solicitó reagendar.',
      },
    ],
  },
  finalCta: {
    heading: 'Una sesión perdida interrumpe la recuperación — y es ingreso que no vuelve.',
    body: 'Cada paciente que no se presenta es equipo listo, tiempo preparado e ingreso perdido. agendallena confirma cada sesión antes del día — para que cuando llegues al consultorio, ya sepas cómo va tu agenda.',
  },
  comparison: {
    competitor: {
      name: 'Doctoralia',
      rows: ['check', 'check', 'x', 'x', 'check', 'x', 'check'],
    },
  },
};
