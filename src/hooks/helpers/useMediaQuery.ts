import { useEffect, useState } from 'react'

export function useMediaQuery(query: string = '(max-width: 992px)'): boolean {
  const [matches, setMatches] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    const media: MediaQueryList = window.matchMedia(query)
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}
