import { getServerSession } from 'next-auth/next'
import { Suspense } from 'react'

import {
  AdminTotalDocumentsCard,
  AdminTotalDocumentsCardSkeleton,
  AdminCompletionRateDocumentsCard,
  AdminCompletionRateDocumentsCardSkeleton,
  AdminPendingDocumentsCard,
  AdminPendingDocumentsCardSkeleton,
  AdminSignedDocumentsCard,
  AdminSignedDocumentsCardSkeleton,
} from './components/admin-cards'
import {
  CompletionRateDocumentsCard,
  CompletionRateDocumentsCardSkeleton,
  PendingDocumentsCard,
  PendingDocumentsCardSkeleton,
  SignedDocumentsCard,
  SignedDocumentsCardSkeleton,
  TotalDocumentsCard,
  TotalDocumentsCardSkeleton,
} from './components/cards'
import { DocumentsOverview } from './components/documents-overview'
import { QuickActions } from './components/quick-actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { authOptions } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <section className="mt-7 space-y-8">
      <article className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Seja bem-vindo, {session?.user.name}</h1>
        <p className="text-muted-foreground">Gerencie e assine documentos com segurança em um só lugar.</p>
      </article>

      {session?.user.role === 'ADMIN' && (
        <Tabs defaultValue="admin">
          <TabsList>
            <TabsTrigger value="admin">Todos os registros</TabsTrigger>
            <TabsTrigger value="me">Meus registros</TabsTrigger>
          </TabsList>
          <TabsContent value="admin">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Suspense fallback={<AdminTotalDocumentsCardSkeleton />}>
                <AdminTotalDocumentsCard />
              </Suspense>
              <Suspense fallback={<AdminPendingDocumentsCardSkeleton />}>
                <AdminPendingDocumentsCard />
              </Suspense>
              <Suspense fallback={<AdminSignedDocumentsCardSkeleton />}>
                <AdminSignedDocumentsCard />
              </Suspense>
              <Suspense fallback={<AdminCompletionRateDocumentsCardSkeleton />}>
                <AdminCompletionRateDocumentsCard />
              </Suspense>
            </div>
          </TabsContent>
          <TabsContent value="me">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Suspense fallback={<TotalDocumentsCardSkeleton />}>
                <TotalDocumentsCard session={session} />
              </Suspense>
              <Suspense fallback={<PendingDocumentsCardSkeleton />}>
                <PendingDocumentsCard session={session} />
              </Suspense>
              <Suspense fallback={<SignedDocumentsCardSkeleton />}>
                <SignedDocumentsCard session={session} />
              </Suspense>
              <Suspense fallback={<CompletionRateDocumentsCardSkeleton />}>
                <CompletionRateDocumentsCard session={session} />
              </Suspense>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {session?.user.role === 'USER' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<TotalDocumentsCardSkeleton />}>
            <TotalDocumentsCard session={session} />
          </Suspense>
          <Suspense fallback={<PendingDocumentsCardSkeleton />}>
            <PendingDocumentsCard session={session} />
          </Suspense>
          <Suspense fallback={<SignedDocumentsCardSkeleton />}>
            <SignedDocumentsCard session={session} />
          </Suspense>
          <Suspense fallback={<CompletionRateDocumentsCardSkeleton />}>
            <CompletionRateDocumentsCard session={session} />
          </Suspense>
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-7">
        <DocumentsOverview />
        <QuickActions />
      </div>
    </section>
  )
}
