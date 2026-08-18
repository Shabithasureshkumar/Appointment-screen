import { useMemo, useState } from 'react'
import TopNavigation from './components/TopNavigation'
import AppointmentHeader from './components/AppointmentHeader'
import AppointmentSummaryCards from './components/AppointmentSummaryCards'
import AppointmentFilters from './components/AppointmentFilters'
import AppointmentActions from './components/AppointmentActions'
import AppointmentTimeline from './components/AppointmentTimeline'
import BookAppointmentModal from './components/modals/BookAppointmentModal'
import SymptomCheckerModal from './components/modals/SymptomCheckerModal'
import RescheduleModal from './components/modals/RescheduleModal'
import JoinConsultationModal from './components/modals/JoinConsultationModal'
import { useAppointments } from './hooks/useAppointments'
import { formatDateTimeLabel } from './utils/scheduling'
import type { Appointment, AppointmentStatus } from './types/appointment'

const EMPTY_STATE_COPY: Record<
  AppointmentStatus,
  { title: string; subtitle: string }
> = {
  upcoming: {
    title: 'No upcoming appointments',
    subtitle: 'Book a new appointment to see it show up here.',
  },
  past: {
    title: 'No past visits yet',
    subtitle:
      'Completed appointments will appear here once you’ve had a visit.',
  },
  cancelled: {
    title: 'No cancelled appointments',
    subtitle:
      'Anything you cancel from the Upcoming tab will show up here.',
  },
}

const NO_MATCH_COPY = {
  title: 'No matching appointments',
  subtitle: 'Try a different doctor name or specialty.',
}

function App() {
  const {
    appointments,
    visibleAppointments,
    activeFilter,
    setActiveFilter,
    cancelAppointment,
    rescheduleAppointment,
    bookAppointment,
  } = useAppointments()

  const [isBookOpen, setBookOpen] = useState(false)
  const [isSymptomCheckerOpen, setSymptomCheckerOpen] = useState(false)
  const [rescheduleTarget, setRescheduleTarget] =
    useState<Appointment | null>(null)
  const [joinTarget, setJoinTarget] = useState<Appointment | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const searchedAppointments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return visibleAppointments
    }

    return visibleAppointments.filter(
      (appointment) =>
        appointment.doctorName.toLowerCase().includes(query) ||
        appointment.specialization.toLowerCase().includes(query),
    )
  }, [visibleAppointments, searchQuery])

  const notifications = useMemo(
    () =>
      appointments
        .filter((appointment) => appointment.status === 'upcoming')
        .map((appointment) => ({
          id: appointment.id,
          doctorName: appointment.doctorName,
          label: formatDateTimeLabel(appointment.schedule),
        })),
    [appointments],
  )

  const emptyState =
    searchQuery.trim() && searchedAppointments.length === 0
      ? NO_MATCH_COPY
      : EMPTY_STATE_COPY[activeFilter]

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#F7F9FA]">
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1580px]
          flex-col
          gap-[clamp(16px,2vw,24px)]
          px-[clamp(12px,2vw,40px)]
          py-[clamp(16px,2vw,20px)]
        "
      >
        {/* Top Navigation */}
        <TopNavigation
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          notifications={notifications}
        />

        {/* Hero + Summary Cards */}
        <section
          className="
            grid
            w-full
            min-w-0
            grid-cols-1
            gap-[clamp(12px,1.5vw,20px)]
            lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.55fr)]
          "
        >
          <div className="min-w-0">
            <AppointmentHeader />
          </div>

          <div className="min-w-0">
            <AppointmentSummaryCards />
          </div>
        </section>

        {/* Filters + Actions */}
        <section
          className="
            flex
            w-full
            min-w-0
            flex-col
            gap-[clamp(12px,1.5vw,16px)]
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <AppointmentFilters
            active={activeFilter}
            onChange={setActiveFilter}
          />

          <AppointmentActions
            onBookAppointment={() => setBookOpen(true)}
            onSymptomChecker={() => setSymptomCheckerOpen(true)}
          />
        </section>

        {/* Appointment Timeline */}
        <section className="w-full min-w-0">
          {searchedAppointments.length > 0 ? (
            <AppointmentTimeline
              appointments={searchedAppointments}
              onCancel={cancelAppointment}
              onReschedule={setRescheduleTarget}
              onJoinNow={setJoinTarget}
              onBookFollowUp={() => setBookOpen(true)}
            />
          ) : (
            <div
              className="
                flex
                min-h-[300px]
                w-full
                flex-col
                items-center
                justify-center
                rounded-[24px]
                border
                border-brand-mist
                bg-white
                px-5
                text-center
                shadow-[0_8px_30px_rgba(70,50,120,0.04)]
              "
            >
              <p className="font-manrope text-lg font-bold text-ink-900">
                {emptyState.title}
              </p>

              <p className="mt-1 font-sora text-sm text-ink-400">
                {emptyState.subtitle}
              </p>
            </div>
          )}
        </section>
      </div>

      <BookAppointmentModal
        isOpen={isBookOpen}
        onClose={() => setBookOpen(false)}
        onBook={bookAppointment}
      />

      <SymptomCheckerModal
        isOpen={isSymptomCheckerOpen}
        onClose={() => setSymptomCheckerOpen(false)}
      />

      <RescheduleModal
        isOpen={rescheduleTarget !== null}
        onClose={() => setRescheduleTarget(null)}
        appointment={rescheduleTarget}
        onConfirm={rescheduleAppointment}
      />

      <JoinConsultationModal
        isOpen={joinTarget !== null}
        onClose={() => setJoinTarget(null)}
        appointment={joinTarget}
      />
    </main>
  )
}

export default App