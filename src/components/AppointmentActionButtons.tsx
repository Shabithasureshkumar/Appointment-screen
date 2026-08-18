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
    // Mobile/tablet: Join Now, Reschedule and Close are three DIRECT items of one
    // `flex-wrap` row (the `contents` wrapper below removes its own box from the layout
    // tree, so its two buttons participate in this row directly, not as a nested group).
    // Each button carries `flex-1` + a `min-w`, so if all three fit, they share the row
    // proportionally; if they don't, standard flex-wrap drops one to its own line — and
    // because that button still has `flex-1` there, it fills that entire line's width
    // rather than sitting at its shrunk intrinsic size with dead space beside it. The
    // Close (X) button never grows (`shrink-0`, no flex-1), so it stays a fixed 34px
    // square whichever line it ends up on.
    //
    // Desktop (`lg`): the wrapper becomes a real `flex-col` box again (128px column,
    // Join Now above Reschedule) sitting beside Close — reproducing the original
    // approved desktop layout pixel-for-pixel.
    <div className="flex w-full flex-wrap items-stretch gap-[clamp(8px,1.4vw,12px)] lg:w-auto lg:flex-nowrap">
      <div className="contents lg:flex lg:w-[128px] lg:flex-none lg:flex-col lg:gap-2">
        <Button
          variant="primary"
          size="md"
          wrap
          icon={<LogIn className="h-[14px] w-[14px] shrink-0" />}
          onClick={onJoinNow}
          className="min-w-[92px] flex-1 lg:min-w-0 lg:w-full lg:flex-none"
        >
          Join Now
        </Button>
        <Button
          variant="outline"
          size="md"
          wrap
          onClick={onReschedule}
          className="min-w-[92px] flex-1 lg:min-w-0 lg:w-full lg:flex-none"
        >
          Reschedule
        </Button>
      </div>

      <Button
        variant="danger"
        size="icon"
        onClick={onCancel}
        aria-label="Cancel appointment"
        className="shrink-0 self-center lg:self-auto"
      >
        <X className="h-[17px] w-[17px]" strokeWidth={1.8} />
      </Button>
    </div>
  )
}
