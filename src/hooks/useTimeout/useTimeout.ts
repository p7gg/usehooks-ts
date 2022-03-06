import { useEffect, useRef } from 'react';

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

/**
 * Very similar to the `useInterval` hook, this React hook implements the native `setTimeout` function keeping the same interface.
 * You can enable the timeout by setting `delay` as a `number` or disabling it using null.
 * When the time finishes, the callback function is called.
 *
 * @see https://usehooks-ts.com/react-hook/use-timeout
 * 
 * @example
 * export default function Component() {
 *   const [visible, setVisible] = useState(true)
 * 
 *   const hide = () => setVisible(false)
 * 
 *   useTimeout(hide, 5000)
 * 
 *   return (
 *     <div>
 *       <p>
 *         {visible
 *           ? "I'm visible for 5000ms"
 *           : 'You can no longer see this content'}
 *       </p>
 *     </div>
 *   )
 * }
 */
function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}

export default useTimeout;
