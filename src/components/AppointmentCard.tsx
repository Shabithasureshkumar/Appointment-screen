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
  const hasSymptoms = Boolean(appointment.symptoms && appointment.symptoms.length > 0)
  const hasSummary = Boolean(appointment.aiSummary)
  const hasOrganIcon = Boolean(appointment.organIcon)

  return (
    <article className="appointment-card w-full rounded-[24px] border border-[#E7DDFF] bg-white px-4 py-4 sm:px-5 sm:py-5 lg:px-5 lg:py-4">
      {/*
        Sizing lives here, once. Below `md` everything stacks (grid-cols-1).
        At `md` (tablet) the doctor info / AI summary / actions each take a
        full row while countdown + symptoms share a row, instead of one long
        vertical stack. At `lg` the layout becomes the flex row from the
        desktop design, wrapping until `1440px` where it matches the Figma
        frame exactly. Child components stay width-agnostic (`w-full`) and
        simply fill whatever slot they're given here — no independent width
        assumptions inside them.
      */}
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-5 lg:flex lg:flex-row lg:flex-wrap lg:items-center lg:gap-5 min-[1440px]:flex-nowrap">
        <div className="min-w-0 md:col-span-2 lg:basis-[300px] lg:grow-0 lg:shrink-0">
          <DoctorInfo appointment={appointment} />
        </div>

        {hasCountdown && (
          <div className="flex min-w-0 justify-center md:justify-start lg:basis-[140px] lg:grow-0 lg:shrink-0">
            <CountdownTimer
              initialSeconds={appointment.startsInSeconds as number}
              dateTimeLabel={formatDateTimeLabel(appointment.schedule)}
            />
          </div>
        )}

        {hasSymptoms && (
          <div className="min-w-0 lg:basis-[200px] lg:grow-0 lg:shrink-0">
            <ReportedSymptoms symptoms={appointment.symptoms as string[]} />
          </div>
        )}

        {hasSummary && (
          <div className="min-w-0 md:col-span-2 lg:flex-1 lg:basis-[260px] lg:grow lg:shrink-0">
            <PreVisitSummary summary={appointment.aiSummary!} />
          </div>
        )}

        {/* Decorative — hidden below `lg` so it never eats mobile/tablet vertical space. */}
        {hasOrganIcon && (
          <div className="hidden lg:flex lg:basis-[120px] lg:grow-0 lg:shrink-0 lg:items-center lg:justify-center">
            <OrganIllustration icon={appointment.organIcon!} />
          </div>
        )}

        <div className="flex min-w-0 md:col-span-2 lg:ml-auto lg:basis-[140px] lg:grow-0 lg:shrink-0 lg:justify-end">
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
