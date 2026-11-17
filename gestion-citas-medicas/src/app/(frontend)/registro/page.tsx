import Link from 'next/link'
import { redirect } from 'next/navigation'
import { appAuth } from '@/lib/app-auth'
import { Brand } from '@/components/Brand'
import { AuthForm } from '@/components/AuthForm'
import { CalendarIcon, ShieldIcon, StethoscopeIcon } from '@/components/Icons'

export default async function RegisterPage() {
  if (await appAuth.currentUser()) redirect('/panel')
  return (
    <main className="grid min-h-screen bg-[#f7faf9] lg:grid-cols-[1fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-slate-950 p-14 text-white lg:block">
        <div className="auth-grid absolute inset-0 opacity-10" />
        <Brand />
        <div className="relative mt-24 max-w-md">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-lime-300">Empieza hoy</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-[-0.05em]">Todo lo que necesitas para cuidar de ti.</h2>
          <div className="mt-10 space-y-6">
            {[[CalendarIcon, 'Reserva en minutos', 'Consulta horarios y programa tu cita desde cualquier lugar.'], [StethoscopeIcon, 'Especialistas verificados', 'Encuentra profesionales según la atención que necesitas.'], [ShieldIcon, 'Información protegida', 'Tus datos personales y médicos tienen acceso restringido.']].map(([Icon, title, copy]) => {
              const ItemIcon = Icon as typeof CalendarIcon
              return <div key={title as string} className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-lime-300"><ItemIcon className="size-5" /></span><div><p className="font-extrabold">{title as string}</p><p className="mt-1 text-sm leading-6 text-slate-400">{copy as string}</p></div></div>
            })}
          </div>
        </div>
      </aside>
      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden"><Brand /></div>
          <p className="eyebrow mt-10 lg:mt-0">Cuenta de paciente</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-slate-950">Crea tu cuenta segura.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Gestiona tus citas y mantén toda tu información organizada.</p>
          <AuthForm mode="register" />
          <p className="mt-7 text-center text-sm text-slate-500">¿Ya tienes una cuenta? <Link className="font-extrabold text-teal-700" href="/login">Inicia sesión</Link></p>
        </div>
      </section>
    </main>
  )
}
