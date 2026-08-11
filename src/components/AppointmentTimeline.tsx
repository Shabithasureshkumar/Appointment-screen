import type { Appointment } from '../types/appointment'
import AppointmentCard from './AppointmentCard'

interface AppointmentTimelineProps {
  appointments: Appointment[]
  onCloseAppointment: (id: string) => void
}

export default function AppointmentTimeline({
  appointments,
  onCloseAppointment,
}: AppointmentTimelineProps) {
  let lastDate = ''

  return (
    <div className="flex w-full flex-col gap-6">
      {appointments.map((appointment) => {
        const showDateBadge = appointment.date !== lastDate
        lastDate = appointment.date

        return (
          <div
            key={appointment.id}
            className="flex w-full items-stretch gap-4 sm:gap-5 lg:gap-6"
          >
            {/* Date */}
            <div className="relative flex w-[58px] shrink-0 flex-col items-center sm:w-[68px] lg:w-[72px]">
              {showDateBadge ? (
                <div className="relative z-10 flex h-[62px] w-[58px] flex-col items-center justify-center rounded-[17px] border border-[#D9CBFF] bg-white shadow-soft sm:h-[66px] sm:w-[64px]">
                  <span className="font-sora text-[9px] font-semibold uppercase tracking-wide text-[#744BFF]">
                    {appointment.day}
                  </span>

                  <span className="mt-0.5 font-manrope text-[18px] font-extrabold leading-none text-[#4E28D7]">
                    {appointment.date}
                  </span>
                </div>
              ) : (
                <div className="h-[66px] w-[64px]" />
              )}

              <div className="mt-2 w-px flex-1 border-l-2 border-dashed border-[#D8C8FF]" />
            </div>

            {/* Appointment Card */}
            <div className="min-w-0 flex-1">
              <AppointmentCard
                appointment={appointment}
                onClose={onCloseAppointment}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}