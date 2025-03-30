import { Suspense } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { RecentActivityTab, RecentActivityTabSkeleton } from './recent-activity-tab'
import { RecentDocumentsTab, RecentDocumentsTabSkeleton } from './recent-documents-tab'

export const DocumentsOverview = () => {
  return (
    <Card className="col-span-7 md:col-span-4">
      <CardHeader>
        <CardTitle>Visão geral dos documentos</CardTitle>
        <CardDescription>Sua atividade e status do documento.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="recent">Documentos recenetes</TabsTrigger>
            <TabsTrigger value="activity">Atividade recente</TabsTrigger>
          </TabsList>
          <TabsContent value="recent">
            <Suspense fallback={<RecentDocumentsTabSkeleton />}>
              <RecentDocumentsTab />
            </Suspense>
          </TabsContent>
          <TabsContent value="activity">
            <Suspense fallback={<RecentActivityTabSkeleton />}>
              <RecentActivityTab />
            </Suspense>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
