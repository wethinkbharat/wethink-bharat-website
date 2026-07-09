import { createClient } from 'next-sanity'

function buildClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) {
    throw new Error(
      'Missing env var: NEXT_PUBLIC_SANITY_PROJECT_ID\n' +
      'Copy .env.example to .env.local and fill in your Sanity project ID.'
    )
  }
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
  })
}

// Lazy singleton — created on first use, not at module evaluation time.
// This avoids build-time errors when env vars aren't set during static analysis.
let _instance: ReturnType<typeof createClient> | null = null

export function getClientInstance() {
  if (!_instance) _instance = buildClient()
  return _instance
}

/**
 * Typed fetch helper for Server Components.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return getClientInstance().fetch<T>(query, params, {
    next: tags ? { tags } : { revalidate: 60 },
  })
}
