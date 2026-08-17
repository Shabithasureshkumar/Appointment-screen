import type { ReactNode } from 'react'

export type BadgeVariant = 'brand' | 'neutral' | 'success' | 'danger'

interface BadgeProps {
  variant?: BadgeVariant
  icon?: ReactNode
  children: ReactNode
  className?: string
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  brand: 'border border-brand-100 bg-brand-50 text-brand-700',
  neutral: 'border border-gray-200 bg-white text-gray-500',
  success: 'border border-emerald-100 bg-emerald-50 text-emerald-600',
  danger: 'border border-danger-200 bg-danger-50 text-danger-500',
}

export default function Badge({ variant = 'neutral', icon, children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 font-sora text-[11px] font-semibold',
        VARIANT_CLASSES[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon}
      {children}
    </span>
  )
}
