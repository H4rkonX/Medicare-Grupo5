'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction, registerAction, type ActionState } from '@/app/(frontend)/actions'
import { ArrowIcon, LockIcon } from './Icons'

const initialState: ActionState = { ok: false, message: '' }

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter()
  const action = mode === 'login' ? loginAction : registerAction
  const [state, formAction, pending] = useActionState(action, initialState)

  useEffect(() => {
    if (state.ok) {
      router.push('/panel')
      router.refresh()
    }
  }, [state.ok, router])

  return (
    <form action={formAction} className="mt-8 space-y-5">
      {mode === 'register' && (
        <>
          <Field label="Nombre completo" name="name" placeholder="Ana Martínez" autoComplete="name" />
          <Field label="Teléfono" name="phone" placeholder="+1 809 555 0100" autoComplete="tel" />
        </>
      )}
      <Field label="Correo electrónico" name="email" type="email" placeholder="tu@correo.com" autoComplete="email" />
      <Field
        label="Contraseña"
        name="password"
        type="password"
        placeholder="••••••••"
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
      />
      {mode === 'register' && (
        <p className="-mt-2 flex items-center gap-2 text-xs leading-5 text-slate-500">
          <LockIcon className="size-4 shrink-0 text-teal-600" />
          Mínimo 8 caracteres, una mayúscula, una minúscula y un número.
        </p>
      )}
      {state.message && (
        <p className={`rounded-xl px-4 py-3 text-sm ${state.ok ? 'bg-teal-50 text-teal-700' : 'bg-rose-50 text-rose-700'}`}>
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 text-sm font-bold text-white shadow-lg shadow-teal-700/15 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Procesando…' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta segura'}
        {!pending && <ArrowIcon className="size-4" />}
      </button>
    </form>
  )
}

function Field({
  label,
  ...props
}: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <input
        required
        {...props}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
      />
    </label>
  )
}
