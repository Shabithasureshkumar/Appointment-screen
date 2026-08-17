import { CalendarPlus, Sparkles } from 'lucide-react'
import Button from './ui/Button'

interface AppointmentActionsProps {
  onBookAppointment: () => void
  onSymptomChecker: () => void
}

export default function AppointmentActions({ onBookAppointment, onSymptomChecker }: AppointmentActionsProps) {
  return (
    <div className="flex w-full items-center gap-3 sm:w-auto">
      <Button
        variant="primary"
        size="lg"
        icon={<CalendarPlus className="h-4 w-4" />}
        onClick={onBookAppointment}
        className="flex-1 sm:flex-none"
      >
        Book Appointment
      </Button>
      <Button
        variant="secondary"
        size="lg"
        icon={<Sparkles className="h-4 w-4" />}
        onClick={onSymptomChecker}
        className="flex-1 sm:flex-none"
      >
        AI Symptom Checker
      </Button>
    </div>
  )
}
