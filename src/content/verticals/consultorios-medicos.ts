import type { VerticalContent } from './types';

export const consultoriosMedicos: VerticalContent = {
  slug: 'consultorios-medicos',
  meta: {
    title: 'Solución para consultorios médicos — agenda y confirma citas | agendallena',
    description:
      'Solución que confirma citas de consultorios médicos automáticamente por SMS, WhatsApp y llamada. Pacientes que llegan, agenda predecible. $199 MXN/mes.',
  },
  hero: {
    eyebrow: 'Para consultorios médicos',
    h1: 'Pacientes que confirman. Agenda que no falla.',
    subtitle:
      'agendallena recuerda y confirma a tus pacientes antes de cada consulta. Sin huecos de última hora, sin llamadas de seguimiento.',
  },
  problema: {
    cards: [
      {
        title: 'El paciente no apareció',
        description:
          'Bloqueaste una hora de tu agenda para alguien que nunca llegó. Y nunca avisó. Eso pasa cuando no hay confirmación automática.',
      },
      {
        title: 'La recepción no sabe',
        description:
          'Tienes una lista de 20 nombres para hoy. No sabes cuántos van a llegar. Tu recepcionista tampoco. Así empieza cualquier día.',
      },
      {
        title: 'Demasiadas variables',
        description:
          'Entre urgencias, reprogramaciones y pacientes nuevos, llevar el control de quién confirmó es un trabajo de tiempo completo.',
      },
    ],
  },
  testimonials: {
    heading: 'Consultorios que recuperaron el control de su agenda.',
    items: [
      {
        quote:
          'Mis pacientes reciben el recordatorio automático y confirman desde el SMS. Yo solo abro la app y ya sé cómo va el día.',
        name: 'Dra. Laura Vega',
        role: 'Medicina general, Monterrey',
        initials: 'LV',
        avatarStyle: 'green',
      },
      {
        quote: 'Redujimos las ausencias en más del 60% el primer mes. El retorno fue inmediato.',
        name: 'Dr. Ernesto Ríos',
        role: 'Consultorio médico, Guadalajara',
        initials: 'ER',
        avatarStyle: 'dark',
      },
      {
        quote:
          'La recepcionista ahora se enfoca en atender bien al paciente que llega, no en perseguir al que todavía no ha confirmado.',
        name: 'Dra. Mariana Torres',
        role: 'Clínica familiar, CDMX',
        initials: 'MT',
        avatarStyle: '',
      },
    ],
  },
  serviceSchema: {
    audience: 'Consultorios médicos y clínicas privadas',
    serviceType: 'Software de gestión de citas médicas',
  },
  smsContext: 'en Consultorio Dr. Ríos',
  statementStrip: {
    title:
      'Qué cambia en tu <strong class="brand-mention"><span class="dot">consultorio</span></strong> cuando <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> trabaja por ti.',
  },
  faq: {
    extraItems: [
      {
        question: '¿Funciona para consultas de especialidad o solo medicina general?',
        answer:
          'Para ambas. No importa si eres médico general, especialista o si manejas citas de primera vez y seguimientos — el sistema trabaja igual en todos los casos. Tú agendas la cita con el tiempo que necesitas y <strong class="brand-mention">agenda<span class="brand-llena">llena</span></strong> hace el seguimiento automático.',
      },
      {
        question: '¿El recordatorio llega a tiempo aunque la consulta sea muy temprano?',
        answer:
          'El recordatorio de 24 horas se envía a las 10 AM del día anterior. Si el paciente no responde al SMS, la llamada automática sale 2 horas antes de la cita. Todo sin que tengas que supervisar nada.',
      },
    ],
  },
  finalCta: {
    heading: 'Pacientes que llegan. Agenda que funciona.',
    body: 'Sin llamadas de seguimiento, sin sorpresas de último momento. agendallena confirma cada consulta para que te enfoques en el paciente que tienes enfrente, no en el que no sabe si va a llegar.',
  },
  comparison: {
    competitor: {
      name: 'Doctoralia',
      rows: ['check', 'check', 'x', 'x', 'check', 'x', 'check'],
    },
  },
};
