import { useState } from 'react';
import { useWindowEvent } from '../useWindowEvent';

/**
 * Get and set hash value in url
 *
 * @see https://mantine.dev/hooks/use-hash/
 *
 * @example
 * export function Demo() {
 *   const [hash, setHash] = useHash();
 *   return <Button onClick={() => setHash(uuid())}>Set hash to random string</Button>
 * }
 */
function useHash() {
  const [hash, setHashValue] = useState<string>(
    typeof window !== 'undefined' ? window.location.hash : '',
  );

  const setHash = (value: string) => {
    window.location.hash = value;
    setHashValue(value);
  };

  useWindowEvent('hashchange', () => {
    setHashValue(window.location.hash);
  });

  return [hash, setHash] as const;
}

export default useHash;
