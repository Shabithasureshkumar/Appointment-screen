export type AppointmentMode = 'Video Call' | 'In-person' | 'video call'

export type AppointmentBadge = 'Follow Up' | 'Consultation'

export type OrganIcon = string

export type AppointmentStatus = 'upcoming' | 'past' | 'cancelled'

export interface Appointment {
  id: string
  day: string
  date: string
  doctorName: string
  specialization: string
  experience: string
  rating: number
  reviews: number
  mode: AppointmentMode
  appointmentType: AppointmentBadge
  startsInSeconds: number
  dateTimeLabel: string
  address: string
  doctorImage: string
  organIcon: OrganIcon
  symptoms: string[]
  status: AppointmentStatus
}