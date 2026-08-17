import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  icon?: ReactNode
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
  sm: 'rounded-full px-4 py-2.5 text-sm gap-2',
  md: 'h-[40px] rounded-full px-4 text-[13px] gap-2',
  lg: 'rounded-full px-6 py-3 text-sm gap-2',
  icon: 'h-[34px] w-[34px] rounded-[10px] p-0',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex shrink-0 items-center justify-center whitespace-nowrap font-sora font-semibold leading-none transition-all duration-200',
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
