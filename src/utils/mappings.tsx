import { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'

import { DocumentStatus } from '@prisma/client'
import { FileSignature, Upload } from 'lucide-react'

import { formatDatePtBR } from './format-date-pt-br'

export const mappingActivityType: Record<DocumentStatus, string> = {
  PENDING: 'Pendente',
  SIGNED: 'Assinado',
}

export const mappingActivityTypeLabel: Record<DocumentStatus, string> = {
  SIGNED: 'assinou',
  PENDING: 'enviou',
}

export const mappingActivityTypeIcon: Record<DocumentStatus, ReactNode> = {
  SIGNED: <FileSignature className="h-4 w-4 text-green-500" />,
  PENDING: <Upload className="h-4 w-4 text-blue-500" />,
}

export const mappingActivityTypeBadge: Record<DocumentStatus, ReactNode> = {
  SIGNED: <Badge variant="default">Assinado</Badge>,
  PENDING: <Badge variant="outline">Pendente</Badge>,
}

export const mappingGetActivityDate = (
  activityType: DocumentStatus,
  activity: { signature?: { signedAt?: string | Date | undefined }; createdAt: string | Date | undefined },
) => {
  const date =
    activityType === 'SIGNED' && activity.signature?.signedAt ? activity.signature.signedAt : activity.createdAt

  return date ? formatDatePtBR(new Date(date)) : 'Data inválida'
}
