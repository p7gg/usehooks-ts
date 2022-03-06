import { useEffect, useRef } from 'react';

/**
 * When component mounts useEffect hook is called. This is fine in most cases but if you need to track value changes
 * and not component mount you will need to implement something like this to prevent useEffect call on mount:
 *
 * @see https://mantine.dev/hooks/use-did-update/
 *
 * @example
 * useDidUpdate(() => console.log("Won't be called when mounted"), [value]);
 */
function useDidUpdate(fn: () => void, dependencies?: any[]) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      fn();
    } else {
      mounted.current = true;
    }
  }, dependencies);
}

export default useDidUpdate;
