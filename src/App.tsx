import { useState } from 'react'
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
import type { Appointment, AppointmentStatus } from './types/appointment'

const EMPTY_STATE_COPY: Record<AppointmentStatus, { title: string; subtitle: string }> = {
  upcoming: {
    title: 'No upcoming appointments',
    subtitle: 'Book a new appointment to see it show up here.',
  },
  past: {
    title: 'No past visits yet',
    subtitle: 'Completed appointments will appear here once you’ve had a visit.',
  },
  cancelled: {
    title: 'No cancelled appointments',
    subtitle: 'Anything you cancel from the Upcoming tab will show up here.',
  },
}

function App() {
  const {
    visibleAppointments,
    activeFilter,
    setActiveFilter,
    cancelAppointment,
    rescheduleAppointment,
    bookAppointment,
  } = useAppointments()

  const [isBookOpen, setBookOpen] = useState(false)
  const [isSymptomCheckerOpen, setSymptomCheckerOpen] = useState(false)
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(null)
  const [joinTarget, setJoinTarget] = useState<Appointment | null>(null)

  const emptyState = EMPTY_STATE_COPY[activeFilter]

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#F7F9FA]">
      <div className="mx-auto flex w-full max-w-[1580px] flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
        {/* Top Navigation */}
        <TopNavigation />

        {/* Hero + Summary Cards */}
        <section className="grid w-full grid-cols-1 gap-5 lg:grid-cols-[0.95fr_1.55fr]">
          <div className="min-w-0">
            <AppointmentHeader />
          </div>

          <div className="min-w-0">
            <AppointmentSummaryCards />
          </div>
        </section>

        {/* Filters + Actions */}
        <section className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <AppointmentFilters active={activeFilter} onChange={setActiveFilter} />

          <AppointmentActions
            onBookAppointment={() => setBookOpen(true)}
            onSymptomChecker={() => setSymptomCheckerOpen(true)}
          />
        </section>

        {/* Appointment Timeline */}
        <section className="w-full">
          {visibleAppointments.length > 0 ? (
            <AppointmentTimeline
              appointments={visibleAppointments}
              onCancel={cancelAppointment}
              onReschedule={setRescheduleTarget}
              onJoinNow={setJoinTarget}
              onBookFollowUp={() => setBookOpen(true)}
            />
          ) : (
            <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-[24px] border border-brand-mist bg-white text-center shadow-[0_8px_30px_rgba(70,50,120,0.04)]">
              <p className="font-manrope text-lg font-bold text-ink-900">{emptyState.title}</p>
              <p className="mt-1 font-sora text-sm text-ink-400">{emptyState.subtitle}</p>
            </div>
          )}
        </section>
      </div>

      <BookAppointmentModal isOpen={isBookOpen} onClose={() => setBookOpen(false)} onBook={bookAppointment} />

      <SymptomCheckerModal isOpen={isSymptomCheckerOpen} onClose={() => setSymptomCheckerOpen(false)} />

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
