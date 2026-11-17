'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { logoutAction } from '@/app/(frontend)/actions'
import { Brand } from './Brand'
import {
  CalendarIcon,
  HomeIcon,
  ShieldIcon,
  StethoscopeIcon,
} from './Icons'

const navigation = [
  { href: '/panel', label: 'Resumen', icon: HomeIcon, exact: true },
  { href: '/panel/consultas', label: 'Consultas', icon: StethoscopeIcon },
  { href: '/panel/citas', label: 'Mis citas', icon: CalendarIcon },
  { href: '/panel/especialistas', label: 'Especialistas', icon: StethoscopeIcon },
]

export function PanelShell({
  children,
  user,
}: {
  children: ReactNode
  user: { name: string; role: string }
}) {
  const pathname = usePathname()

  return (
    <main className="min-h-screen bg-[#f4f7f6] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white p-6 lg:flex lg:flex-col">
        <Brand />
        <nav className="mt-12 space-y-1.5" aria-label="Navegación del panel">
          {navigation.map((item) => (
            <PanelLink
              key={item.href}
              {...item}
              active={item.exact ? pathname === item.href : pathname.startsWith(item.href)}
            />
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-teal-50 p-4">
          <ShieldIcon className="size-5 text-teal-700" />
          <p className="mt-3 text-xs font-extrabold text-teal-900">Sesión protegida</p>
          <p className="mt-1 text-xs leading-5 text-teal-700">
            Tus permisos se verifican en cada operación.
          </p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex h-20 items-center justify-between px-5 lg:px-9">
            <div className="lg:hidden">
              <Brand compact />
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                Panel {roleLabel(user.role)}
              </p>
              <p className="mt-1 font-extrabold">{user.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-teal-100 text-sm font-extrabold text-teal-800">
                {initials(user.name)}
              </span>
              <form action={logoutAction}>
                <button className="rounded-lg px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100">
                  Salir
                </button>
              </form>
            </div>
          </div>
          <nav
            className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden"
            aria-label="Navegación móvil del panel"
          >
            {navigation.map((item) => (
              <PanelLink
                key={item.href}
                {...item}
                mobile
                active={item.exact ? pathname === item.href : pathname.startsWith(item.href)}
              />
            ))}
          </nav>
        </header>
        {children}
      </div>
    </main>
  )
}

function PanelLink({
  href,
  label,
  icon: Icon,
  active,
  mobile,
}: {
  href: string
  label: string
  icon: typeof HomeIcon
  active: boolean
  exact?: boolean
  mobile?: boolean
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`flex shrink-0 items-center gap-2.5 rounded-xl text-sm font-bold ${
        mobile ? 'px-3 py-2' : 'px-3 py-3'
      } ${active ? 'bg-teal-50 text-teal-800' : 'text-slate-500 hover:bg-slate-50'}`}
    >
      <Icon className="size-5" />
      {label}
    </Link>
  )
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const roleLabel = (role: string) =>
  ({ patient: 'de paciente', doctor: 'médico', admin: 'administrativo' })[role] ?? ''
