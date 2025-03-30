import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { unlink } from 'fs/promises'
import { join } from 'path'

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return Response.json({ message: 'Acesso não autorizado' }, { status: 401 })
    }

    const { id } = await params

    const document = await prisma.document.findUnique({
      where: {
        id,
      },
    })

    if (!document) {
      return Response.json({ message: 'Documento não encontrado' }, { status: 404 })
    }

    if (document.status === 'SIGNED') {
      await prisma.signature.delete({
        where: {
          documentId: document.id,
        },
      })
    }

    await prisma.document.delete({
      where: {
        id,
      },
    })

    try {
      const filePath = join(process.cwd(), 'uploads', document.fileKey)
      await unlink(filePath)
    } catch (error) {
      console.error('Error deleting file:', error)
    }

    return Response.json({ message: 'Documento deletado com sucesso' }, { status: 200 })
  } catch (error) {
    console.error('Delete error:', error)
    return Response.json({ message: 'Algo deu errado' }, { status: 500 })
  }
}
