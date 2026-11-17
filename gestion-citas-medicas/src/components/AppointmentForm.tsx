'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createAppointmentAction, type ActionState } from '@/app/(frontend)/actions'
import { CalendarIcon } from './Icons'

type DoctorOption = { id: string; name: string; specialty: string }

export function AppointmentForm({
  doctors,
  initialDoctor,
}: {
  doctors: DoctorOption[]
  initialDoctor?: string
}) {
  const router = useRouter()
  const [state, action, pending] = useActionState(createAppointmentAction, {
    ok: false,
    message: '',
  } satisfies ActionState)

  useEffect(() => {
    if (state.ok) router.refresh()
  }, [state.ok, router])

  const tomorrow = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10)

  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <label className="md:col-span-2">
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Médico</span>
        <select name="doctor" required className="field" defaultValue={initialDoctor ?? ''}>
          <option value="">Selecciona un especialista</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>{doctor.name} · {doctor.specialty}</option>
          ))}
        </select>
      </label>
      <label>
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Fecha</span>
        <input className="field" type="date" name="date" min={tomorrow} required />
      </label>
      <label>
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Hora</span>
        <select className="field" name="time" required>
          <option value="">Selecciona</option>
          {['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time) => (
            <option key={time}>{time}</option>
          ))}
        </select>
      </label>
      <label className="md:col-span-2">
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Motivo de consulta</span>
        <textarea className="field min-h-24 resize-none py-3" name="reason" maxLength={500} required placeholder="Describe brevemente el motivo de tu visita" />
      </label>
      {state.message && (
        <p className={`md:col-span-2 rounded-xl px-4 py-3 text-sm ${state.ok ? 'bg-teal-50 text-teal-700' : 'bg-rose-50 text-rose-700'}`}>{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending || doctors.length === 0}
        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 text-sm font-bold text-white transition hover:bg-teal-700 disabled:opacity-50 md:col-span-2"
      >
        <CalendarIcon className="size-4" />
        {pending ? 'Reservando…' : 'Confirmar cita'}
      </button>
    </form>
  )
}
