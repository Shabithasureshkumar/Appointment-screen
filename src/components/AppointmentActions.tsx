import { CalendarPlus, Sparkles } from 'lucide-react'
import Button from './ui/Button'

interface AppointmentActionsProps {
  onBookAppointment: () => void
  onSymptomChecker: () => void
}

export default function AppointmentActions({ onBookAppointment, onSymptomChecker }: AppointmentActionsProps) {
  return (
    <div className="flex w-full items-stretch gap-3 sm:w-auto sm:items-center">
      <Button
        variant="primary"
        size="lg"
        wrap
        icon={<CalendarPlus className="h-4 w-4 shrink-0" />}
        onClick={onBookAppointment}
        className="min-w-0 flex-1 sm:flex-none"
      >
        Book Appointment
      </Button>
      <Button
        variant="secondary"
        size="lg"
        wrap
        icon={<Sparkles className="h-4 w-4 shrink-0" />}
        onClick={onSymptomChecker}
        className="min-w-0 flex-1 sm:flex-none"
      >
        AI Symptom Checker
      </Button>
    </div>
  )
}
