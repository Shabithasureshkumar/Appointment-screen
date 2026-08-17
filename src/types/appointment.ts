export type AppointmentMode = 'Video Call' | 'In-person'

export type AppointmentBadge = 'Follow Up' | 'Consultation'

export type OrganIcon = 'heart' | 'orthopedic' | 'digestive' | 'lung'

export type AppointmentStatus = 'upcoming' | 'past' | 'cancelled'

export interface AiSummary {
  title: string
  description: string
  detail: string
}

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
  /** Seconds until the appointment starts. Omit for appointments with no live countdown (e.g. past visits). */
  startsInSeconds?: number
  dateTimeLabel: string
  address: string
  doctorImage: string
  organIcon?: OrganIcon
  symptoms?: string[]
  aiSummary?: AiSummary
  status: AppointmentStatus
}
