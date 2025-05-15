
import { useEffect, useState } from 'react';

type UseMediaQueryOptions = {
  fallback?: boolean;
};

/**
 * A hook that returns true if the window matches the given media query
 * @param query The media query to match
 * @param options Options
 * @returns Whether the media query matches
 */
export function useMediaQuery(
  query: string,
  { fallback = false }: UseMediaQueryOptions = {}
): boolean {
  const [matches, setMatches] = useState(fallback);

  useEffect(() => {
    // Check if window exists (client-side)
    const mediaQueryList = window.matchMedia(query);
    
    // Set initial matches
    setMatches(mediaQueryList.matches);
    
    // Define listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add listener
    mediaQueryList.addEventListener('change', listener);
    
    // Clean up
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
