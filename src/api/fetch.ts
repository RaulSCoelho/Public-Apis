interface FetchProps {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  url: string
  payload?: Object
  simple?: boolean
}

function fetchData<T>(props: FetchProps): Promise<T> {
  if (!props.method) props.method = 'GET'

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
    options.credentials = 'include'
  }

  if (props.payload) options.body = JSON.stringify(props.payload)

  return fetch(props.url, options)
    .then(res => res.json())
    .then(data => data)
}

interface FetchNoPayload {
  url: string
  simple?: boolean
}

interface FetchWithPayload {
  url: string
  payload: Object
  simple?: boolean
}

async function GET<T>(props: FetchNoPayload): Promise<T> {
  const options: FetchProps = { url: props.url }

  if (props.simple) options.simple = true

  return await fetchData(options)
}

async function POST<T>(props: FetchWithPayload): Promise<T> {
  const options: FetchProps = {
    method: 'POST',
    url: props.url,
    payload: props.payload,
  }

  if (props.simple) options.simple = true

  return await fetchData<T>(options)
}

async function PATCH<T>(props: FetchWithPayload): Promise<T> {
  const options: FetchProps = {
    method: 'POST',
    url: props.url,
    payload: props.payload,
  }

  if (props.simple) options.simple = true

  return await fetchData(options)
}

async function DELETE<T>(props: FetchNoPayload): Promise<T> {
  const options: FetchProps = { method: 'DELETE', url: props.url }

  if (props.simple) options.simple = true

  return await fetchData(options)
}

export const FETCH = {
  get: GET,
  post: POST,
  patch: PATCH,
  delete: DELETE,
}
