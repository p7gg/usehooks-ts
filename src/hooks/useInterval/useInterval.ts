import { useEffect, useRef } from 'react';

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

/**
 * Use `setInterval` in functional React component with the same API. Set your callback function as a first parameter
 * and a delay (in milliseconds) for the second argument. You can also stop the timer passing `null` instead the delay.
 * The main difference between the `setInterval` you know and this useInterval hook is that its arguments are "dynamic"
 *
 * @see https://usehooks-ts.com/react-hook/use-interval
 *
 * @example
 * export default function Component() {
 *   // The counter
 *   const [count, setCount] = useState<number>(0)
 *   // Dynamic delay
 *   const [delay, setDelay] = useState<number>(1000)
 *   // ON/OFF
 *   const [isPlaying, setPlaying] = useState<boolean>(false)
 *
 *   useInterval(
 *     () => {
 *       // Your custom logic here
 *       setCount(count + 1)
 *     },
 *     // Delay in milliseconds or null to stop it
 *     isPlaying ? delay : null,
 *   )
 *
 *   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
 *     setDelay(Number(event.target.value))
 *   }
 *
 *   return (
 *     <>
 *       <h1>{count}</h1>
 *       <button onClick={() => setPlaying(!isPlaying)}>
 *         {isPlaying ? 'pause' : 'play'}
 *       </button>
 *       <p>
 *         <label htmlFor="delay">Delay: </label>
 *         <input
 *           type="number"
 *           name="delay"
 *           onChange={handleChange}
 *           value={delay}
 *         />
 *       </p>
 *     </>
 *   )
 * }
 */
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
