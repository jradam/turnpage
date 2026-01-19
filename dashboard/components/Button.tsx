'use client'

import { ReactElement, ReactNode, useState } from 'react'
import Spinner from '@/assets/Spinner'
import { cn } from '@/utilities/helpers'

type Props = {
  children: ReactNode
  className?: string
  onClick?: (() => void) | (() => Promise<void>)
  type?: 'submit'
  disabled?: boolean
  loading?: boolean
  soft?: true
}
export default function Button(props: Props): ReactElement {
  const {
    children,
    className,
    onClick,
    type = 'button',
    disabled,
    loading: externalLoading,
    soft,
  } = props
  const [loading, setLoading] = useState(false)

  const handleClick = async (): Promise<void> => {
    try {
      setLoading(true)
      if (onClick && !disabled) await onClick()
    } finally {
      setLoading(false)
    }
  }

  const isLoading = loading || externalLoading

  return (
    <button
      className={cn(
        'flex min-h-9 cursor-pointer items-center justify-center rounded-md px-3 transition-colors duration-200 disabled:cursor-default disabled:opacity-50',
        soft
          ? 'font-semibold text-darkest outline outline-medium hover:text-black hover:outline-darkest'
          : 'bg-highlight text-white hover:bg-lowlight',
        className,
      )}
      onClick={handleClick}
      type={type}
      disabled={disabled || isLoading}
    >
      {isLoading && <Spinner className="absolute" />}
      <span className={cn(isLoading && 'opacity-0')}>{children}</span>
    </button>
  )
}
