import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import { Sidebar } from '@/components/dashboard/sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { userId } = auth()

  if (!userId) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  )
}
