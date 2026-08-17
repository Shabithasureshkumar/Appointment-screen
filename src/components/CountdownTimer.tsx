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
    <div className="flex w-full shrink-0 flex-col items-center gap-2">
      <span
        className={`font-sora text-[11px] font-bold tracking-wide ${isExpired ? 'text-emerald-600' : 'text-gray-400'}`}
      >
        {isExpired ? 'READY TO JOIN' : 'STARTS IN'}
      </span>
      <div
        className={`rounded-xl border px-5 py-2.5 shadow-soft ${
          isExpired ? 'border-emerald-200 bg-emerald-50' : 'border-brand-100 bg-brand-50'
        }`}
      >
        {isExpired ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-600" strokeWidth={2} />
        ) : (
          <span className="font-manrope text-xl font-extrabold tabular-nums text-brand-700">
            {formatTime(seconds)}
          </span>
        )}
      </div>
      <span className="text-center font-sora text-xs text-gray-400">{dateTimeLabel}</span>
    </div>
  )
}
