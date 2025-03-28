const sanitizeDescription = (description: string): string => {
  if (!description) return ''

  let cleaned = description.replace(/\\"/g, '"')

  cleaned = cleaned.replace(/^"+(.+?)"+$/, '$1')

  return cleaned
}

export default sanitizeDescription
