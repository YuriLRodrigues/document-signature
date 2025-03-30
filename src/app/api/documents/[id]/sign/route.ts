import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'Acesso não autorizado' }, { status: 401 })
    }

    const { id } = await params

    const { signatureImg } = await req.json()

    if (!signatureImg) {
      return NextResponse.json({ message: 'É necessário a imagem de assinatura' }, { status: 400 })
    }

    const document = await prisma.document.findUnique({
      where: {
        id,
        status: 'PENDING',
      },
    })

    if (!document) {
      return NextResponse.json({ message: 'Documento não encontrado ou já assinado' }, { status: 404 })
    }

    const result = await prisma.$transaction([
      prisma.signature.create({
        data: {
          documentId: document.id,
          userId: session.user.id,
          signatureImg,
          signedAt: new Date(),
        },
      }),
      prisma.document.update({
        where: {
          id: document.id,
        },
        data: {
          status: 'SIGNED',
        },
      }),
    ])

    return NextResponse.json(
      {
        signature: result[0],
        document: result[1],
        message: 'Documento assinado com sucesso',
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Erro ao assinar o documento:', error)
    return NextResponse.json({ message: 'Algo deu errado' }, { status: 500 })
  }
}
