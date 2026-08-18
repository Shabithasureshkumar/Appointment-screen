import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface CountdownTimerProps {
  initialSeconds: number
  dateTimeLabel: string
}

function formatTime(totalSeconds: number) {
  const clamped = Math.max(0, totalSeconds)
  const hrs = Math.floor(clamped / 3600)
  const mins = Math.floor((clamped % 3600) / 60)
  const secs = clamped % 60
  return [hrs, mins, secs].map((n) => String(n).padStart(2, '0')).join(':')
}

export default function CountdownTimer({ initialSeconds, dateTimeLabel }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    setSeconds(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((current) => (current > 0 ? current - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const isExpired = seconds <= 0

  return (
    // Mobile: a single compact row (label — pill), matching the Figma card's condensed
    // countdown treatment. `justify-start` keeps the label and pill hugging each other —
    // `justify-between` previously stretched them across the whole half-width column,
    // opening a large dead gap before the organ illustration beside it. The full
    // "STARTS IN / pill / date+time" 3-line stack — and the date+time line itself, which
    // would otherwise repeat the date already shown in the mobile timeline heading above
    // the card — only returns at `sm`+ (tablet/desktop), unchanged from before.
    <div className="flex w-full shrink-0 flex-row items-center justify-start gap-2 sm:flex-col sm:items-center sm:justify-center sm:gap-2">
      <span
        className={`shrink-0 font-sora text-[11px] font-bold tracking-wide ${isExpired ? 'text-emerald-600' : 'text-gray-400'}`}
      >
        {isExpired ? 'READY TO JOIN' : 'STARTS IN'}
      </span>
      <div
        className={`shrink-0 rounded-xl border px-[clamp(14px,2.5vw,20px)] py-[clamp(8px,1.2vw,10px)] shadow-soft ${
          isExpired ? 'border-emerald-200 bg-emerald-50' : 'border-brand-100 bg-brand-50'
        }`}
      >
        {isExpired ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-600" strokeWidth={2} />
        ) : (
          <span className="font-manrope text-[clamp(16px,2.2vw,20px)] font-extrabold tabular-nums text-brand-700">
            {formatTime(seconds)}
          </span>
        )}
      </div>
      <span className="hidden text-center font-sora text-xs text-gray-400 sm:block">{dateTimeLabel}</span>
    </div>
  )
}
