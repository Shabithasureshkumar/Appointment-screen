import { useEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { CalendarDays, CircleCheck, CircleX, Clock, History } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { AppointmentStatus } from '../types/appointment'

interface AppointmentFiltersProps {
  active: AppointmentStatus
  onChange: (status: AppointmentStatus) => void
  /** Number of appointments per status, shown beside each tab label. */
  counts: Record<AppointmentStatus, number>
  /** `id` of the element these tabs control (the appointment list). */
  panelId: string
}

// Keep in sync with the `aria-labelledby` on the list panel in App.tsx.
const TAB_ID_PREFIX = 'appointment-tab-'

const TABS: { key: AppointmentStatus; label: string; icon: LucideIcon }[] = [
  { key: 'upcoming', label: 'Upcoming', icon: CalendarDays },
  { key: 'past', label: 'Past Visit', icon: History },
  { key: 'cancelled', label: 'Cancelled', icon: CircleX },
  { key: 'pending', label: 'Pending', icon: Clock },
  { key: 'completed', label: 'Completed', icon: CircleCheck },
]

export default function AppointmentFilters({ active, onChange, counts, panelId }: AppointmentFiltersProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Partial<Record<AppointmentStatus, HTMLButtonElement | null>>>({})

  // On narrow screens the pill scrolls horizontally, so keep the selected tab in view.
  // Scrolls only the pill itself (never the page, unlike `scrollIntoView`).
  useEffect(() => {
    const list = listRef.current
    const tab = tabRefs.current[active]
    if (!list || !tab) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }, [active])

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % TABS.length
        break
      case 'ArrowLeft':
        nextIndex = (index - 1 + TABS.length) % TABS.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = TABS.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    const next = TABS[nextIndex].key
    onChange(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Appointment status"
      // One rounded pill. `overflow-x-auto` lets the five tabs scroll sideways inside it on
      // narrow screens (scrollbar hidden) instead of squeezing or wrapping; from `sm` the pill
      // hugs its content.
      className="relative flex min-w-0 max-w-full items-center gap-1 overflow-x-auto rounded-full border border-gray-100 bg-white p-1.5 font-inter shadow-soft [scrollbar-width:none] sm:self-start [&::-webkit-scrollbar]:hidden"
    >
      {TABS.map(({ key, label, icon: Icon }, index) => {
        const isActive = active === key

        return (
          <button
            key={key}
            ref={(node) => {
              tabRefs.current[key] = node
            }}
            type="button"
            role="tab"
            id={`${TAB_ID_PREFIX}${key}`}
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(key)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={[
              'group relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2.5 text-sm font-semibold leading-none',
              'transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]',
              isActive ? 'text-white' : 'text-ink-900 hover:bg-brand-50',
            ].join(' ')}
          >
            {/* Gradient lives on its own layer so it can fade in/out — a gradient can't be
                transitioned from `transparent` directly. */}
            <span
              aria-hidden="true"
              className={[
                'absolute inset-0 rounded-full bg-[linear-gradient(135deg,#7C3AED_0%,#5B21B6_100%)] shadow-[0_6px_16px_rgba(91,33,182,0.32)] transition-opacity duration-300',
                isActive ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            />

            <Icon
              aria-hidden="true"
              strokeWidth={2}
              className={[
                'relative h-4 w-4 shrink-0 transition-colors duration-300',
                isActive ? 'text-white' : 'text-ink-400 group-hover:text-brand-700',
              ].join(' ')}
            />

            <span className="relative">{label}</span>

            <span
              className={[
                'relative inline-flex min-w-[22px] items-center justify-center rounded-full px-1.5 py-1 text-xs font-bold leading-none tabular-nums transition-colors duration-300',
                isActive ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand-700',
              ].join(' ')}
            >
              {counts[key]}
              <span className="sr-only">{counts[key] === 1 ? ' appointment' : ' appointments'}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
