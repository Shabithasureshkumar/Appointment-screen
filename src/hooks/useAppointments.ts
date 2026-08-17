import { useCallback, useMemo, useState } from 'react'
import { appointments as seedAppointments } from '../data/appointments'
import { CLINIC_ADDRESS } from '../data/doctors'
import type { Appointment, AppointmentMode, AppointmentStatus } from '../types/appointment'
import type { ScheduleFields } from '../utils/scheduling'

export interface BookAppointmentInput extends ScheduleFields {
  doctorName: string
  specialization: string
  experience: string
  doctorImage: string
  organIcon: Appointment['organIcon']
  mode: AppointmentMode
  rating: number
  reviews: number
}

function createAppointmentId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `apt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments)
  const [activeFilter, setActiveFilter] = useState<AppointmentStatus>('upcoming')

  const visibleAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.status === activeFilter),
    [appointments, activeFilter],
  )

  const cancelAppointment = useCallback((id: string) => {
    setAppointments((prev) =>
      prev.map((appointment) => (appointment.id === id ? { ...appointment, status: 'cancelled' } : appointment)),
    )
  }, [])

  /** Reschedules an appointment to a new date/time. Also reactivates a cancelled appointment. */
  const rescheduleAppointment = useCallback((id: string, fields: ScheduleFields) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, ...fields, status: 'upcoming' }
          : appointment,
      ),
    )
    setActiveFilter('upcoming')
  }, [])

  const bookAppointment = useCallback((input: BookAppointmentInput) => {
    const appointment: Appointment = {
      id: createAppointmentId(),
      schedule: input.schedule,
      doctorName: input.doctorName,
      specialization: input.specialization,
      experience: input.experience,
      rating: input.rating,
      reviews: input.reviews,
      mode: input.mode,
      appointmentType: 'Consultation',
      startsInSeconds: input.startsInSeconds,
      address: CLINIC_ADDRESS,
      doctorImage: input.doctorImage,
      organIcon: input.organIcon,
      status: 'upcoming',
    }
    setAppointments((prev) => [...prev, appointment])
    setActiveFilter('upcoming')
    return appointment
  }, [])

  return {
    appointments,
    visibleAppointments,
    activeFilter,
    setActiveFilter,
    cancelAppointment,
    rescheduleAppointment,
    bookAppointment,
  }
}
