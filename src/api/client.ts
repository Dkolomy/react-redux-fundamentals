// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

type ClientConfig = {
  body?: unknown
  headers?: Record<string, string>
  method?: string
  [key: string]: any
}

export async function client(
  endpoint: string,
  { body, ...customConfig }: ClientConfig = {}
): Promise<any> {
  const headers = { 'Content-Type': 'application/json' }

  const config: RequestInit & { headers: Record<string, string> } = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...(customConfig.headers ?? {}),
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data: unknown
  try {
    const response = await window.fetch(endpoint, config)
    data = await response.json()
    if (response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    if (err instanceof Error) {
      return Promise.reject(err.message)
    }
    return Promise.reject(data)
  }
}

client.get = function (
  endpoint: string,
  customConfig: ClientConfig = {}
) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (
  endpoint: string,
  body: unknown,
  customConfig: ClientConfig = {}
) {
  return client(endpoint, { ...customConfig, body })
}