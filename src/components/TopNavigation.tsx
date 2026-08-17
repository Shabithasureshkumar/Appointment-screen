import { useState } from 'react'
import { LayoutGrid, CalendarDays, Users, FileText, MessageSquare, Receipt, Search, Settings, Bell, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'Appointment', icon: CalendarDays },
  { label: 'Patient', icon: Users },
  { label: 'Reports', icon: FileText },
  { label: 'Chats', icon: MessageSquare },
  { label: 'Billing', icon: Receipt },
]

export default function TopNavigation() {
  const [active, setActive] = useState('Appointment')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="relative flex w-full items-center justify-between gap-4 rounded-full border border-gray-100 bg-white px-3 py-2 shadow-soft">
      <div className="flex items-center gap-1">
        {NAV_ITEMS.map(({ label, icon: Icon }) => {
          const isActive = active === label
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`hidden items-center gap-2 rounded-full px-4 py-2.5 font-sora text-sm font-semibold transition-colors lg:flex ${
                isActive
                  ? 'bg-brand-gradient-btn text-white shadow-card'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {isActive && <Icon className="h-4 w-4" strokeWidth={2} />}
              {label}
            </button>
          )
        })}

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-haspopup="true"
          className="flex items-center gap-2 rounded-full bg-brand-gradient-btn px-3 py-2.5 font-sora text-sm font-semibold text-white shadow-card lg:hidden"
        >
          <CalendarDays className="h-4 w-4 shrink-0" />
          {active}
        </button>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
        <button
          className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 md:flex"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          className="hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 md:flex"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </button>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
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
          {NAV_ITEMS.map(({ label, icon: Icon }) => {
            const isActive = active === label
            return (
              <button
                key={label}
                onClick={() => {
                  setActive(label)
                  setMobileOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-sora text-sm font-semibold ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            )
          })}
        </div>
      )}
    </nav>
  )
}
