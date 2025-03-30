'use server'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const userIsAdmin = session?.user.role === 'ADMIN'
    console.log({ session })

    if (!session || !userIsAdmin) {
      return NextResponse.json({ message: 'Acesso não autorizado' }, { status: 401 })
    }

    const [signedDocuments, totalDocuments] = await prisma.$transaction([
      prisma.document.count({
        where: {
          status: 'SIGNED',
        },
      }),
      prisma.document.count(),
    ])

    return NextResponse.json({ signedDocuments, totalDocuments }, { status: 200 })
  } catch (error) {
    console.error('Get admin total signed error:', error)
    return NextResponse.json({ message: 'Algo deu errado' }, { status: 500 })
  }
}
