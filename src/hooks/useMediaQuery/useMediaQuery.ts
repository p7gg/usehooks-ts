import { useEffect, useState } from 'react';

/**
 * Easily retrieve media dimensions with this Hook React which also works onResize.
 *
 * @see https://usehooks-ts.com/react-hook/use-media-query
 *
 * @example
 * export default function Component() {
 *   const matches = useMediaQuery('(min-width: 768px)')
 *
 *   return (
 *     <div>
 *       {`The view port is ${matches ? 'at least' : 'less than'} 768 pixels wide`}
 *     </div>
 *   )
 * }
 */
function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}

export default useMediaQuery;
