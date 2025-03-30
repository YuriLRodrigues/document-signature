import Link from 'next/link'
import { Suspense } from 'react'

import { DocumentsList, DocumentsListSkeleton } from './components/documents-list'
import { FilterAdvertisements, FilterAdvertisementsSkeleton } from './components/filter-documents/filter-documents'
import { Button } from '@/components/ui/button'

import { DocumentStatusType } from '@/@types/document'
import { Upload } from 'lucide-react'

type DocumentsPageProps = {
  searchParams: Promise<{
    userId?: string
    status?: DocumentStatusType
  }>
}

export default async function DocumentsPage({ searchParams }: DocumentsPageProps) {
  const { userId, status } = await searchParams

  return (
    <div className="space-y-6 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Documentos</h1>
        <div className="flex w-full flex-wrap items-center justify-between gap-4 sm:w-auto">
          <Suspense fallback={<FilterAdvertisementsSkeleton />}>
            <FilterAdvertisements />
          </Suspense>
          <Link href="/dashboard/documents/upload">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Enviar um novo documento
            </Button>
          </Link>
        </div>
      </div>

      <Suspense fallback={<DocumentsListSkeleton />}>
        <DocumentsList searchedUserId={userId} status={status} />
      </Suspense>
    </div>
  )
}
