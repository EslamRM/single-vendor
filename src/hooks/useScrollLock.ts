import { useEffect } from 'react'

/**
 * Locks document body scroll when `locked` is true, restores on cleanup.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (locked) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [locked])
}
