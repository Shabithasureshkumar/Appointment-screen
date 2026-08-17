import type { Appointment } from '../types/appointment'
import { DOCTORS, CLINIC_ADDRESS } from './doctors'

const [sarah, james, daniel, alexander] = DOCTORS

const SYMPTOMS = [
  'Mild Chest Pain',
  'Shortness of Breath',
  'Fatigue',
  'Occasional Dizziness',
]

export const appointments: Appointment[] = [
  {
    id: 'apt-1',
    schedule: { day: 'MON', date: '12', monthYear: 'May 2026', time: '09:30 AM', isToday: true },
    doctorName: sarah.name,
    specialization: sarah.specialization,
    experience: sarah.experience,
    rating: sarah.rating,
    reviews: sarah.reviews,
    mode: 'Video Call',
    appointmentType: 'Follow Up',
    startsInSeconds: 45 * 60 + 27,
    address: CLINIC_ADDRESS,
    doctorImage: sarah.image,
    organIcon: sarah.organIcon,
    symptoms: SYMPTOMS,
    aiSummary: {
      title: 'Pre-visit summary ready',
      description: 'AI has synthesized your last 3 blood results for the doctor to review.',
      detail: 'Vitals from your last 3 visits show a stable trend. Full breakdown will be available to Dr. Jenkins during your consultation.',
    },
    status: 'upcoming',
  },

  {
    id: 'apt-2',
    schedule: { day: 'MON', date: '12', monthYear: 'May 2026', time: '01:30 PM', isToday: true },
    doctorName: james.name,
    specialization: james.specialization,
    experience: james.experience,
    rating: james.rating,
    reviews: james.reviews,
    mode: 'In-person',
    appointmentType: 'Consultation',
    startsInSeconds: 4 * 3600 + 45 * 60 + 27,
    address: CLINIC_ADDRESS,
    doctorImage: james.image,
    organIcon: james.organIcon,
    symptoms: SYMPTOMS,
    aiSummary: {
      title: 'Pre-visit summary ready',
      description: 'AI has synthesized your last 3 blood results for the doctor to review.',
      detail: "Reported joint symptoms have been cross-referenced with your recent activity logs for Dr. Wilson's review.",
    },
    status: 'upcoming',
  },

  {
    id: 'apt-3',
    // Previously hard-authored as "Today, 12 May 2026" — disagreed with its own
    // TUE 13 timeline badge. Now both come from this one schedule object.
    schedule: { day: 'TUE', date: '13', monthYear: 'May 2026', time: '09:30 AM', isToday: false },
    doctorName: daniel.name,
    specialization: daniel.specialization,
    experience: daniel.experience,
    rating: daniel.rating,
    reviews: daniel.reviews,
    mode: 'Video Call',
    appointmentType: 'Consultation',
    startsInSeconds: 27,
    address: CLINIC_ADDRESS,
    doctorImage: daniel.image,
    organIcon: daniel.organIcon,
    symptoms: SYMPTOMS,
    aiSummary: {
      title: 'Pre-visit summary ready',
      description: 'AI has synthesized your last 3 blood results for the doctor to review.',
      detail: 'Your last 3 lab results have been compiled into a digestive health trend summary for Dr. Brooks.',
    },
    status: 'upcoming',
  },

  {
    id: 'apt-4',
    // Same fix as apt-3: was "Today, 12 May 2026" next to a WED 14 badge.
    schedule: { day: 'WED', date: '14', monthYear: 'May 2026', time: '09:30 AM', isToday: false },
    doctorName: alexander.name,
    specialization: alexander.specialization,
    experience: alexander.experience,
    rating: alexander.rating,
    reviews: alexander.reviews,
    mode: 'Video Call',
    appointmentType: 'Follow Up',
    startsInSeconds: 27,
    address: CLINIC_ADDRESS,
    doctorImage: alexander.image,
    organIcon: alexander.organIcon,
    symptoms: SYMPTOMS,
    aiSummary: {
      title: 'Pre-visit summary ready',
      description: 'AI has synthesized your last 3 blood results for the doctor to review.',
      detail: 'Respiratory symptom patterns from your last 3 check-ins are ready for Dr. Ross to review.',
    },
    status: 'upcoming',
  },

  {
    id: 'apt-5',
    schedule: { day: 'FRI', date: '08', monthYear: 'May 2026', time: '10:00 AM', isToday: false },
    doctorName: sarah.name,
    specialization: sarah.specialization,
    experience: sarah.experience,
    rating: sarah.rating,
    reviews: sarah.reviews,
    mode: 'Video Call',
    appointmentType: 'Follow Up',
    address: CLINIC_ADDRESS,
    doctorImage: sarah.image,
    status: 'past',
  },
]
