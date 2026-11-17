import Link from 'next/link'
import { redirect } from 'next/navigation'
import { appAuth } from '@/lib/app-auth'
import { Brand } from '@/components/Brand'
import { AuthForm } from '@/components/AuthForm'
import { ShieldIcon } from '@/components/Icons'

export default async function LoginPage() {
  if (await appAuth.currentUser()) redirect('/panel')

  return (
    <main className="grid min-h-screen bg-[#f7faf9] lg:grid-cols-[.9fr_1.1fr]">
      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Brand />
          <div className="mt-14">
            <p className="eyebrow">Bienvenido de nuevo</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.05em] text-slate-950">Tu salud, a un clic.</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">Accede a tus citas, médicos y notificaciones de forma segura.</p>
          </div>
          <AuthForm mode="login" />
          <p className="mt-7 text-center text-sm text-slate-500">¿Aún no tienes cuenta? <Link className="font-extrabold text-teal-700" href="/registro">Regístrate gratis</Link></p>
        </div>
      </section>
      <AuthAside />
    </main>
  )
}

function AuthAside() {
  return (
    <aside className="relative hidden overflow-hidden bg-[#0b827a] p-14 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="auth-grid absolute inset-0 opacity-20" />
      <span className="relative grid size-14 place-items-center rounded-2xl bg-white/15"><ShieldIcon className="size-7" /></span>
      <div className="relative max-w-lg">
        <p className="text-3xl font-extrabold leading-tight tracking-[-0.04em]">“MediCare me permite organizar las citas de toda mi familia sin llamadas ni esperas.”</p>
        <div className="mt-8 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-lime-300 font-extrabold text-teal-900">AM</span><div><p className="font-bold">Ana Martínez</p><p className="text-sm text-teal-100">Paciente desde 2024</p></div></div>
      </div>
      <p className="relative text-xs font-semibold text-teal-100">Conexión cifrada · Acceso protegido · Privacidad por diseño</p>
    </aside>
  )
}
