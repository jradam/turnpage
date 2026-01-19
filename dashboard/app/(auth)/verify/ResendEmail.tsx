'use client'

import Button from '@/components/Button'
import { initBrowserClient } from '@/supabase/browserClient'
import { ReactElement, useEffect, useReducer } from 'react'

const TIMER = 30

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
      return { ...prev, loading: false, timer: TIMER }
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

  const supabase = initBrowserClient()

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    timer: allowImmediateResend ? 0 : TIMER,
    error: '',
  })

  useEffect(() => {
    if (state.timer <= 0 || state.loading) return

    const id = setTimeout(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return (): void => clearTimeout(id)
  }, [state.timer, state.loading])

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
