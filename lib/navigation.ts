export function safeNextPath(
  value: FormDataEntryValue | string | string[] | null | undefined,
  fallback = '/dashboard/review',
) {
  const raw = Array.isArray(value) ? value[0] : value
  const next = typeof raw === 'string' ? raw : ''

  if (!next || !next.startsWith('/') || next.startsWith('//')) {
    return fallback
  }

  return next
}
