import { redirect } from 'next/navigation'

type ConfirmRedirectPageProps = {
  params?: { slug?: string[] }
  searchParams?: Record<string, string | string[] | undefined>
}

function toQueryString(searchParams?: ConfirmRedirectPageProps['searchParams']) {
  if (!searchParams) return ''
  const usp = new URLSearchParams()
  for (const [k, v] of Object.entries(searchParams)) {
    if (typeof v === 'string') usp.set(k, v)
    else if (Array.isArray(v)) for (const item of v) if (typeof item === 'string') usp.append(k, item)
  }
  const qs = usp.toString()
  return qs ? `?${qs}` : ''
}

export default function ConfirmRedirectPage({ params, searchParams }: ConfirmRedirectPageProps) {
  const slug = params?.slug?.filter(Boolean).join('/') ?? ''
  const qs = toQueryString(searchParams)

  redirect(`/confirmation${slug ? `/${slug}` : ''}${qs}`)
}

