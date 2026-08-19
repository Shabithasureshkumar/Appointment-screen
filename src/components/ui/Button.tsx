import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  icon?: ReactNode
  /** Allows label text to wrap instead of forcing a single line — for buttons placed in a
   * narrow flexible slot (e.g. two side-by-side mobile action buttons) where a forced
   * `whitespace-nowrap` minimum width would overflow the row. */
  wrap?: boolean
}

// Each variant reproduces an exact color combination already used somewhere
// in the Figma-approved UI (Join Now, AI Symptom Checker, Reschedule, Cancel)
// so swapping a raw button for <Button variant="..."> never changes a pixel.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-brand-gradient-btn text-white shadow-card hover:scale-[1.02] active:scale-[0.98]',
  secondary: 'border border-brand-900 bg-white text-brand-900 hover:bg-brand-50 active:scale-[0.98]',
  outline:
    'border border-[#E3DDF7] bg-white text-[#4A4A5A] hover:border-brand-accent hover:bg-[#F8F5FF] hover:text-[#5B32E8] active:scale-[0.98]',
  ghost: 'bg-transparent text-gray-500 hover:bg-gray-50 active:scale-95',
  danger:
    'border border-[#DDD9EC] bg-white text-[#9A97A8] hover:border-danger-200 hover:bg-danger-50 hover:text-danger-500 active:scale-95',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  // Filter tabs only (Upcoming / Past visit / Cancelled): three of these must fit in one
  // row down to 320px. Discrete breakpoints, not clamp() — a `clamp(min, Nvw, max)` with too
  // small a coefficient sits pinned at `min` across the whole mobile+tablet range instead of
  // reaching a comfortable size by Figma's ~390px reference, which is what happened here
  // before. Base is sized for 390px; `sm` restores the original desktop-approved values.
  sm: 'rounded-full gap-1 px-2 py-2 text-xs min-[360px]:px-2.5 min-[360px]:text-[13px] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm',
  md: 'h-[40px] rounded-full px-4 text-[13px] gap-2',
  // Book Appointment / AI Symptom Checker + modal submit buttons: at 320-479px, two `lg`
  // buttons share one row (see AppointmentActions) and the original fixed gap-2/px-5/text-sm
  // left too little room for "AI Symptom Checker" (the secondary variant's 1px border eats
  // into that further) to fit on one line. Each clamp() is a linear interpolation from its
  // 320px value to its original (unchanged) value at 480px — the width this codebase already
  // confirmed has enough room — so nothing below 320 or at/above 480 changes, and `sm:px-6`
  // still overrides cleanly at 640px.
  lg: 'rounded-full gap-[clamp(2px,calc(3.75vw_-_10px),8px)] px-[clamp(6px,calc(8.75vw_-_22px),20px)] py-3 text-[clamp(9px,calc(3.125vw_-_1px),14px)] sm:px-6',
  icon: 'h-[34px] w-[34px] rounded-[10px] p-0',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  wrap = false,
  icon,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center font-sora font-semibold transition-all duration-200',
        wrap ? 'shrink text-center leading-snug whitespace-normal' : 'shrink-0 leading-none whitespace-nowrap',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}
