'use client'

import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): [T, boolean] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const [waiting, setWaiting] = useState(false)

  useEffect(() => {
    setWaiting(true)
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      setWaiting(false)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return [debouncedValue, waiting]
}

export default useDebounce
