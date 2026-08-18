import { useState } from 'react'
import { Sparkles, ChevronDown } from 'lucide-react'
import type { AiSummary } from '../types/appointment'

interface PreVisitSummaryProps {
  summary: AiSummary
}

export default function PreVisitSummary({ summary }: PreVisitSummaryProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex w-full items-start gap-[clamp(10px,1.4vw,12px)] rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-[clamp(12px,1.8vw,16px)]">
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" strokeWidth={2} />
      <div className="flex flex-1 flex-col gap-1.5">
        <p className="font-manrope text-sm font-bold text-brand-900">{summary.title}</p>
        <p className="font-sora text-xs leading-snug text-gray-500">{summary.description}</p>

        {expanded && (
          <p className="mt-1 rounded-lg bg-white/70 p-2 font-sora text-xs leading-snug text-brand-900">
            {summary.detail}
          </p>
        )}

        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-1 flex w-fit items-center gap-0.5 rounded-full bg-brand-gradient-btn px-3.5 py-1.5 font-sora text-xs font-semibold text-white"
        >
          {expanded ? 'hide' : 'view'}
          <ChevronDown className={`h-3 w-3 transition-transform duration-150 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  )
}
