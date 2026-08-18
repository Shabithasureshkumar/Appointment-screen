import { ClipboardList, CircleCheck } from 'lucide-react'

interface ReportedSymptomsProps {
  symptoms: string[]
}

export default function ReportedSymptoms({ symptoms }: ReportedSymptomsProps) {
  return (
    <div className="w-full rounded-xl border border-gray-100 bg-brand-50/60 p-[clamp(10px,1.6vw,16px)]">
      <div className="mb-[clamp(8px,1vw,10px)] flex items-center gap-1.5">
        <ClipboardList className="h-3.5 w-3.5 text-brand-700 sm:h-4 sm:w-4" strokeWidth={2} />
        <span className="font-manrope text-[clamp(11px,1.4vw,13px)] font-bold text-gray-800">Reported Symptoms</span>
      </div>
      {/* Mobile: compact wrapped chips instead of a tall one-per-line list — the vertical
          list (unchanged) returns at `sm`+. */}
      <ul className="flex flex-wrap gap-1.5 sm:flex-col sm:gap-2">
        {symptoms.map((symptom) => (
          <li
            key={symptom}
            className="flex items-center gap-1 rounded-full bg-white px-2 py-1 font-sora text-[10px] text-gray-600 sm:gap-1.5 sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0 sm:text-xs"
          >
            <CircleCheck className="h-3 w-3 shrink-0 text-brand-500 sm:h-3.5 sm:w-3.5" strokeWidth={2} />
            {symptom}
          </li>
        ))}
      </ul>
    </div>
  )
}
