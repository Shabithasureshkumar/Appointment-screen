import { CalendarDays, CalendarCheck, CircleCheck, CircleX, Clock, History, Hourglass, Stethoscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Appointment, AppointmentStatus } from '../types/appointment'
import { formatDateHeading } from '../utils/scheduling'

interface AppointmentVisitDetailsProps {
  appointment: Appointment
}

// Fills the middle of cards that have no symptoms / AI summary to show (pending, past,
// completed, cancelled, freshly booked), so those cards don't leave a blank gap between the
// doctor and the action buttons.
const STATUS_COPY: Record<AppointmentStatus, { title: string; note: string; icon: LucideIcon }> = {
  upcoming: {
    title: 'Appointment details',
    note: 'Everything is set. Use the actions on the right when it is time.',
    icon: CalendarCheck,
  },
  pending: {
    title: 'Awaiting confirmation',
    note: 'The clinic will confirm your slot shortly. You can withdraw the request any time.',
    icon: Hourglass,
  },
  past: {
    title: 'Visit details',
    note: 'This visit has already taken place. Book a follow-up if you need further care.',
    icon: History,
  },
  completed: {
    title: 'Consultation completed',
    note: 'This consultation is finished. Book a follow-up if you need further care.',
    icon: CircleCheck,
  },
  cancelled: {
    title: 'Appointment cancelled',
    note: 'This appointment was cancelled. Reschedule to pick a new time.',
    icon: CircleX,
  },
}

export default function AppointmentVisitDetails({ appointment }: AppointmentVisitDetailsProps) {
  const { title, note, icon: StatusIcon } = STATUS_COPY[appointment.status]

  const facts: { label: string; value: string; icon: LucideIcon }[] = [
    { label: 'Date', value: formatDateHeading(appointment.schedule), icon: CalendarDays },
    { label: 'Time', value: appointment.schedule.time, icon: Clock },
    { label: 'Consultation', value: `${appointment.mode} · ${appointment.appointmentType}`, icon: Stethoscope },
  ]

  return (
    <div className="flex w-full flex-col gap-[clamp(10px,1.4vw,12px)] rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-[clamp(12px,1.8vw,16px)]">
      <div className="flex items-center gap-1.5">
        <StatusIcon className="h-4 w-4 shrink-0 text-brand-700" strokeWidth={2} />
        <p className="font-manrope text-sm font-bold text-brand-900">{title}</p>
      </div>

      <dl className="grid grid-cols-[repeat(auto-fit,minmax(104px,1fr))] gap-x-3 gap-y-2.5">
        {facts.map(({ label, value, icon: Icon }) => (
          <div key={label} className="min-w-0">
            <dt className="flex items-center gap-1 font-sora text-[11px] text-gray-400">
              <Icon className="h-3 w-3 shrink-0" strokeWidth={2} />
              {label}
            </dt>
            <dd className="mt-0.5 font-sora text-xs font-semibold leading-snug text-gray-800">{value}</dd>
          </div>
        ))}
      </dl>

      <p className="font-sora text-xs leading-snug text-gray-500">{note}</p>
    </div>
  )
}
