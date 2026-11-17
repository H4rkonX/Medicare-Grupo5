import Link from 'next/link'
import { AppointmentForm } from '@/components/AppointmentForm'
import { CalendarIcon, ShieldIcon, StethoscopeIcon } from '@/components/Icons'
import { appAuth } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'

export default async function ConsultasPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string }>
}) {
  const user = await appAuth.currentUser()
  if (!user) return null

  if (user.role !== 'patient') {
    return (
      <div className="mx-auto max-w-7xl p-5 lg:p-9">
        <PageHeading
          eyebrow="Consultas"
          title="Gestiona tu agenda clínica"
          description="Las nuevas reservas son creadas por pacientes. Consulta aquí las citas autorizadas."
        />
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <StethoscopeIcon className="mx-auto size-10 text-teal-600" />
          <h2 className="mt-4 text-xl font-extrabold">Revisa tus consultas programadas</h2>
          <Link
            href="/panel/citas"
            className="mt-6 inline-flex rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white"
          >
            Abrir agenda
          </Link>
        </div>
      </div>
    )
  }

  const payload = await getPayloadClient()
  const doctors = await payload.find({
    collection: 'doctor-profiles',
    user,
    overrideAccess: false,
    depth: 1,
    limit: 100,
    sort: 'displayName',
  })
  const { doctor } = await searchParams
  const doctorOptions = doctors.docs.map((profile) => ({
    id: String(profile.id),
    name: profile.displayName,
    specialty:
      typeof profile.specialty === 'object' ? profile.specialty.name : 'Especialista',
  }))

  return (
    <div className="mx-auto max-w-7xl p-5 lg:p-9">
      <PageHeading
        eyebrow="Nueva consulta"
        title="Programa tu próxima visita"
        description="Selecciona un profesional, fecha y horario disponible."
      />
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <AppointmentForm doctors={doctorOptions} initialDoctor={doctor} />
        </section>
        <aside className="rounded-2xl bg-slate-950 p-6 text-white">
          <ShieldIcon className="size-7 text-lime-300" />
          <h2 className="mt-5 text-xl font-extrabold">Reserva protegida</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Validamos tu identidad, permisos y disponibilidad antes de guardar la cita.
          </p>
          <div className="mt-6 rounded-xl bg-white/5 p-4">
            <CalendarIcon className="size-5 text-teal-300" />
            <p className="mt-3 text-sm font-bold">Cambios y cancelaciones</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Puedes gestionar tus reservas desde “Mis citas”.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <header>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </header>
  )
}
