import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Clock } from 'lucide-react'

export const PendingDocumentsLink = async () => {
  const session = await getServerSession(authOptions)
  const userIsAdmin = session?.user.role === 'ADMIN'
  const pendingDocuments = await prisma.document.count({
    where: {
      userId: userIsAdmin ? undefined : session?.user.id,
      status: 'PENDING',
    },
  })

  if (pendingDocuments === 0) return null

  return (
    <Link href="/dashboard/documents?status=PENDING">
      <Button variant="outline" className="flex h-auto w-full items-center justify-start gap-4 p-4">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-amber-500/10">
          <Clock className="flew-none h-5 w-5 text-amber-500" />
        </div>
        <div className="flex flex-col items-start text-wrap">
          <span className="font-semibold">Assinaturas pendentes</span>
          <span className="text-muted-foreground text-left text-xs">
            Visualize todos os documentos que aguardam sua assinatura.
          </span>
        </div>
      </Button>
    </Link>
  )
}
