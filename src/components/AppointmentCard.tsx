import type { Appointment } from '../types/appointment'
import DoctorInfo from './DoctorInfo'
import CountdownTimer from './CountdownTimer'
import ReportedSymptoms from './ReportedSymptoms'
import PreVisitSummary from './PreVisitSummary'
import OrganIllustration from './OrganIllustration'
import AppointmentActionButtons from './AppointmentActionButtons'

interface AppointmentCardProps {
  appointment: Appointment
  onClose: (id: string) => void
}

export default function AppointmentCard({
  appointment,
  onClose,
}: AppointmentCardProps) {
  return (
    <article
      className="
        appointment-card
        w-full
        rounded-[24px]
        border border-[#E7DDFF]
        bg-white
        px-4
        py-4
        sm:px-5
        sm:py-5
        lg:px-5
        lg:py-4
        xl:px-5
        xl:py-4
      "
    >
      <div
        className="
          grid
          w-full
          items-center

          gap-y-4
          gap-x-4

          lg:grid-cols-[minmax(300px,1.7fr)_145px_minmax(175px,1fr)_minmax(240px,1.35fr)_110px_140px]

          xl:grid-cols-[minmax(310px,1.65fr)_150px_minmax(185px,1fr)_minmax(250px,1.4fr)_120px_145px]

          2xl:grid-cols-[minmax(330px,1.7fr)_155px_minmax(195px,1fr)_minmax(270px,1.45fr)_125px_150px]

          xl:gap-x-5
          2xl:gap-x-6
        "
      >
        {/* Doctor Information */}
        <div className="min-w-0">
          <DoctorInfo appointment={appointment} />
        </div>

        {/* Countdown */}
        <div className="flex min-w-0 justify-center">
          <CountdownTimer
            initialSeconds={appointment.startsInSeconds}
            dateTimeLabel={appointment.dateTimeLabel}
          />
        </div>

        {/* Reported Symptoms */}
        <div className="min-w-0">
          <ReportedSymptoms symptoms={appointment.symptoms} />
        </div>

        {/* AI Pre Visit Summary */}
        <div className="min-w-0">
          <PreVisitSummary onView={() => {}} />
        </div>

        {/* Organ / Medical Illustration */}
        <div className="flex min-h-[110px] w-full items-center justify-center">
          <OrganIllustration icon={appointment.organIcon} />
        </div>

        {/* Actions */}
        <div className="flex min-w-0 justify-end">
          <AppointmentActionButtons
            onJoinNow={() => {}}
            onReschedule={() => {}}
            onClose={() => onClose(appointment.id)}
          />
        </div>
      </div>
    </article>
  )
}