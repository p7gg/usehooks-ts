import { useState } from 'react';

import { useEventListener } from '../useEventListener';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Easily retrieve window dimensions with this React Hook which also works onRezise.
 *
 * @see https://usehooks-ts.com/react-hook/use-window-size
 *
 * @example
 * export default function Component() {
 *   const { width, height } = useWindowSize()
 *
 *   return (
 *     <div>
 *       The current window dimensions are:{' '}
 *       <code>{JSON.stringify({ width, height })}</code>
 *     </div>
 *   )
 * }
 */
function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEventListener('resize', handleSize);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowSize;
}

export default useWindowSize;
