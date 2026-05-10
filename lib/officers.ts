export function getOfficerEmails() {
  return (process.env.OFFICER_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function isOfficerEmail(email: string | null | undefined) {
  const officers = getOfficerEmails()
  return officers.length > 0 && !!email && officers.includes(email.toLowerCase())
}
