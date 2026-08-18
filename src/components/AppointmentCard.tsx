import type { Appointment } from '../types/appointment'
import { formatDateTimeLabel } from '../utils/scheduling'
import DoctorInfo from './DoctorInfo'
import CountdownTimer from './CountdownTimer'
import ReportedSymptoms from './ReportedSymptoms'
import PreVisitSummary from './PreVisitSummary'
import OrganIllustration from './OrganIllustration'
import AppointmentActionButtons from './AppointmentActionButtons'

interface AppointmentCardProps {
  appointment: Appointment
  onCancel: (id: string) => void
  onReschedule: (appointment: Appointment) => void
  onJoinNow: (appointment: Appointment) => void
  onBookFollowUp: () => void
}

export default function AppointmentCard({
  appointment,
  onCancel,
  onReschedule,
  onJoinNow,
  onBookFollowUp,
}: AppointmentCardProps) {
  const hasCountdown = appointment.startsInSeconds !== undefined
  const hasSymptoms = Boolean(
    appointment.symptoms && appointment.symptoms.length > 0,
  )
  const hasSummary = Boolean(appointment.aiSummary)
  const hasOrganIcon = Boolean(appointment.organIcon)

  return (
    <article
      className="
        appointment-card
        w-full
        min-w-0
        rounded-[24px]
        border
        border-[#E7DDFF]
        bg-white
        px-4
        py-4
        sm:px-5
        sm:py-5
        lg:px-5
        lg:py-4
      "
    >
      <div
        className="
          grid
          grid-cols-2
          items-start
          gap-[clamp(10px,1.5vw,20px)]
          md:items-center
          lg:flex
          lg:flex-row
          lg:flex-wrap
          lg:items-center
          lg:gap-5
          min-[1440px]:flex-nowrap
        "
      >
        {/* Doctor information */}
        <div
          className="
            order-1
            col-span-2
            min-w-0
            lg:order-none
            lg:basis-[300px]
            lg:grow-0
            lg:shrink-0
          "
        >
          <DoctorInfo appointment={appointment} />
        </div>

        {/* Countdown + Organ illustration */}
        {(hasCountdown || hasOrganIcon) && (
          <div
            className="
              order-2
              col-span-2
              flex
              min-w-0
              items-center
              justify-between
              gap-2
              md:contents
            "
          >
            {hasCountdown && (
              <div
                className="
                  order-2
                  min-w-0
                  md:justify-start
                  lg:order-none
                  lg:basis-[140px]
                  lg:grow-0
                  lg:shrink-0
                "
              >
                <CountdownTimer
                  initialSeconds={appointment.startsInSeconds as number}
                  dateTimeLabel={formatDateTimeLabel(appointment.schedule)}
                />
              </div>
            )}

            {hasOrganIcon && (
              <div
                className="
                  order-3
                  flex
                  shrink-0
                  items-center
                  justify-end
                  md:hidden
                  lg:order-none
                  lg:flex
                  lg:basis-[120px]
                  lg:grow-0
                  lg:shrink-0
                  lg:justify-center
                "
              >
                <OrganIllustration icon={appointment.organIcon!} />
              </div>
            )}
          </div>
        )}

        {/* Reported symptoms */}
        {hasSymptoms && (
          <div
            className="
              order-4
              col-span-2
              min-w-0
              md:col-span-1
              lg:order-none
              lg:basis-[200px]
              lg:grow-0
              lg:shrink-0
            "
          >
            <ReportedSymptoms symptoms={appointment.symptoms as string[]} />
          </div>
        )}

        {/* Pre-visit summary */}
        {hasSummary && (
          <div
            className="
              order-5
              col-span-2
              min-w-0
              lg:order-none
              lg:grow
              lg:shrink-0
              lg:basis-[260px]
            "
          >
            <PreVisitSummary summary={appointment.aiSummary!} />
          </div>
        )}

        {/* Actions */}
        {/*
          `lg:basis-[176px]`, not 140px: the actual rendered content here is a 128px button
          column + up to 12px gap + a 34px close button = ~174px. With the old 140px basis,
          `grow-0 shrink-0` locked this slot too narrow for its own children, and `justify-end`
          bled the overflow leftward into Pre-visit Summary's space instead of clipping it —
          the wrapper box itself measured fine, but the buttons rendered outside it.
        */}
        <div
          className="
            order-6
            col-span-2
            flex
            min-w-0
            lg:order-none
            lg:ml-auto
            lg:basis-[176px]
            lg:grow-0
            lg:shrink-0
            lg:justify-end
          "
        >
          <AppointmentActionButtons
            status={appointment.status}
            onJoinNow={() => onJoinNow(appointment)}
            onReschedule={() => onReschedule(appointment)}
            onCancel={() => onCancel(appointment.id)}
            onBookFollowUp={onBookFollowUp}
          />
        </div>
      </div>
    </article>
  )
}