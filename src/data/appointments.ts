import type { Appointment } from '../types/appointment'

import heart from '../assets/heart.png'
import ortho from '../assets/ortho.png'
import gesto from '../assets/gesto.png'
import pulmo from '../assets/pulmo.png'

const SYMPTOMS = [
  'Mild Chest Pain',
  'Shortness of Breath',
  'Fatigue',
  'Occasional Dizziness',
]

export const appointments: Appointment[] = [
  {
    id: 'apt-1',
    day: 'MON',
    date: '12',
    doctorName: 'Dr. Sarah Jenkins',
    specialization: 'Senior Cardiologist',
    experience: '12 Years Exp.',
    rating: 4.9,
    reviews: 124,
    mode: 'Video Call',
    appointmentType: 'Follow Up',
    startsInSeconds: 45 * 60 + 27,
    dateTimeLabel: 'Today, 12 May 2026, 09:30 AM',
    address:
      '2450 Wellness Avenue, Suite 320, Houston, Texas 77002, United States',
    doctorImage:
      'https://randomuser.me/api/portraits/women/65.jpg',

    // ❤️ Heart image
    organIcon: heart,

    symptoms: SYMPTOMS,
    status: 'upcoming',
  },

  {
    id: 'apt-2',
    day: 'TUE',
    date: '13',
    doctorName: 'Dr. James Wilson',
    specialization: 'Orthopedic',
    experience: '12 Years Exp.',
    rating: 4.9,
    reviews: 124,
    mode: 'In-person',
    appointmentType: 'Consultation',
    startsInSeconds: 4 * 3600 + 45 * 60 + 27,
    dateTimeLabel: 'Today, 12 May 2026, 01:30 PM',
    address:
      '2450 Wellness Avenue, Suite 320, Houston, Texas 77002, United States',
    doctorImage:
      'https://randomuser.me/api/portraits/men/32.jpg',

    // 🦴 Orthopedic image
    organIcon: ortho,

    symptoms: SYMPTOMS,
    status: 'upcoming',
  },

  {
    id: 'apt-3',
    day: 'TUE',
    date: '13',
    doctorName: 'Dr. Daniel Brooks',
    specialization: 'Senior Gastroenterologist',
    experience: '12 Years Exp.',
    rating: 4.9,
    reviews: 124,
    mode: 'Video Call',
    appointmentType: 'Consultation',
    startsInSeconds: 27,
    dateTimeLabel: 'Today, 12 May 2026, 09:30 AM',
    address:
      '2450 Wellness Avenue, Suite 320, Houston, Texas 77002, United States',
    doctorImage:
      'https://randomuser.me/api/portraits/men/76.jpg',

    // 🩺 Gastro / kidney image
    organIcon: gesto,

    symptoms: SYMPTOMS,
    status: 'upcoming',
  },

  {
    id: 'apt-4',
    day: 'WED',
    date: '14',
    doctorName: 'Dr. Alexander Ross',
    specialization: 'Pulmonologist',
    experience: '12 Years Exp.',
    rating: 4.9,
    reviews: 124,
    mode: 'Video Call',
    appointmentType: 'Follow Up',
    startsInSeconds: 27,
    dateTimeLabel: 'Today, 12 May 2026, 09:30 AM',
    address:
      '2450 Wellness Avenue, Suite 320, Houston, Texas 77002, United States',
    doctorImage:
      'https://randomuser.me/api/portraits/men/50.jpg',

    // 🫁 Lungs image
    organIcon: pulmo,

    symptoms: SYMPTOMS,
    status: 'upcoming',
  },
]