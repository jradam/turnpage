'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import NavLink from '@/components/NavLink'
import { useSession } from '@/providers/SessionProvider'
import { useRouter } from 'next/navigation'
import { FormEvent, ReactElement, useReducer } from 'react'

type State = {
  email: string
  password: string
  confirm: string
  loading: boolean
  error: string
}

type Props = {
  mode: 'Log in' | 'Sign up'
}

export default function LoginForm({ mode }: Props): ReactElement {
  const [state, dispatch] = useReducer(
    (prev: State, next: Partial<State>) => {
      const newState = { ...prev, ...next }

      // Clear error when typing in fields
      if ('email' in next || 'password' in next || 'confirm' in next) {
        newState.error = ''
      }

      return newState
    },
    {
      email: '',
      password: '',
      confirm: '',
      loading: false,
      error: '',
    },
  )

  const supabase = initBrowserClient()
  const router = useRouter()

  const submit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    dispatch({ loading: true })

    const encodedEmail = encodeURIComponent(state.email)

    if (mode === 'Sign up') {
      if (state.password !== state.confirm) {
        dispatch({ error: 'Passwords do not match', loading: false })
        return
      }

      const { data, error } = await supabase.auth.signUp({
        email: state.email,
        password: state.password,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm`,
        },
      })

      if (!data || error) {
        dispatch({ error: error?.message || 'Error signing up' })
      } else {
        router.push(`/verify?email=${encodedEmail}`)
        return
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: state.email,
        password: state.password,
      })

      if (!data || error) {
        if (error?.code === 'email_not_confirmed') {
          router.push(`/verify?email=${encodedEmail}&resend=true`)
        } else {
          dispatch({ error: error?.message || 'Error signing in' })
        }
      } else {
        router.push(`/u/profile`)
        return
      }
    }

    dispatch({ loading: false })
  }

  return (
    <>
      <span className="text-lg font-bold">
        {mode === 'Log in'
          ? 'Log in to your account'
          : 'Sign up for an account'}
      </span>

      <form
        className="flex w-96 flex-col items-stretch gap-y-6 rounded-md border border-light bg-white px-8 py-6"
        onSubmit={submit}
      >
        <Input
          label="Email address"
          type="email"
          required
          value={state.email}
          onChange={(value) => dispatch({ email: value })}
          disabled={state.loading}
        />

        <Input
          label="Password"
          type="password"
          required
          value={state.password}
          onChange={(value) => dispatch({ password: value })}
          disabled={state.loading}
          minLength={6}
          labelRight={
            mode === 'Log in' && (
              <NavLink href="/forgot" className="font-normal" noTab>
                Forgot password?
              </NavLink>
            )
          }
        />

        {mode === 'Sign up' && (
          <>
            <Input
              label="Confirm password"
              type="password"
              required
              value={state.confirm}
              onChange={(value) => dispatch({ confirm: value })}
              disabled={state.loading}
              minLength={6}
            />
          </>
        )}

        <Button
          className="mt-2"
          type="submit"
          loading={state.loading}
          disabled={!!state.error}
        >
          {mode}
        </Button>

        {state.error && (
          <p className="mt-1 text-center font-bold text-error">{state.error}</p>
        )}
      </form>
    </>
  )
}
