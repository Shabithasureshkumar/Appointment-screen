import { CalendarPlus, Sparkles } from 'lucide-react'

interface AppointmentActionsProps {
  onBookAppointment: () => void
  onSymptomChecker: () => void
}

export default function AppointmentActions({ onBookAppointment, onSymptomChecker }: AppointmentActionsProps) {
  return (
    <div className="flex w-full items-center gap-3 sm:w-auto">
      <button
        onClick={onBookAppointment}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-gradient-btn px-6 py-3 font-sora text-sm font-semibold text-white shadow-card transition-transform hover:scale-[1.02] active:scale-[0.98] sm:flex-none"
      >
        <CalendarPlus className="h-4 w-4" />
        Book Appointment
      </button>
      <button
        onClick={onSymptomChecker}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-900 bg-white px-6 py-3 font-sora text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50 sm:flex-none"
      >
        <Sparkles className="h-4 w-4" />
        AI Symptom Checker
      </button>
    </div>
  )
}
