import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'Acesso não autorizado' }, { status: 401 })
    }

    const { id } = await params

    const document = await prisma.document.findUnique({
      where: { id },
    })

    if (!document) {
      return NextResponse.json({ message: 'Documento não encontrado' }, { status: 404 })
    }

    const fileResponse = await fetch(document.fileKey)
    if (!fileResponse.ok) {
      return NextResponse.json({ message: 'Erro ao acessar o arquivo' }, { status: 500 })
    }

    const fileBuffer = await fileResponse.arrayBuffer()

    return new Response(Buffer.from(fileBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${document.name}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Erro no download:', error)
    return NextResponse.json({ message: 'Algodeu errado' }, { status: 500 })
  }
}
