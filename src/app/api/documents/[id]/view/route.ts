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

    return NextResponse.json({ url: document.fileKey }, { status: 200 })
  } catch (error) {
    console.error('View error:', error)
    return NextResponse.json({ message: 'Algo deu errado' }, { status: 500 })
  }
}
