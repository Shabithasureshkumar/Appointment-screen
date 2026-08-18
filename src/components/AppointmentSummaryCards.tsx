import { RefreshCcw, CircleCheckBig } from 'lucide-react'
import AppointmentSummaryCard from './AppointmentSummaryCard'
import HealthTrendCard from './HealthTrendCard'

export default function AppointmentSummaryCards() {
  return (
    <div
      className="
        grid
        w-full
        min-w-0
        grid-cols-2
        gap-[clamp(8px,1.2vw,16px)]
        min-[900px]:grid-cols-3
      "
    >
      <div className="min-h-0 min-w-0">
        <AppointmentSummaryCard
          icon={RefreshCcw}
          label="Upcoming"
          value="02"
          suffix="Scheduled"
          progress={40}
        />
      </div>

      <div className="min-h-0 min-w-0">
        <AppointmentSummaryCard
          icon={CircleCheckBig}
          label="Completed Appointments"
          value="15"
          suffix="This Month"
          progress={75}
        />
      </div>

      <div
        className="
          col-span-2
          min-h-0
          min-w-0
          min-[900px]:col-span-1
        "
      >
        <HealthTrendCard />
      </div>
    </div>
  )
}