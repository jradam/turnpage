import { cn } from '@/utilities/helpers'
import { ReactElement } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  label: string
  labelRight?: ReactElement | false
  disabled?: boolean
  type?: 'email' | 'text' | 'password' | 'textarea'
  minLength?: number
  required?: true
  error?: boolean
}
export default function Input(props: Props): ReactElement {
  const {
    value,
    onChange,
    label,
    labelRight,
    disabled,
    type = 'text',
    minLength,
    required,
    error,
  } = props

  return (
    <label className="flex flex-col">
      <div className="mb-1 flex justify-between text-sm font-medium">
        <span className={error ? 'text-error' : ''}>{label}</span>
        {labelRight && labelRight}
      </div>
      <input
        className={cn(
          'min-h-9 rounded-md border border-medium bg-white px-2 transition-shadow hover:shadow-sm focus:outline focus:outline-highlight disabled:opacity-50',
          error && 'border-error bg-red-100',
        )}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        minLength={minLength}
        disabled={disabled}
        required={required}
      />
    </label>
  )
}
