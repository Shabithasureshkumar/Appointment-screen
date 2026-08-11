import { RefreshCcw, CircleCheckBig } from 'lucide-react'
import AppointmentSummaryCard from './AppointmentSummaryCard'
import HealthTrendCard from './HealthTrendCard'

export default function AppointmentSummaryCards() {
  return (
    <div
      className="
        grid
        w-full
        grid-cols-1
        gap-4
        sm:grid-cols-3
        sm:auto-rows-[174px]
      "
    >
      <div className="h-full min-h-0 min-w-0">
        <AppointmentSummaryCard
          icon={RefreshCcw}
          label="Upcoming"
          value="02"
          suffix="Scheduled"
          progress={40}
        />
      </div>

      <div className="h-full min-h-0 min-w-0">
        <AppointmentSummaryCard
          icon={CircleCheckBig}
          label="Completed Appointments"
          value="15"
          suffix="This Month"
          progress={75}
        />
      </div>

      <div className="h-full min-h-0 min-w-0">
        <HealthTrendCard />
      </div>
    </div>
  )
}