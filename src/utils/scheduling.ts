import type { AppointmentSchedule } from '../types/appointment'

export interface ScheduleFields {
  schedule: AppointmentSchedule
  startsInSeconds: number
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

/**
 * Formats a Date as a `datetime-local` input value using LOCAL time.
 * `date.toISOString()` always converts to UTC, which silently shifts the
 * displayed value by the user's timezone offset — this builds the string
 * from the local getters instead so the picker always shows what it means.
 */
export function toDateTimeLocalValue(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function isSameLocalDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/**
 * The single formatter for the "Weekday, DD Month YYYY, hh:mm AM/PM" detail
 * label. Every appointment — seeded or created through Book/Reschedule —
 * renders its label through this function from the same `schedule` object
 * used for the timeline badge, so the two can never disagree.
 */
export function formatDateTimeLabel(schedule: AppointmentSchedule): string {
  const prefix = schedule.isToday ? 'Today' : schedule.day.charAt(0) + schedule.day.slice(1).toLowerCase()
  return `${prefix}, ${schedule.date} ${schedule.monthYear}, ${schedule.time}`
}

/**
 * Derives the timeline day/date badge, detail label inputs, and live
 * countdown from a `datetime-local` input value. A `datetime-local` value has
 * no timezone offset, so `new Date(value)` is parsed as local time per spec —
 * safe to use directly here (unlike `toISOString`, which is only safe for
 * the reverse direction and is intentionally avoided in this file).
 */
export function buildScheduleFields(datetimeLocalValue: string): ScheduleFields {
  const picked = new Date(datetimeLocalValue)
  const now = new Date()

  const schedule: AppointmentSchedule = {
    day: picked.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
    date: String(picked.getDate()).padStart(2, '0'),
    monthYear: picked.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    time: picked.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    isToday: isSameLocalDay(picked, now),
  }
  const startsInSeconds = Math.max(0, Math.round((picked.getTime() - now.getTime()) / 1000))

  return { schedule, startsInSeconds }
}
