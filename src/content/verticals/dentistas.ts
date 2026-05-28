import type { VerticalContent } from './types';

export const dentistas: VerticalContent = {
  slug: 'dentistas',
  meta: {
    title: 'Solución para dentistas en México — agenda y confirma citas | agendallena',
    description:
      'Solución que confirma citas de dentistas en automático por SMS, WhatsApp y llamada. Menos inasistencias en tu clínica dental. $199 MXN/mes. Prueba gratis.',
  },
  hero: {
    eyebrow: 'Para clínicas dentales',
    h1: 'El sillón que preparaste tiene que estar ocupado',
    subtitle:
      'agendallena confirma a tus pacientes por SMS y llamada antes de su cita. Sin sillones vacíos, sin asistente haciendo llamadas que nadie contesta.',
  },
  problema: {
    cards: [
      {
        title: 'El paciente olvidó',
        description:
          'Confirmaste por WhatsApp, pero el mensaje se perdió entre un mar de conversaciones. Para cuando te acuerdas, el sillón ya está vacío.',
      },
      {
        title: 'La agenda no avisa',
        description:
          'Tienes 12 pacientes esta semana. ¿Cuántos van a llegar? La libreta no te dice. El tiempo bloqueado, sí se pierde.',
      },
      {
        title: 'Entre consulta y consulta',
        description:
          'Cuando ves a 15 pacientes al día, recordar quién confirmó la cita del viernes es imposible. Y el viernes llega solo.',
      },
    ],
  },
  testimonials: {
    heading: 'Clínicas dentales que dejaron de perder citas.',
    items: [
      {
        quote:
          'Antes perdía 4 o 5 pacientes a la semana sin aviso. Ahora la solución los contacta sola y el sillón casi siempre está lleno.',
        name: 'Dr. Marco Ayala',
        role: 'Clínica dental, Monterrey',
        initials: 'MA',
        avatarStyle: 'green',
      },
      {
        quote:
          'Lo que más me sorprendió es que los pacientes confirman solos. Mi recepcionista dejó de pasar las mañanas persiguiendo por teléfono.',
        name: 'Dra. Sofía Herrera',
        role: 'Odontología, CDMX',
        initials: 'SH',
        avatarStyle: 'dark',
      },
      {
        quote:
          'Mis pacientes dicen que es más fácil confirmar con nosotros que con cualquier otra clínica. Eso solo ya vale los $199.',
        name: 'Dr. Adrián Casas',
        role: 'Consultorio dental, Guadalajara',
        initials: 'AC',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Clínicas dentales y consultorios odontológicos',
    serviceType: 'Software de gestión de citas dentales',
  },
  smsContext: 'en Clínica Dental Ayala',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">clínica dental</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona si tengo recepcionista en el consultorio?',
        answer:
          'Sí, y de hecho es donde más ayuda. Tu recepcionista sigue haciendo lo que sabe hacer — atender al paciente que llega, cobrar, gestionar urgencias — mientras <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> se encarga de las confirmaciones. No necesita aprender nada nuevo.',
      },
      {
        question: '¿Los pacientes pueden pedir cambio de cita por el SMS?',
        answer:
          'Sí. Si un paciente responde que quiere reagendar, recibe un link directo a tu WhatsApp con un mensaje prellenado. Tú o tu recepcionista coordinan el nuevo horario sin tener que buscar el historial de la conversación.',
      },
    ],
  },
  finalCta: {
    heading: 'Un sillón vacío es ingreso que no vuelve.',
    body: 'Cada cita que se pierde sin aviso es tiempo, materiales y agenda desperdiciados. agendallena confirma cada paciente antes de que llegue el día — para que cuando abras el consultorio, ya sepas cómo va a ir.',
  },
  comparison: {
    competitor: {
      name: 'Doctoralia',
      rows: ['check', 'check', 'x', 'x', 'check', 'x', 'check'],
    },
  },
};
