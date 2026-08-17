import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

interface SymptomCheckerModalProps {
  isOpen: boolean
  onClose: () => void
}

const COMMON_SYMPTOMS = [
  'Fever',
  'Headache',
  'Chest Pain',
  'Shortness of Breath',
  'Fatigue',
  'Dizziness',
  'Nausea',
  'Joint Pain',
]

export default function SymptomCheckerModal({ isOpen, onClose }: SymptomCheckerModalProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [summary, setSummary] = useState<string | null>(null)

  const toggleSymptom = (symptom: string) => {
    setSelected((prev) => (prev.includes(symptom) ? prev.filter((entry) => entry !== symptom) : [...prev, symptom]))
    setSummary(null)
  }

  const handleGenerate = () => {
    if (selected.length === 0 && !notes.trim()) {
      setSummary('Select at least one symptom or describe how you feel to get an insight.')
      return
    }
    const symptomList = selected.length > 0 ? selected.join(', ') : 'no specific symptoms selected'
    const notesPart = notes.trim() ? ` Additional notes: "${notes.trim()}".` : ''
    setSummary(
      `Based on ${symptomList}, this looks worth discussing with a doctor. Consider booking a consultation so a specialist can review it in detail.${notesPart}`,
    )
  }

  const handleClose = () => {
    setSelected([])
    setNotes('')
    setSummary(null)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="AI Symptom Checker"
      icon={<Sparkles className="h-5 w-5 text-brand-700" />}
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 font-sora text-xs font-semibold text-gray-500">Select what you&apos;re experiencing</p>
          <div className="flex flex-wrap gap-2">
            {COMMON_SYMPTOMS.map((symptom) => {
              const isSelected = selected.includes(symptom)
              return (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => toggleSymptom(symptom)}
                  className={`rounded-full border px-3 py-1.5 font-sora text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'border-brand-700 bg-brand-50 text-brand-700'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {symptom}
                </button>
              )
            })}
          </div>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="font-sora text-xs font-semibold text-gray-500">Anything else to add?</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            placeholder="Describe how you're feeling..."
            className="resize-none rounded-xl border border-gray-200 px-3 py-2.5 font-sora text-sm text-gray-800 focus:border-brand-700 focus:outline-none"
          />
        </label>

        {summary && (
          <div className="rounded-xl border border-brand-100 bg-brand-50/60 p-3 font-sora text-sm leading-snug text-brand-900">
            {summary}
          </div>
        )}

        <Button variant="primary" size="lg" fullWidth onClick={handleGenerate}>
          Get Insight
        </Button>
      </div>
    </Modal>
  )
}
