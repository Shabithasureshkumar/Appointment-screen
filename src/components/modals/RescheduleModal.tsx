import { useState, type FormEvent } from 'react'
import { CalendarClock } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { buildScheduleFields, toDateTimeLocalValue, type ScheduleFields } from '../../utils/scheduling'
import type { Appointment } from '../../types/appointment'

interface RescheduleModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment | null
  onConfirm: (id: string, schedule: ScheduleFields) => void
}

function defaultDateTimeValue() {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  date.setHours(10, 0, 0, 0)
  return toDateTimeLocalValue(date)
}

export default function RescheduleModal({ isOpen, onClose, appointment, onConfirm }: RescheduleModalProps) {
  const [dateTime, setDateTime] = useState(defaultDateTimeValue)

  if (!appointment) return null

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onConfirm(appointment.id, buildScheduleFields(dateTime))
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reschedule Appointment"
      icon={<CalendarClock className="h-5 w-5 text-brand-700" />}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="font-sora text-sm text-gray-500">
          Choose a new time for your appointment with{' '}
          <span className="font-semibold text-gray-800">{appointment.doctorName}</span>.
        </p>

        <label className="flex flex-col gap-1.5">
          <span className="font-sora text-xs font-semibold text-gray-500">New date &amp; time</span>
          <input
            type="datetime-local"
            required
            value={dateTime}
            min={toDateTimeLocalValue(new Date())}
            onChange={(event) => setDateTime(event.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2.5 font-sora text-sm text-gray-800 focus:border-brand-700 focus:outline-none"
          />
        </label>

        <Button type="submit" variant="primary" size="lg" fullWidth>
          Confirm New Time
        </Button>
      </form>
    </Modal>
  )
}
