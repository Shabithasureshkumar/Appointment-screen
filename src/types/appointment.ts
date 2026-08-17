export type AppointmentMode = 'Video Call' | 'In-person'

export type AppointmentBadge = 'Follow Up' | 'Consultation'

export type OrganIcon = 'heart' | 'orthopedic' | 'digestive' | 'lung'

export type AppointmentStatus = 'upcoming' | 'past' | 'cancelled'

export interface AiSummary {
  title: string
  description: string
  detail: string
}

/**
 * Canonical schedule for an appointment. The timeline badge (day/date) and the
 * detail label are both derived from this single object (see
 * `formatDateTimeLabel` in utils/scheduling.ts) so they can never disagree —
 * there is nowhere else a date/time string is hand-authored.
 */
export interface AppointmentSchedule {
  /** Weekday label for the timeline badge, e.g. 'MON'. */
  day: string
  /** Day-of-month for the timeline badge, e.g. '12'. */
  date: string
  /** Month + year, e.g. 'May 2026'. */
  monthYear: string
  /** Time of day, e.g. '09:30 AM'. */
  time: string
  /** Whether the detail label should read "Today," instead of the weekday. */
  isToday: boolean
}

export interface Appointment {
  id: string
  schedule: AppointmentSchedule
  doctorName: string
  specialization: string
  experience: string
  rating: number
  reviews: number
  mode: AppointmentMode
  appointmentType: AppointmentBadge
  /** Seconds until the appointment starts. Omit for appointments with no live countdown (e.g. past visits). */
  startsInSeconds?: number
  address: string
  doctorImage: string
  organIcon?: OrganIcon
  symptoms?: string[]
  aiSummary?: AiSummary
  status: AppointmentStatus
}
