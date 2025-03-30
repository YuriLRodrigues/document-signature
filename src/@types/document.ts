export const DocumentStatus = {
  PENDING: 'PENDING',
  SIGNED: 'SIGNED',
} as const

export type DocumentStatusType = (typeof DocumentStatus)[keyof typeof DocumentStatus]
