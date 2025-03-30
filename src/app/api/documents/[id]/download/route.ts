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
      where: { id },
    })

    if (!document) {
      return NextResponse.json({ message: 'Documento não encontrado' }, { status: 404 })
    }

    const filePath = join(process.cwd(), 'uploads', `${document.fileKey}`)

    try {
      const fileBuffer = await readFile(filePath)

      return new Response(fileBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${document.fileKey}.pdf"`,
        },
      })
    } catch (error) {
      console.error('Erro ao ler o arquivo:', error)
      return NextResponse.json({ message: 'Erro ao acessar o arquivo' }, { status: 500 })
    }
  } catch (error) {
    console.error('Erro no download:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}
