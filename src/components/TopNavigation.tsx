import { useEffect, useRef, useState } from 'react'
import { LayoutGrid, CalendarDays, Users, FileText, MessageSquare, Receipt, Search, Settings, Bell, Menu, X, CalendarClock } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutGrid, implemented: false },
  { label: 'Appointment', icon: CalendarDays, implemented: true },
  { label: 'Patient', icon: Users, implemented: false },
  { label: 'Reports', icon: FileText, implemented: false },
  { label: 'Chats', icon: MessageSquare, implemented: false },
  { label: 'Billing', icon: Receipt, implemented: false },
]

export interface NotificationItem {
  id: string
  doctorName: string
  label: string
}

interface TopNavigationProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  notifications: NotificationItem[]
}

type Panel = 'search' | 'settings' | 'notifications' | null

export default function TopNavigation({ searchQuery, onSearchChange, notifications }: TopNavigationProps) {
  const [active] = useState('Appointment')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openPanel, setOpenPanel] = useState<Panel>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!openPanel) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenPanel(null)
    }
    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenPanel(null)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [openPanel])

  const togglePanel = (panel: Exclude<Panel, null>) => {
    setOpenPanel((current) => (current === panel ? null : panel))
  }

  return (
    <nav
      ref={navRef}
      className="relative flex w-full items-center justify-between gap-4 rounded-full border border-gray-100 bg-white px-3 py-2 shadow-soft"
    >
      <div className="flex items-center gap-1">
        {NAV_ITEMS.map(({ label, icon: Icon, implemented }) => {
          const isActive = active === label
          return (
            <button
              key={label}
              type="button"
              disabled={!implemented}
              aria-disabled={!implemented}
              title={implemented ? undefined : `${label} isn't part of this screen yet`}
              className={`hidden items-center gap-2 rounded-full px-4 py-2.5 font-sora text-sm font-semibold transition-colors lg:flex ${
                isActive
                  ? 'bg-brand-gradient-btn text-white shadow-card'
                  : implemented
                    ? 'text-gray-600 hover:bg-gray-50'
                    : 'cursor-not-allowed text-gray-300'
              }`}
            >
              {isActive && <Icon className="h-4 w-4" strokeWidth={2} />}
              {label}
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-haspopup="true"
          className="flex items-center gap-2 rounded-full bg-brand-gradient-btn px-3 py-2.5 font-sora text-sm font-semibold text-white shadow-card lg:hidden"
        >
          <CalendarDays className="h-4 w-4 shrink-0" />
          {active}
        </button>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => togglePanel('search')}
            aria-expanded={openPanel === 'search'}
            aria-haspopup="true"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              openPanel === 'search' ? 'bg-brand-50 text-brand-700' : 'text-gray-500 hover:bg-gray-50'
            }`}
            aria-label="Search appointments"
          >
            <Search className="h-5 w-5" />
          </button>

          {openPanel === 'search' && (
            <div className="absolute right-0 top-12 z-20 w-72 rounded-2xl border border-gray-100 bg-white p-3 shadow-card">
              <label className="flex flex-col gap-1.5">
                <span className="font-sora text-xs font-semibold text-gray-500">Search by doctor or specialty</span>
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder="e.g. Sarah Jenkins, Cardiologist"
                  className="rounded-xl border border-gray-200 px-3 py-2 font-sora text-sm text-gray-800 focus:border-brand-700 focus:outline-none"
                />
              </label>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="mt-2 font-sora text-xs font-semibold text-brand-700 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => togglePanel('settings')}
            aria-expanded={openPanel === 'settings'}
            aria-haspopup="true"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              openPanel === 'settings' ? 'bg-brand-50 text-brand-700' : 'text-gray-500 hover:bg-gray-50'
            }`}
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>

          {openPanel === 'settings' && (
            <div className="absolute right-0 top-12 z-20 w-64 rounded-2xl border border-gray-100 bg-white p-4 shadow-card">
              <p className="font-manrope text-sm font-bold text-gray-900">Settings</p>
              <p className="mt-1 font-sora text-xs leading-snug text-gray-500">
                Account and workspace settings aren&apos;t available on this screen yet.
              </p>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => togglePanel('notifications')}
            aria-expanded={openPanel === 'notifications'}
            aria-haspopup="true"
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              openPanel === 'notifications' ? 'bg-brand-50 text-brand-700' : 'text-gray-500 hover:bg-gray-50'
            }`}
            aria-label={`Notifications${notifications.length ? ` (${notifications.length} upcoming)` : ''}`}
          >
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-brand-700" />
            )}
          </button>

          {openPanel === 'notifications' && (
            <div className="absolute right-0 top-12 z-20 w-72 rounded-2xl border border-gray-100 bg-white p-3 shadow-card">
              <p className="mb-2 px-1 font-manrope text-sm font-bold text-gray-900">Upcoming appointments</p>
              {notifications.length === 0 ? (
                <p className="px-1 font-sora text-xs text-gray-500">You&apos;re all caught up — nothing upcoming.</p>
              ) : (
                <ul className="flex flex-col gap-1">
                  {notifications.map((item) => (
                    <li key={item.id} className="flex items-start gap-2 rounded-xl px-2 py-2 hover:bg-gray-50">
                      <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                      <div className="min-w-0">
                        <p className="truncate font-sora text-xs font-semibold text-gray-800">{item.doctorName}</p>
                        <p className="truncate font-sora text-[11px] text-gray-500">{item.label}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 border-l border-gray-100 pl-1 sm:pl-2 lg:pl-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-manrope text-xs font-bold text-white">
            DB
          </div>
          <div className="hidden leading-tight lg:block">
            <p className="font-manrope text-sm font-bold text-gray-900">David Brock</p>
            <p className="font-sora text-xs text-gray-400">General Physician</p>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-16 z-20 mx-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-card lg:hidden">
          {NAV_ITEMS.map(({ label, icon: Icon, implemented }) => {
            const isActive = active === label
            return (
              <button
                key={label}
                type="button"
                disabled={!implemented}
                aria-disabled={!implemented}
                onClick={() => {
                  if (!implemented) return
                  setMobileOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-sora text-sm font-semibold ${
                  isActive ? 'bg-brand-50 text-brand-700' : implemented ? 'text-gray-600' : 'cursor-not-allowed text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {!implemented && <span className="ml-auto font-sora text-[10px] font-normal text-gray-300">Soon</span>}
              </button>
            )
          })}
        </div>
      )}
    </nav>
  )
}
