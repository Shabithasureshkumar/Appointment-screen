import { LogIn, X } from 'lucide-react'

interface AppointmentActionButtonsProps {
  onJoinNow: () => void
  onReschedule: () => void
  onClose: () => void
}

export default function AppointmentActionButtons({
  onJoinNow,
  onReschedule,
  onClose,
}: AppointmentActionButtonsProps) {
  return (
    <div className="flex w-full items-center justify-center gap-3">
      {/* Main Actions */}
      <div className="flex shrink-0 flex-col items-center gap-2">
        {/* Join Now */}
        <button
          type="button"
          onClick={onJoinNow}
          className="
            flex
            h-[40px]
            w-[128px]
            shrink-0
            items-center
            justify-center
            gap-2
            whitespace-nowrap
            rounded-full
            bg-brand-gradient-btn
            px-4
            font-sora
            text-[13px]
            font-semibold
            leading-none
            text-white
            shadow-[0_6px_16px_rgba(103,61,255,0.18)]
            transition-all
            duration-200
            hover:scale-[1.02]
            hover:shadow-[0_8px_20px_rgba(103,61,255,0.25)]
            active:scale-[0.98]
          "
        >
          <LogIn
            className="h-[14px] w-[14px] shrink-0"
            strokeWidth={2}
          />

          <span className="whitespace-nowrap">
            Join Now
          </span>
        </button>

        {/* Reschedule */}
        <button
          type="button"
          onClick={onReschedule}
          className="
            flex
            h-[40px]
            w-[128px]
            shrink-0
            items-center
            justify-center
            whitespace-nowrap
            rounded-full
            border
            border-[#E3DDF7]
            bg-white
            px-4
            font-sora
            text-[13px]
            font-semibold
            leading-none
            text-[#4A4A5A]
            transition-all
            duration-200
            hover:border-[#744BFF]
            hover:bg-[#F8F5FF]
            hover:text-[#5B32E8]
            active:scale-[0.98]
          "
        >
          Reschedule
        </button>
      </div>

      {/* Cancel */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Cancel appointment"
        className="
          group
          flex
          h-[34px]
          w-[34px]
          shrink-0
          items-center
          justify-center
          rounded-[10px]
          border
          border-[#DDD9EC]
          bg-white
          text-[#9A97A8]
          transition-all
          duration-200
          hover:border-[#FFB8B8]
          hover:bg-[#FFF1F1]
          hover:text-[#EF4444]
          active:scale-95
        "
      >
        <X
          className="
            h-[17px]
            w-[17px]
            transition-colors
            duration-200
            group-hover:text-[#EF4444]
          "
          strokeWidth={1.8}
        />
      </button>
    </div>
  )
}