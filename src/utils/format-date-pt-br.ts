import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDatePtBR = (date: Date | string): string => {
  return format(new Date(date), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })
}
