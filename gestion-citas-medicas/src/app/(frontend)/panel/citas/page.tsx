import Link from 'next/link'
import { CancelButton } from '@/components/CancelButton'
import { CalendarIcon, HeartIcon } from '@/components/Icons'
import { appAuth } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'

const dateFormatter = new Intl.DateTimeFormat('es-DO', {
  dateStyle: 'full',
  timeStyle: 'short',
})

export default async function CitasPage() {
  const user = await appAuth.currentUser()
  if (!user) return null

  const payload = await getPayloadClient()
  const appointments = await payload.find({
    collection: 'appointments',
    user,
    overrideAccess: false,
    depth: 2,
    sort: '-startsAt',
    limit: 100,
  })

  return (
    <div className="mx-auto max-w-7xl p-5 lg:p-9">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <header>
          <p className="eyebrow">Agenda</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            {user.role === 'patient' ? 'Mis citas' : 'Citas autorizadas'}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Consulta el historial y administra tus próximas reservas.
          </p>
        </header>
        {user.role === 'patient' && (
          <Link
            href="/panel/consultas"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 text-sm font-bold text-white"
          >
            <CalendarIcon className="size-4" /> Nueva consulta
          </Link>
        )}
      </div>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="space-y-4">
          {appointments.docs.length ? (
            appointments.docs.map((appointment) => {
              const doctor = typeof appointment.doctor === 'object' ? appointment.doctor : null
              const patient = typeof appointment.patient === 'object' ? appointment.patient : null
              return (
                <article
                  key={appointment.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 sm:flex-row sm:items-center"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-teal-700 shadow-sm">
                    <HeartIcon className="size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-extrabold">
                        {user.role === 'patient'
                          ? doctor?.displayName ?? 'Médico'
                          : patient?.name ?? 'Paciente'}
                      </p>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${statusColor(appointment.status)}`}>
                        {statusLabel(appointment.status)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {dateFormatter.format(new Date(appointment.startsAt))}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {appointment.reference} · {appointment.reason}
                    </p>
                  </div>
                  {user.role === 'patient' &&
                    ['scheduled', 'confirmed'].includes(appointment.status) && (
                      <CancelButton id={String(appointment.id)} />
                    )}
                </article>
              )
            })
          ) : (
            <div className="p-12 text-center">
              <CalendarIcon className="mx-auto size-10 text-slate-300" />
              <h2 className="mt-4 text-lg font-extrabold">Aún no tienes citas</h2>
              <p className="mt-2 text-sm text-slate-500">
                Cuando programes una consulta, aparecerá en esta sección.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

const statusLabel = (status?: string | null) =>
  ({
    scheduled: 'Programada',
    confirmed: 'Confirmada',
    completed: 'Completada',
    cancelled: 'Cancelada',
    'no-show': 'No asistió',
  })[status ?? ''] ?? status

const statusColor = (status?: string | null) =>
  status === 'cancelled'
    ? 'bg-rose-50 text-rose-700'
    : status === 'completed'
      ? 'bg-slate-100 text-slate-600'
      : 'bg-amber-50 text-amber-700'
