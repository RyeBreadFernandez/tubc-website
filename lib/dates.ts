import { format, parse } from 'date-fns'

export function parseDateOnly(value: string) {
  return parse(value, 'yyyy-MM-dd', new Date())
}

export function formatDateOnly(value: string, pattern: string) {
  return format(parseDateOnly(value), pattern)
}
