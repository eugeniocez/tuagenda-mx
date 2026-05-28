import type { VerticalContent } from './types';

export const veterinarias: VerticalContent = {
  slug: 'veterinarias',
  meta: {
    title: 'Solución para veterinarias en México — agenda y confirma citas | agendallena',
    description:
      'Solución que confirma consultas veterinarias en automático por SMS, WhatsApp y llamada. Menos consultas perdidas. $199 MXN/mes. Prueba gratis.',
  },
  hero: {
    eyebrow: 'Para veterinarias y clínicas veterinarias',
    h1: 'La consulta agendada tiene que llegar con su paciente',
    subtitle:
      'agendallena confirma a los dueños antes de cada cita. Sin consultas perdidas, sin veterinario esperando, sin hueco en la agenda.',
  },
  problema: {
    cards: [
      {
        title: 'El dueño olvidó la cita',
        description:
          'Agendó la vacuna del perro para el jueves. A la hora señalada, no llegaron. El consultorio listo, el veterinario esperando.',
      },
      {
        title: 'La sala llena en papel, vacía en realidad',
        description:
          'Tienes seis consultas agendadas. ¿Cuántas van a llegar? La libreta dice seis. La realidad dirá otra cosa.',
      },
      {
        title: 'Entre consulta y consulta',
        description:
          'Cuando ves a 15 pacientes al día, rastrear quién confirmó la cita del viernes es imposible. Y el viernes llega solo.',
      },
    ],
  },
  testimonials: {
    heading: 'Veterinarias que dejaron de perder consultas.',
    items: [
      {
        quote:
          'Antes perdía dos o tres citas a la semana porque los dueños simplemente olvidaban. Ahora el recordatorio automático lo resuelve sin que yo haga nada.',
        name: 'Dra. Claudia Ortiz',
        role: 'Clínica veterinaria, CDMX',
        initials: 'CO',
        avatarStyle: 'green',
      },
      {
        quote:
          'Lo que más me ayudó es saber desde el día anterior cuántos pacientes llegan. Puedo organizar al equipo con anticipación.',
        name: 'Dr. Hugo Ramírez',
        role: 'Veterinaria, Monterrey',
        initials: 'HR',
        avatarStyle: 'dark',
      },
      {
        quote:
          'Los dueños agradecen el recordatorio. Muchos me dicen que sin él se les hubiera pasado la cita de vacunación.',
        name: 'Dra. Isabel Flores',
        role: 'Clínica, Guadalajara',
        initials: 'IF',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Veterinarias y clínicas veterinarias',
    serviceType: 'Software de gestión de citas para veterinarias',
  },
  smsContext: 'en la clínica veterinaria',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">clínica veterinaria</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona para recordar fechas de vacunación o revisiones periódicas?',
        answer:
          'El recordatorio automático se envía 24 horas antes de cada cita agendada. Si agendas las revisiones periódicas con anticipación en <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong>, el sistema confirma cada una a tiempo sin que tengas que hacer nada extra.',
      },
      {
        question: '¿Puedo usarlo si tengo varios veterinarios en la clínica?',
        answer:
          'Sí. <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> confirma cada cita de forma independiente, sin importar a qué veterinario corresponda. No necesitas configurar nada especial por cada profesional.',
      },
    ],
  },
  finalCta: {
    heading: 'Una consulta perdida es ingreso que no vuelve — y un paciente sin atención.',
    body: 'Cada dueño que no se presenta es tiempo del veterinario, sala preparada e ingreso sin retorno. agendallena confirma cada consulta antes del día — para que cuando abra la clínica, ya sepas cuántos pacientes llegan.',
  },
  comparison: {
    competitor: {
      name: 'Doctoralia',
      rows: ['check', 'check', 'x', 'x', 'check', 'x', 'check'],
    },
  },
};
