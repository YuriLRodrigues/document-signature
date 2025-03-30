import Link from 'next/link'

import { SignDocumentCard } from './components'
import { Button } from '@/components/ui/button'

import { ArrowLeft } from 'lucide-react'

interface SignPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SignPage({ params }: SignPageProps) {
  const { id } = await params

  return (
    <div className="py-8">
      <div className="mr-auto mb-6 flex items-center">
        <Link href={`/dashboard/documents/${id}`}>
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Assinar documento</h1>
      </div>
      <div className="flex min-h-[75vh] flex-col items-center justify-center py-8">
        <SignDocumentCard />
      </div>
    </div>
  )
}
