import { useMemo, useState } from 'react'
import TopNavigation from './components/TopNavigation'
import AppointmentHeader from './components/AppointmentHeader'
import AppointmentSummaryCards from './components/AppointmentSummaryCards'
import AppointmentFilters from './components/AppointmentFilters'
import AppointmentActions from './components/AppointmentActions'
import AppointmentTimeline from './components/AppointmentTimeline'
import { appointments as initialAppointments } from './data/appointments'
import type { AppointmentStatus } from './types/appointment'

function App() {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [activeFilter, setActiveFilter] =
    useState<AppointmentStatus>('upcoming')

  const visibleAppointments = useMemo(
    () =>
      appointments.filter(
        (appointment) => appointment.status === activeFilter,
      ),
    [appointments, activeFilter],
  )

  const handleCloseAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: 'cancelled' }
          : appointment,
      ),
    )
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#F7F9FA]">
      <div className="mx-auto flex w-full max-w-[1580px] flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8 xl:px-10">

        {/* Top Navigation */}
        <TopNavigation />

        {/* Hero + Summary Cards */}
        <section className="grid w-full grid-cols-1 gap-5 xl:grid-cols-[0.95fr_1.55fr]">

          {/* My Appointments */}
          <div className="min-w-0">
            <AppointmentHeader />
          </div>

          {/* Summary Cards */}
          <div className="min-w-0">
            <AppointmentSummaryCards />
          </div>
        </section>

        {/* Filters + Actions */}
        <section className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <AppointmentFilters
            active={activeFilter}
            onChange={setActiveFilter}
          />

          <AppointmentActions
            onBookAppointment={() => {}}
            onSymptomChecker={() => {}}
          />
        </section>

        {/* Appointment Timeline */}
        <section className="w-full">
          {visibleAppointments.length > 0 ? (
            <AppointmentTimeline
              appointments={visibleAppointments}
              onCloseAppointment={handleCloseAppointment}
            />
          ) : (
            <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-[24px] border border-[#ECE9FF] bg-white text-center shadow-[0_8px_30px_rgba(70,50,120,0.04)]">
              <p className="font-manrope text-lg font-bold text-[#25253A]">
                No appointments here
              </p>

              <p className="mt-1 font-sora text-sm text-[#9292A5]">
                There&apos;s nothing to show in this tab yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default App