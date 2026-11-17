'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { cancelAppointmentAction } from '@/app/(frontend)/actions'

export function CancelButton({ id }: { id: string }) {
  const [message, setMessage] = useState('')
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <div className="text-right">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            const result = await cancelAppointmentAction(id)
            setMessage(result.message)
            if (result.ok) router.refresh()
          })
        }}
        className="text-xs font-bold text-rose-600 hover:text-rose-700 disabled:opacity-50"
      >
        {pending ? 'Cancelando…' : 'Cancelar cita'}
      </button>
      {message && <p className="mt-1 text-[11px] text-slate-500">{message}</p>}
    </div>
  )
}
