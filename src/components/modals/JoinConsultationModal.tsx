import { LogIn, MapPin, Video } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import type { Appointment } from '../../types/appointment'

interface JoinConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment | null
}

export default function JoinConsultationModal({ isOpen, onClose, appointment }: JoinConsultationModalProps) {
  if (!appointment) return null

  const isVideoCall = appointment.mode === 'Video Call'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isVideoCall ? 'Video Consultation' : 'Check-in Confirmed'}
      icon={<LogIn className="h-5 w-5 text-brand-700" />}
    >
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <img src={appointment.doctorImage} alt={appointment.doctorName} className="h-20 w-20 rounded-full object-cover" />

        <div>
          <p className="font-manrope text-base font-bold text-gray-900">{appointment.doctorName}</p>
          <p className="font-sora text-sm text-gray-500">{appointment.specialization}</p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 font-sora text-sm font-semibold text-brand-700">
          {isVideoCall ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
          {isVideoCall ? "You're connected" : 'Check-in confirmed at the front desk'}
        </div>

        <Button variant="outline" size="md" onClick={onClose} fullWidth>
          {isVideoCall ? 'Leave Call' : 'Close'}
        </Button>
      </div>
    </Modal>
  )
}
