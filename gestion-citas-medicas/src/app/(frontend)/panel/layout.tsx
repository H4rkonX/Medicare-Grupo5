import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { PanelShell } from '@/components/PanelShell'
import { appAuth } from '@/lib/app-auth'

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const user = await appAuth.currentUser()
  if (!user) redirect('/login')

  return (
    <PanelShell user={{ name: user.name, role: user.role }}>
      {children}
    </PanelShell>
  )
}
