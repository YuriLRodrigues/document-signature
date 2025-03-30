import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import { mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'Acesso não autorizado' }, { status: 401 })
    }

    const formData = await req.formData()
    const name = formData.get('name') as string
    const file = formData.get('file') as File

    if (!name || !file) {
      return NextResponse.json({ message: 'Campos requeridos faltando' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ message: 'Apenas PDFs são permitidos' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ message: 'Arquivo excedeu o tamanho limite de 5MB' }, { status: 400 })
    }

    const fileKey = `${uuidv4()}-${file.name.replace(/\s+/g, '-')}`.toLowerCase()

    const uploadDir = join(process.cwd(), 'uploads')
    await mkdir(uploadDir, { recursive: true })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = join(uploadDir, fileKey)
    await writeFile(filePath, buffer)

    const document = await prisma.document.create({
      data: {
        name,
        fileKey,
        userId: session.user.id,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ document, message: 'Documento enviado com sucesso' }, { status: 201 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ message: 'Algo deu errado' }, { status: 500 })
  }
}
