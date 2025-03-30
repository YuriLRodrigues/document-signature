import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: 'Acesso não autorizado' }, { status: 401 })
    }

    const { id } = await params

    const document = await prisma.document.findUnique({
      where: {
        id,
      },
    })

    if (!document) {
      return NextResponse.json({ message: 'Documento não encontrado' }, { status: 404 })
    }

    try {
      const filePath = join(process.cwd(), 'uploads', document.fileKey)
      const fileBuffer = await readFile(filePath)

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="${document.name}"`,
        },
      })
    } catch (error) {
      console.error('Error reading file:', error)
      return NextResponse.json({ message: 'Erro ao ler o documento' }, { status: 500 })
    }
  } catch (error) {
    console.error('View error:', error)
    return NextResponse.json({ message: 'Algo deu errado' }, { status: 500 })
  }
}
