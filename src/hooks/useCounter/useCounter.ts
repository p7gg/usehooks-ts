import { Dispatch, SetStateAction, useState } from 'react';

interface ReturnType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: Dispatch<SetStateAction<number>>;
}

/**
 * A simple abstraction to play with a counter, don't repeat yourself.
 *
 * @see https://usehooks-ts.com/react-hook/use-counter
 *
 * @example
 * export default function Component() {
 *   const { count, setCount, increment, decrement, reset } = useCounter(0)
 *
 *   const multiplyBy2 = () => setCount(x => x * 2)
 *
 *   return (
 *     <>
 *       <p>Count is {count}</p>
 *       <button onClick={increment}>Increment</button>
 *       <button onClick={decrement}>Decrement</button>
 *       <button onClick={reset}>Reset</button>
 *       <button onClick={multiplyBy2}>Multiply by 2</button>
 *     </>
 *   )
 * }
 */
function useCounter(initialValue?: number): ReturnType {
  const [count, setCount] = useState(initialValue || 0);

  const increment = () => setCount((x) => x + 1);
  const decrement = () => setCount((x) => x - 1);
  const reset = () => setCount(initialValue || 0);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  };
}

export default useCounter;
