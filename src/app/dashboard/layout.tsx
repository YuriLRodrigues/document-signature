import { Suspense } from 'react'

import { DashboardHeader, DashboardHeaderSkeleton } from '@/components/layout/dashboard/header'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<DashboardHeaderSkeleton />}>
        <DashboardHeader />
      </Suspense>
      <main className="w-full px-4">{children}</main>
    </>
  )
}
