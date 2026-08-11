import { useEffect, useState } from 'react'

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
    if (seconds <= 0) return
    const timer = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(timer)
  }, [seconds])

  return (
    <div className="flex shrink-0 flex-col items-center gap-2 lg:w-[140px] lg:flex-none">
      <span className="font-sora text-[11px] font-bold tracking-wide text-gray-400">STARTS IN</span>
      <div className="rounded-xl border border-brand-100 bg-brand-50 px-5 py-2.5 shadow-soft">
        <span className="font-manrope text-xl font-extrabold tabular-nums text-brand-700">{formatTime(seconds)}</span>
      </div>
      <span className="text-center font-sora text-xs text-gray-400">{dateTimeLabel}</span>
    </div>
  )
}
