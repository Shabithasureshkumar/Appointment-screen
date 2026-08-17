export interface ScheduleFields {
  day: string
  date: string
  dateTimeLabel: string
  startsInSeconds: number
}

/** Derives the timeline day/date badge, display label, and live countdown from a datetime-local input value. */
export function buildScheduleFields(datetimeLocalValue: string): ScheduleFields {
  const picked = new Date(datetimeLocalValue)

  const day = picked.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
  const date = String(picked.getDate()).padStart(2, '0')
  const dateTimeLabel = `${picked.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}, ${picked.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
  const startsInSeconds = Math.max(0, Math.round((picked.getTime() - Date.now()) / 1000))

  return { day, date, dateTimeLabel, startsInSeconds }
}
