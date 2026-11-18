'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-white">
        <main className="grid min-h-screen place-items-center p-6">
          <div className="max-w-md text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-teal-300">
              MediCare
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
              No pudimos cargar esta vista.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Tu sesión y tus datos permanecen protegidos. Intenta nuevamente.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-7 rounded-xl bg-teal-500 px-5 py-3 text-sm font-bold text-slate-950"
            >
              Reintentar
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
