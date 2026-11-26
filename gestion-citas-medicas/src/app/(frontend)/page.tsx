import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { Brand } from '@/components/Brand'
import {
  ArrowIcon,
  CalendarIcon,
  ClockIcon,
  HeartIcon,
  SearchIcon,
  ShieldIcon,
  StethoscopeIcon,
  UsersIcon,
} from '@/components/Icons'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayloadClient()
  const specialties = await payload.find({
    collection: 'specialties',
    overrideAccess: false,
    where: { active: { equals: true } },
    limit: 6,
    sort: 'name',
  })

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7faf9] text-slate-900">
      <header className="relative z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Brand />
          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a href="#especialidades" className="hover:text-teal-700">Especialidades</a>
            <a href="#como-funciona" className="hover:text-teal-700">Cómo funciona</a>
            <a href="#seguridad" className="hover:text-teal-700">Seguridad</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden px-3 py-2 text-sm font-bold text-slate-700 sm:block">Iniciar sesión</Link>
            <Link href="/registro" className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-700">
              Crear cuenta
            </Link>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-20">
          <div className="relative z-10">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-700 shadow-sm">
              <ShieldIcon className="size-4" /> Tu salud, protegida y organizada
            </p>
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
              Tu próxima cita, <span className="text-teal-600">sin complicaciones.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Encuentra al especialista indicado, elige el horario que mejor te conviene y gestiona tu salud desde un solo lugar.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/registro" className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 text-sm font-bold text-white shadow-xl shadow-teal-800/15 transition hover:-translate-y-0.5 hover:bg-teal-700">
                Reservar una cita <ArrowIcon className="size-4" />
              </Link>
              <a href="#especialidades" className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition hover:border-teal-300">
                <SearchIcon className="size-4" /> Explorar especialistas
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-500">
              <span className="flex items-center gap-2"><span className="status-dot" /> Horarios en tiempo real</span>
              <span className="flex items-center gap-2"><ShieldIcon className="size-4 text-teal-600" /> Datos protegidos</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -left-10 top-14 hidden rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl shadow-slate-900/10 sm:block">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-teal-50 text-teal-700"><ClockIcon className="size-5" /></span>
                <div><p className="text-xs font-bold text-slate-400">Próxima cita</p><p className="text-sm font-extrabold">Hoy, 10:30 AM</p></div>
              </div>
            </div>
            <div className="relative rounded-[2rem] border border-white/80 bg-white/85 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur sm:p-6">
              <div className="rounded-[1.5rem] bg-[#0d857d] p-6 text-white sm:p-8">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-100">Agenda inteligente</p>
                    <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Encuentra tu médico</h2>
                  </div>
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/15"><StethoscopeIcon className="size-6" /></span>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl bg-white p-4 text-slate-700">
                    <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Especialidad</span>
                    <span className="flex items-center justify-between font-bold">Medicina general <SearchIcon className="size-4 text-teal-600" /></span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white p-4 text-slate-700"><span className="mb-1 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Fecha</span><span className="font-bold">12 Jun</span></div>
                    <div className="rounded-xl bg-white p-4 text-slate-700"><span className="mb-1 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Hora</span><span className="font-bold">10:30 AM</span></div>
                  </div>
                  <Link href="/registro" className="mt-2 flex h-12 items-center justify-center rounded-xl bg-[#d7f36d] text-sm font-extrabold text-slate-900 transition hover:bg-[#e1f88c]">Ver disponibilidad</Link>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-7 -right-3 rounded-2xl border border-white/70 bg-white p-4 shadow-xl shadow-slate-900/10 sm:right-0">
              <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-lime-100 text-teal-700"><ShieldIcon className="size-5" /></span><div><p className="text-sm font-extrabold">Cita confirmada</p><p className="text-xs text-slate-500">Te notificaremos a tiempo</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="especialidades" className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="eyebrow">Atención integral</p><h2 className="section-title">Especialidades para cuidarte</h2></div>
            <Link href="/registro" className="inline-flex items-center gap-2 text-sm font-extrabold text-teal-700">Ver todas <ArrowIcon className="size-4" /></Link>
          </div>
          {specialties.docs.length ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {specialties.docs.map((specialty, index) => (
                <Link key={specialty.id} href="/registro" className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-slate-900/5">
                  <span className={`grid size-12 place-items-center rounded-2xl ${index % 3 === 0 ? 'bg-teal-50 text-teal-700' : index % 3 === 1 ? 'bg-sky-50 text-sky-700' : 'bg-lime-50 text-lime-700'}`}>
                    {index % 2 === 0 ? <HeartIcon className="size-6" /> : <StethoscopeIcon className="size-6" />}
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold">{specialty.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{specialty.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-teal-700">Buscar médicos <ArrowIcon className="size-3.5 transition group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <StethoscopeIcon className="mx-auto size-8 text-teal-600" />
              <p className="mt-3 font-bold text-slate-700">Las especialidades aparecerán aquí cuando el centro las publique.</p>
            </div>
          )}
        </div>
      </section>

      <section id="como-funciona" className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center"><p className="eyebrow">Simple y rápido</p><h2 className="section-title">Tu cita en tres pasos</h2></div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              [SearchIcon, '01', 'Encuentra', 'Filtra por especialidad y elige al profesional ideal para ti.'],
              [CalendarIcon, '02', 'Programa', 'Selecciona una fecha y uno de los horarios disponibles.'],
              [ShieldIcon, '03', 'Confirma', 'Recibe tu confirmación y gestiona cualquier cambio en línea.'],
            ].map(([Icon, number, title, copy]) => {
              const StepIcon = Icon as typeof SearchIcon
              return (
                <div key={number as string} className="relative rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
                  <span className="absolute right-6 top-5 text-4xl font-black text-slate-100">{number as string}</span>
                  <span className="grid size-12 place-items-center rounded-2xl bg-teal-50 text-teal-700"><StepIcon className="size-6" /></span>
                  <h3 className="mt-6 text-lg font-extrabold">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{copy as string}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="seguridad" className="mx-auto mb-20 max-w-7xl px-5 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] bg-slate-950 text-white lg:grid-cols-[.9fr_1.1fr]">
          <div className="p-8 sm:p-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-lime-300">Seguridad por diseño</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em]">Tu información médica merece el máximo cuidado.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Sesiones seguras, permisos por rol y acceso mínimo necesario para proteger cada dato.</p>
          </div>
          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {[[ShieldIcon, 'Acceso por roles', 'Cada usuario ve únicamente lo que necesita.'], [UsersIcon, 'Datos privados', 'Tu historial no se expone en respuestas innecesarias.'], [ClockIcon, 'Sesiones controladas', 'Expiración y bloqueo ante intentos repetidos.'], [HeartIcon, 'Auditoría', 'Las acciones críticas quedan registradas.']].map(([Icon, title, copy]) => {
              const SecurityIcon = Icon as typeof ShieldIcon
              return <div key={title as string} className="bg-slate-900 p-7"><SecurityIcon className="size-6 text-lime-300" /><h3 className="mt-4 font-extrabold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{copy as string}</p></div>
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:flex-row lg:px-8">
          <Brand />
          <p className="text-xs text-slate-500">© 2026 MediCare. Atención segura, siempre.</p>
        </div>
      </footer>
    </main>
  )
}
