import type { LucideIcon } from 'lucide-react'

interface AppointmentSummaryCardProps {
  icon: LucideIcon
  label: string
  value: string
  suffix: string
  progress: number
}

export default function AppointmentSummaryCard({ icon: Icon, label, value, suffix, progress }: AppointmentSummaryCardProps) {
  return (
    <div className="flex h-full min-h-[174px] w-full flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-soft">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700">
        <Icon className="h-5 w-5 text-white" strokeWidth={2} />
      </div>
      <p className="font-manrope text-sm font-bold text-gray-500">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="font-manrope text-2xl font-extrabold text-gray-900">{value}</span>
        <span className="font-sora text-sm text-gray-400">{suffix}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-brand-gradient-btn" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
