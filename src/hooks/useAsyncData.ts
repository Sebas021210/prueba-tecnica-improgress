import { useCallback, useEffect, useState } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export interface UseAsyncDataResult<T> extends AsyncState<T> {
  reload: () => void
}

export function useAsyncData<T>(fetcher: () => Promise<T>): UseAsyncDataResult<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((error: unknown) => {
        if (cancelled) return
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error : new Error(String(error)),
        })
      })

    return () => {
      cancelled = true
    }
  }, [fetcher, attempt])

  const reload = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    setAttempt((n) => n + 1)
  }, [])

  return { ...state, reload }
}
