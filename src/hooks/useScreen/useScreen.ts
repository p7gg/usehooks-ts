import { useState } from 'react';

// See: https://usehooks-ts.com/react-hook/use-event-listener
import { useEventListener } from '../useEventListener';
// See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

/**
 * Easily retrieve `window.screen` object with this Hook React which also works onRezise.
 *
 * @see https://usehooks-ts.com/react-hook/use-screen
 *
 * @example
 * export default function Component() {
 *   const screen = useScreen()
 *
 *   return (
 *     <div>
 *       The current window dimensions are:{' '}
 *       <code>
 *         {JSON.stringify({ width: screen?.width, height: screen?.height })}
 *       </code>
 *     </div>
 *   )
 * }
 */
function useScreen() {
  const getScreen = () => {
    if (typeof window !== 'undefined' && window.screen) {
      return window.screen;
    }
    return undefined;
  };

  const [screen, setScreen] = useState<Screen | undefined>(getScreen());

  function handleSize() {
    setScreen(getScreen());
  }

  useEventListener('resize', handleSize);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return screen;
}

export default useScreen;
