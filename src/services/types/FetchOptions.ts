export interface FetchOptions {
  route: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: unknown
  headers?: Record<string, string>
  next?: { revalidate: number }
  cache?: 'no-cache' | 'default' | 'reload' | 'force-cache' | 'only-if-cached'
}
