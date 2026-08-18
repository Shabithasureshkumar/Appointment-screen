import type { Appointment } from '../types/appointment'
import { formatDateHeading } from '../utils/scheduling'
import AppointmentCard from './AppointmentCard'

interface AppointmentTimelineProps {
  appointments: Appointment[]
  onCancel: (id: string) => void
  onReschedule: (appointment: Appointment) => void
  onJoinNow: (appointment: Appointment) => void
  onBookFollowUp: () => void
}

export default function AppointmentTimeline({
  appointments,
  onCancel,
  onReschedule,
  onJoinNow,
  onBookFollowUp,
}: AppointmentTimelineProps) {
  let lastDate = ''

  return (
    <div className="flex w-full flex-col gap-[clamp(16px,2.5vw,24px)]">
      {appointments.map((appointment, index) => {
        const showDateBadge = appointment.schedule.date !== lastDate
        lastDate = appointment.schedule.date
        const isLast = index === appointments.length - 1

        return (
          <div
            key={appointment.id}
            className="flex w-full flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-[clamp(16px,2.5vw,24px)]"
          >
            {/*
              Figma mobile drops the side date-badge/dashed-rail for a plain heading above
              each card (shown for every appointment, not just the first of a same-day
              group — the side rail's grouping visual doesn't translate to a single column).
              The rail below is unchanged, just hidden below `sm` instead of always shown.
            */}
            <p className="px-1 font-manrope text-[13px] font-bold text-brand-accent sm:hidden">
              {formatDateHeading(appointment.schedule)}
            </p>

            {/* Date rail (tablet/desktop only) */}
            <div className="relative hidden shrink-0 flex-col items-center sm:flex sm:w-[68px] lg:w-[72px]">
              {showDateBadge ? (
                <div className="relative z-10 flex h-[62px] w-[58px] flex-col items-center justify-center rounded-[17px] border border-[#D9CBFF] bg-white shadow-soft sm:h-[66px] sm:w-[64px] lg:h-[70px] lg:w-[68px]">
                  <span className="font-sora text-[9px] font-semibold uppercase tracking-wide text-brand-accent">
                    {appointment.schedule.day}
                  </span>

                  <span className="mt-0.5 font-manrope text-[18px] font-extrabold leading-none text-[#4E28D7]">
                    {appointment.schedule.date}
                  </span>
                </div>
              ) : (
                <div className="h-[62px] w-[58px] sm:h-[66px] sm:w-[64px] lg:h-[70px] lg:w-[68px]" />
              )}

              {!isLast && <div className="mt-2 w-px flex-1 border-l-2 border-dashed border-[#D8C8FF]" />}
            </div>

            {/* Appointment Card */}
            <div className="min-w-0 flex-1">
              <AppointmentCard
                appointment={appointment}
                onCancel={onCancel}
                onReschedule={onReschedule}
                onJoinNow={onJoinNow}
                onBookFollowUp={onBookFollowUp}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
