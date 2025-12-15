export function normalizeVerificationToken(raw?: string): string {
  if (!raw) return ''

  let token = String(raw).trim()

  // Some scanners pass an encoded value.
  try {
    token = decodeURIComponent(token)
  } catch {
    // ignore decode errors
  }

  // Some scanners/apps convert "+" into spaces in query params.
  // Converting spaces back to "+" helps for base64/JWT-like tokens.
  token = token.replace(/\s+/g, '+')

  // If the "token" is actually a full URL, extract the token-ish params.
  try {
    const url = new URL(token)
    const fromUrl =
      url.searchParams.get('token') ||
      url.searchParams.get('t') ||
      url.searchParams.get('reference') ||
      url.searchParams.get('ref') ||
      url.searchParams.get('id') ||
      ''
    if (fromUrl) token = fromUrl
  } catch {
    // not a URL
  }

  // If the scanned payload is "token=....", strip the prefix.
  if (/^(token|t|reference|ref|id)=/i.test(token)) {
    token = token.replace(/^[^=]+=/, '')
  }

  return token.trim()
}

