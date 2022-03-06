// See: https://usehooks-ts.com/react-hook/use-boolean
import { useBoolean } from '../useBoolean';
// See: https://usehooks-ts.com/react-hook/use-counter
import { useCounter } from '../useCounter';
// See: https://usehooks-ts.com/react-hook/use-interval
import { useInterval } from '../useInterval';

interface UseCountdownType {
  seconds: number;
  interval: number;
  isIncrement?: boolean;
}
interface CountdownHelpers {
  start: () => void;
  stop: () => void;
  reset: () => void;
}

/**
 * A simple countdown implementation. Support increment and decrement.
 *
 * @see https://usehooks-ts.com/react-hook/use-countdown
 *
 * @example
 * export default function Component() {
 *   const [intervalValue, setIntervalValue] = useState<number>(500)
 *   const [count, { start, stop, reset }] = useCountdown({
 *     seconds: 60,
 *     interval: 500,
 *     isIncrement: false,
 *   })
 *
 *   const handleChangeIntervalValue = (event: ChangeEvent<HTMLInputElement>) => {
 *     setIntervalValue(Number(event.target.value))
 *   }
 *   return (
 *     <div>
 *       <p>Count: {count}</p>
 *
 *       <input
 *         type="number"
 *         value={intervalValue}
 *         onChange={handleChangeIntervalValue}
 *       />
 *       <button onClick={start}>start</button>
 *       <button onClick={stop}>stop</button>
 *       <button onClick={reset}>reset</button>
 *     </div>
 *   )
 * }
 */
function useCountdown({
  seconds,
  interval,
  isIncrement,
}: UseCountdownType): [number, CountdownHelpers] {
  const { count, increment, decrement, reset: resetCounter } = useCounter(seconds);
  /**
   * Note: used to control the useInterval
   * running: If true, the interval is running
   * start: Should set running true to trigger interval
   * stop: Should set running false to remove interval
   */
  const { value: running, setTrue: start, setFalse: stop } = useBoolean(false);

  /**
   * Will set running false and reset the seconds to initial value
   */
  const reset = () => {
    stop();
    resetCounter();
  };

  useInterval(isIncrement ? increment : decrement, running ? interval : null);
  return [count, { start, stop, reset }];
}

export default useCountdown;
