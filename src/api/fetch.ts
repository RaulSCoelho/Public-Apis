interface FetchProps {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  url: string
  payload?: Object
  includeCredentials?: boolean
  simple?: boolean
}

const fetchData = (props: FetchProps) => {
  if (!props.method) props.method = 'GET'
  if (props.includeCredentials === undefined) props.includeCredentials = true

  const options: globalThis.RequestInit = {
    method: props.method,
    redirect: 'follow',
    referrerPolicy: 'origin',
  }

  if (!props.simple) {
    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    options.mode = 'cors'
    if (props.includeCredentials) options.credentials = 'include'
  }

  if (props.payload) options.body = JSON.stringify(props.payload)

  return fetch(props.url, options)
    .then(res => {
      const { status } = res
      if (status === 200) return res.json()
      if (status === 401) return {}
      if (status === 403) return {}
      return {}
    })
    .then(data => data)
}

interface FetchNoPayload {
  url: string
  includeCredentials?: boolean
  simple?: boolean
}

interface FetchWithPayload {
  url: string
  payload: Object
  includeCredentials?: boolean
  simple?: boolean
}

const GET = async (props: FetchNoPayload) => {
  const options: FetchProps = { url: props.url }

  if (props.includeCredentials === false) options.includeCredentials = false
  if (props.simple) options.simple = true

  return await fetchData(options)
}

const POST = async (props: FetchWithPayload) => {
  const options: FetchProps = {
    method: 'POST',
    url: props.url,
    payload: props.payload,
  }

  if (props.includeCredentials === false) options.includeCredentials = false
  if (props.simple) options.simple = true

  return await fetchData(options)
}

const PATCH = async (props: FetchWithPayload) => {
  const options: FetchProps = {
    method: 'POST',
    url: props.url,
    payload: props.payload,
  }

  if (props.includeCredentials === false) options.includeCredentials = false
  if (props.simple) options.simple = true

  return await fetchData(options)
}

const DELETE = async (props: FetchNoPayload) => {
  const options: FetchProps = { method: 'DELETE', url: props.url }

  if (props.includeCredentials === false) options.includeCredentials = false
  if (props.simple) options.simple = true

  return await fetchData(options)
}

export const FETCH = {
  get: GET,
  post: POST,
  patch: PATCH,
  delete: DELETE,
}
