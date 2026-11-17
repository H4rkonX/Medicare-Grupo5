import Link from 'next/link'
import { appAuth } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'
import {
  CalendarIcon,
  ClockIcon,
  HeartIcon,
  ShieldIcon,
  StethoscopeIcon,
} from '@/components/Icons'

const dateFormatter = new Intl.DateTimeFormat('es-DO', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export default async function PanelPage() {
  const user = await appAuth.currentUser()
  if (!user) return null

  const payload = await getPayloadClient()
  const [appointments, doctors] = await Promise.all([
    payload.find({
      collection: 'appointments',
      user,
      overrideAccess: false,
      depth: 2,
      sort: 'startsAt',
      limit: 4,
      where: { status: { in: ['scheduled', 'confirmed'] } },
    }),
    payload.find({
      collection: 'doctor-profiles',
      user,
      overrideAccess: false,
      limit: 1,
    }),
  ])

  return (
    <div className="mx-auto max-w-7xl p-5 lg:p-9">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">{greeting()}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            Hola, {user.name.split(' ')[0]}.
          </h1>
          <p className="mt-2 text-sm text-slate-500">{panelSubtitle(user.role)}</p>
        </div>
        {user.role === 'patient' && (
          <Link
            href="/panel/consultas"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 text-sm font-bold text-white hover:bg-teal-700"
          >
            <CalendarIcon className="size-4" /> Nueva consulta
          </Link>
        )}
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={CalendarIcon} label="Próximas citas" value={String(appointments.totalDocs)} color="teal" />
        <Metric icon={StethoscopeIcon} label="Especialistas" value={String(doctors.totalDocs)} color="sky" />
        <Metric icon={ClockIcon} label="Gestión digital" value="< 3 min" color="lime" />
        <Metric icon={ShieldIcon} label="Estado de cuenta" value="Protegida" color="violet" />
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-extrabold">
                {user.role === 'patient' ? 'Próximas citas' : 'Agenda autorizada'}
              </p>
              <p className="mt-1 text-xs text-slate-500">Tu actividad más cercana</p>
            </div>
            <Link href="/panel/citas" className="text-xs font-extrabold text-teal-700">
              Ver todas
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {appointments.docs.length ? (
              appointments.docs.map((appointment) => {
                const doctor = typeof appointment.doctor === 'object' ? appointment.doctor : null
                const patient = typeof appointment.patient === 'object' ? appointment.patient : null
                return (
                  <article
                    key={appointment.id}
                    className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-teal-700 shadow-sm">
                      <HeartIcon className="size-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-extrabold">
                        {user.role === 'patient'
                          ? doctor?.displayName ?? 'Médico'
                          : patient?.name ?? 'Paciente'}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {dateFormatter.format(new Date(appointment.startsAt))}
                      </p>
                    </div>
                  </article>
                )
              })
            ) : (
              <EmptyAppointments />
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-[#0c847c] p-6 text-white">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-teal-100">
            Accesos rápidos
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight">¿Qué deseas hacer?</h2>
          <div className="mt-6 space-y-3">
            <QuickLink href="/panel/consultas" icon={StethoscopeIcon}>Programar consulta</QuickLink>
            <QuickLink href="/panel/citas" icon={CalendarIcon}>Revisar mis citas</QuickLink>
            <QuickLink href="/panel/especialistas" icon={HeartIcon}>Buscar especialista</QuickLink>
          </div>
        </section>
      </div>
    </div>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof CalendarIcon
  label: string
  value: string
  color: string
}) {
  const colors: Record<string, string> = {
    teal: 'bg-teal-50 text-teal-700',
    sky: 'bg-sky-50 text-sky-700',
    lime: 'bg-lime-50 text-lime-700',
    violet: 'bg-violet-50 text-violet-700',
  }
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight">{value}</p>
        </div>
        <span className={`grid size-10 place-items-center rounded-xl ${colors[color]}`}>
          <Icon className="size-5" />
        </span>
      </div>
    </div>
  )
}

function QuickLink({
  href,
  icon: Icon,
  children,
}: {
  href: string
  icon: typeof CalendarIcon
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl bg-white/10 p-4 text-sm font-extrabold hover:bg-white/15"
    >
      <Icon className="size-5 text-lime-300" />
      {children}
    </Link>
  )
}

function EmptyAppointments() {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 p-9 text-center">
      <CalendarIcon className="mx-auto size-8 text-slate-300" />
      <p className="mt-3 font-bold text-slate-700">No hay citas programadas</p>
      <p className="mt-1 text-sm text-slate-500">Puedes iniciar una nueva consulta desde el menú.</p>
    </div>
  )
}

const greeting = () =>
  new Date().getHours() < 12
    ? 'Buenos días'
    : new Date().getHours() < 18
      ? 'Buenas tardes'
      : 'Buenas noches'

const panelSubtitle = (role?: string | null) =>
  role === 'patient'
    ? 'Aquí tienes todo lo necesario para gestionar tu atención.'
    : role === 'doctor'
      ? 'Consulta tu agenda y la información autorizada de tus pacientes.'
      : 'Supervisa citas, profesionales y seguridad del sistema.'
