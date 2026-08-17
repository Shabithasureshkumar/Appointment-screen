import type { AppointmentMode, OrganIcon } from '../types/appointment'

export interface DoctorProfile {
  id: string
  name: string
  specialization: string
  experience: string
  image: string
  organIcon: OrganIcon
  defaultMode: AppointmentMode
  rating: number
  reviews: number
}

export const DOCTORS: DoctorProfile[] = [
  {
    id: 'sarah-jenkins',
    name: 'Dr. Sarah Jenkins',
    specialization: 'Senior Cardiologist',
    experience: '12 Years Exp.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    organIcon: 'heart',
    defaultMode: 'Video Call',
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 'james-wilson',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedic',
    experience: '12 Years Exp.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    organIcon: 'orthopedic',
    defaultMode: 'In-person',
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 'daniel-brooks',
    name: 'Dr. Daniel Brooks',
    specialization: 'Senior Gastroenterologist',
    experience: '12 Years Exp.',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    organIcon: 'digestive',
    defaultMode: 'Video Call',
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 'alexander-ross',
    name: 'Dr. Alexander Ross',
    specialization: 'Pulmonologist',
    experience: '12 Years Exp.',
    image: 'https://randomuser.me/api/portraits/men/50.jpg',
    organIcon: 'lung',
    defaultMode: 'Video Call',
    rating: 4.9,
    reviews: 124,
  },
]

export const CLINIC_ADDRESS = '2450 Wellness Avenue, Suite 320, Houston, Texas 77002, United States'
