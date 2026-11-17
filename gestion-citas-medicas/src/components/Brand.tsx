import Link from 'next/link'
import { HeartIcon } from './Icons'

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="MediCare, inicio">
      <span className="grid size-9 place-items-center rounded-xl bg-teal-600 text-white shadow-sm shadow-teal-900/20">
        <HeartIcon className="size-5" />
      </span>
      {!compact && <span className="text-xl font-extrabold tracking-[-0.04em] text-slate-900">MediCare</span>}
    </Link>
  )
}
