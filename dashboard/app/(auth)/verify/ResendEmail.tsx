'use client'

import Button from '@/components/Button'
import { useSession } from '@/providers/SessionProvider'
import { ReactElement, useEffect, useReducer } from 'react'

const TIMER_SECONDS = 60 // At least 60: Supabase error if requested <60 seconds anyway
const INTERVAL_MS = 1000

type State = {
  loading: boolean
  timer: number
  error: string
}

type Action =
  | { type: 'tick' }
  | { type: 'start' }
  | { type: 'success' }
  | { type: 'error'; message: string }

function reducer(prev: State, next: Action): State {
  switch (next.type) {
    case 'tick':
      return { ...prev, timer: prev.timer - 1 }
    case 'start':
      return { ...prev, loading: true, error: '' }
    case 'success':
      return { ...prev, loading: false, timer: TIMER_SECONDS }
    case 'error':
      return { ...prev, loading: false, error: next.message }
  }
}

type Props = {
  email: string
  allowImmediateResend: boolean
}

export default function Verify(props: Props): ReactElement {
  const { email, allowImmediateResend } = props
  const { supabase } = useSession()

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    timer: allowImmediateResend ? 0 : TIMER_SECONDS,
    error: '',
  })

  useEffect(() => {
    if (state.timer === 0) return

    const timeout = setTimeout(() => {
      dispatch({ type: 'tick' })
    }, INTERVAL_MS)

    return (): void => clearTimeout(timeout)
  }, [state.timer])

  const resendEmail = async (): Promise<void> => {
    dispatch({ type: 'start' })

    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email,
    })

    if (resendError) {
      dispatch({
        type: 'error',
        message: resendError?.message || 'Error re-sending email',
      })
      return
    }

    dispatch({ type: 'success' })
  }

  const buttonText = state.timer
    ? `Resend email (${state.timer})`
    : 'Resend email'

  return (
    <>
      <Button
        loading={state.loading}
        disabled={!!state.timer}
        onClick={resendEmail}
      >
        {buttonText}
      </Button>

      {state.error && (
        <p className="mt-1 text-center font-bold text-error">{state.error}</p>
      )}
    </>
  )
}
