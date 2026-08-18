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
    // `flex-nowrap` + `flex-1` per tab: all three stay on one row (matching Figma) at every
    // width down to 320px instead of wrapping into a ragged second line.
    <div className="flex w-full flex-nowrap items-center gap-1 rounded-full border border-gray-100 bg-white p-1.5 shadow-soft sm:w-auto sm:gap-2">
      {FILTERS.map(({ key, label, icon: Icon }) => {
        const isActive = active === key
        return (
          <Button
            key={key}
            variant={isActive ? 'primary' : 'ghost'}
            size="sm"
            wrap
            icon={<Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} />}
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            className="min-w-0 flex-1 sm:flex-none"
          >
            {label}
          </Button>
        )
      })}
    </div>
  )
}
