import { CalendarCheck, UserX, Ban } from 'lucide-react'
import Button from './ui/Button'
import type { AppointmentStatus } from '../types/appointment'

interface AppointmentFiltersProps {
  active: AppointmentStatus
  onChange: (status: AppointmentStatus) => void
}

const FILTERS: { key: AppointmentStatus; label: string; icon: typeof CalendarCheck }[] = [
  { key: 'upcoming', label: 'Upcoming', icon: CalendarCheck },
  { key: 'past', label: 'Past visit', icon: UserX },
  { key: 'cancelled', label: 'Cancelled', icon: Ban },
]

export default function AppointmentFilters({ active, onChange }: AppointmentFiltersProps) {
  return (
    <div className="flex w-full flex-wrap items-center gap-2 rounded-full border border-gray-100 bg-white p-1.5 shadow-soft sm:w-auto">
      {FILTERS.map(({ key, label, icon: Icon }) => {
        const isActive = active === key
        return (
          <Button
            key={key}
            variant={isActive ? 'primary' : 'ghost'}
            size="sm"
            icon={<Icon className="h-4 w-4" strokeWidth={2} />}
            onClick={() => onChange(key)}
            aria-pressed={isActive}
          >
            {label}
          </Button>
        )
      })}
    </div>
  )
}
