import { ClipboardList, CircleCheck } from 'lucide-react'

interface ReportedSymptomsProps {
  symptoms: string[]
}

export default function ReportedSymptoms({ symptoms }: ReportedSymptomsProps) {
  return (
    <div className="w-full rounded-xl border border-gray-100 bg-brand-50/60 p-4">
      <div className="mb-2.5 flex items-center gap-1.5">
        <ClipboardList className="h-4 w-4 text-brand-700" strokeWidth={2} />
        <span className="font-manrope text-[13px] font-bold text-gray-800">Reported Symptoms</span>
      </div>
      <ul className="flex flex-col gap-2">
        {symptoms.map((symptom) => (
          <li key={symptom} className="flex items-center gap-1.5 font-sora text-xs text-gray-600">
            <CircleCheck className="h-3.5 w-3.5 shrink-0 text-brand-500" strokeWidth={2} />
            {symptom}
          </li>
        ))}
      </ul>
    </div>
  )
}
