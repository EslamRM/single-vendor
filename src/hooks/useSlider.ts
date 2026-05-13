import { useState, useEffect, useRef, useCallback } from 'react'

interface UseSliderOptions {
  count: number
  interval?: number
}

interface UseSliderReturn {
  current: number
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  pause: () => void
  resume: () => void
}

export function useSlider({ count, interval = 5000 }: UseSliderOptions): UseSliderReturn {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    stop()
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count)
    }, interval)
  }, [count, interval, stop])

  useEffect(() => {
    start()
    return stop
  }, [start, stop])

  const next = useCallback(() => setCurrent((p) => (p + 1) % count), [count])
  const prev = useCallback(() => setCurrent((p) => (p - 1 + count) % count), [count])
  const goTo = useCallback((index: number) => setCurrent(index), [])

  return { current, next, prev, goTo, pause: stop, resume: start }
}
