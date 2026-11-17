'use client'

import Link from 'next/link'

export default function FrontendError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7faf9] p-6">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-teal-700">
          Conexión segura
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">
          Algo no salió como esperábamos.
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          No se realizó ninguna operación incompleta. Puedes reintentar o volver al inicio.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white"
          >
            Reintentar
          </button>
          <Link href="/" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
