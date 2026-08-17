import { LogIn, X, CalendarPlus } from 'lucide-react'
import Button from './ui/Button'
import Badge from './ui/Badge'
import type { AppointmentStatus } from '../types/appointment'

interface AppointmentActionButtonsProps {
  status: AppointmentStatus
  onJoinNow: () => void
  onReschedule: () => void
  onCancel: () => void
  onBookFollowUp: () => void
}

export default function AppointmentActionButtons({
  status,
  onJoinNow,
  onReschedule,
  onCancel,
  onBookFollowUp,
}: AppointmentActionButtonsProps) {
  if (status === 'cancelled') {
    return (
      <div className="flex w-full flex-col items-start gap-2 sm:w-auto sm:items-end">
        <Badge variant="danger">Cancelled</Badge>
        <Button variant="outline" size="md" onClick={onReschedule} className="w-full sm:w-[128px]">
          Reschedule
        </Button>
      </div>
    )
  }

  if (status === 'past') {
    return (
      <div className="flex w-full flex-col items-start gap-2 sm:w-auto sm:items-end">
        <Badge variant="neutral">Completed</Badge>
        <Button
          variant="outline"
          size="md"
          icon={<CalendarPlus className="h-3.5 w-3.5" />}
          onClick={onBookFollowUp}
          className="w-full sm:w-[128px]"
        >
          Book Follow-up
        </Button>
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-center gap-3 sm:w-auto">
      <div className="flex flex-1 flex-col gap-2 sm:w-[128px] sm:flex-none">
        <Button
          variant="primary"
          size="md"
          icon={<LogIn className="h-[14px] w-[14px]" />}
          onClick={onJoinNow}
          fullWidth
        >
          Join Now
        </Button>
        <Button variant="outline" size="md" onClick={onReschedule} fullWidth>
          Reschedule
        </Button>
      </div>

      <Button variant="danger" size="icon" onClick={onCancel} aria-label="Cancel appointment">
        <X className="h-[17px] w-[17px]" strokeWidth={1.8} />
      </Button>
    </div>
  )
}
