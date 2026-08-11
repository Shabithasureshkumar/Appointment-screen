import { Sparkles, ChevronRight } from 'lucide-react'

interface PreVisitSummaryProps {
  onView: () => void
}

export default function PreVisitSummary({ onView }: PreVisitSummaryProps) {
  return (
    <div className="flex w-full items-start gap-3 rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-4 lg:w-[260px] lg:flex-none">
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" strokeWidth={2} />
      <div className="flex flex-1 flex-col gap-1.5">
        <p className="font-manrope text-sm font-bold text-brand-900">Pre-visit summary ready</p>
        <p className="font-sora text-xs leading-snug text-gray-500">
          AI has synthesized your last 3 blood results for the doctor to review.
        </p>
        <button
          onClick={onView}
          className="mt-1 flex w-fit items-center gap-0.5 rounded-full bg-brand-gradient-btn px-3.5 py-1.5 font-sora text-xs font-semibold text-white"
        >
          view <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
