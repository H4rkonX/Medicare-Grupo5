import Link from 'next/link'
import { HeartIcon, StethoscopeIcon } from '@/components/Icons'
import { appAuth } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'

export default async function EspecialistasPage() {
  const user = await appAuth.currentUser()
  if (!user) return null

  const payload = await getPayloadClient()
  const doctors = await payload.find({
    collection: 'doctor-profiles',
    user,
    overrideAccess: false,
    depth: 1,
    limit: 100,
    sort: 'displayName',
  })

  return (
    <div className="mx-auto max-w-7xl p-5 lg:p-9">
      <header>
        <p className="eyebrow">Directorio médico</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
          Especialistas
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Conoce a los profesionales disponibles y elige con quién deseas consultar.
        </p>
      </header>

      {doctors.docs.length ? (
        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {doctors.docs.map((doctor, index) => (
            <article
              key={doctor.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className={`grid size-14 place-items-center rounded-2xl ${index % 2 ? 'bg-sky-50 text-sky-700' : 'bg-teal-50 text-teal-700'}`}>
                  <StethoscopeIcon className="size-7" />
                </span>
                <span className="rounded-full bg-lime-50 px-2.5 py-1 text-[11px] font-extrabold text-lime-700">
                  Disponible
                </span>
              </div>
              <h2 className="mt-5 text-xl font-extrabold">{doctor.displayName}</h2>
              <p className="mt-1 text-sm font-bold text-teal-700">
                {typeof doctor.specialty === 'object'
                  ? doctor.specialty.name
                  : 'Especialista'}
              </p>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">{doctor.bio}</p>
              <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                <HeartIcon className="size-4 text-teal-600" />
                {doctor.yearsExperience} años de experiencia
              </div>
              {user.role === 'patient' && (
                <Link
                  href={`/panel/consultas?doctor=${doctor.id}`}
                  className="mt-6 flex h-11 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white hover:bg-teal-700"
                >
                  Reservar consulta
                </Link>
              )}
            </article>
          ))}
        </section>
      ) : (
        <section className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <StethoscopeIcon className="mx-auto size-10 text-teal-600" />
          <h2 className="mt-4 text-xl font-extrabold">Directorio en preparación</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Los perfiles médicos aparecerán aquí cuando el centro los active.
          </p>
        </section>
      )}
    </div>
  )
}
