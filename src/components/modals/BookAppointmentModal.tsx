import { useState, type FormEvent } from 'react'
import { CalendarPlus } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { DOCTORS } from '../../data/doctors'
import { buildScheduleFields } from '../../utils/scheduling'
import type { BookAppointmentInput } from '../../hooks/useAppointments'
import type { AppointmentMode } from '../../types/appointment'

interface BookAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onBook: (input: BookAppointmentInput) => void
}

function defaultDateTimeValue() {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  date.setHours(10, 0, 0, 0)
  return date.toISOString().slice(0, 16)
}

export default function BookAppointmentModal({ isOpen, onClose, onBook }: BookAppointmentModalProps) {
  const [doctorId, setDoctorId] = useState(DOCTORS[0].id)
  const [mode, setMode] = useState<AppointmentMode>(DOCTORS[0].defaultMode)
  const [dateTime, setDateTime] = useState(defaultDateTimeValue)

  const selectedDoctor = DOCTORS.find((doctor) => doctor.id === doctorId) ?? DOCTORS[0]

  const handleDoctorChange = (id: string) => {
    setDoctorId(id)
    const doctor = DOCTORS.find((entry) => entry.id === id)
    if (doctor) setMode(doctor.defaultMode)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const schedule = buildScheduleFields(dateTime)
    onBook({
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      experience: selectedDoctor.experience,
      doctorImage: selectedDoctor.image,
      organIcon: selectedDoctor.organIcon,
      mode,
      rating: selectedDoctor.rating,
      reviews: selectedDoctor.reviews,
      ...schedule,
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book Appointment"
      icon={<CalendarPlus className="h-5 w-5 text-brand-700" />}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="font-sora text-xs font-semibold text-gray-500">Doctor</span>
          <select
            value={doctorId}
            onChange={(event) => handleDoctorChange(event.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2.5 font-sora text-sm text-gray-800 focus:border-brand-700 focus:outline-none"
          >
            {DOCTORS.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} — {doctor.specialization}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-sora text-xs font-semibold text-gray-500">Date &amp; time</span>
          <input
            type="datetime-local"
            required
            value={dateTime}
            min={new Date().toISOString().slice(0, 16)}
            onChange={(event) => setDateTime(event.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-2.5 font-sora text-sm text-gray-800 focus:border-brand-700 focus:outline-none"
          />
        </label>

        <fieldset className="flex flex-col gap-1.5">
          <legend className="font-sora text-xs font-semibold text-gray-500">Appointment mode</legend>
          <div className="flex gap-2">
            {(['Video Call', 'In-person'] as const).map((option) => (
              <label
                key={option}
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 font-sora text-sm font-semibold transition-colors ${
                  mode === option ? 'border-brand-700 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-500'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  value={option}
                  checked={mode === option}
                  onChange={() => setMode(option)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <Button type="submit" variant="primary" size="lg" fullWidth>
          Confirm Booking
        </Button>
      </form>
    </Modal>
  )
}
