import { useCallback, useState } from 'react';
import { validateInitialValue } from '../../helpers/validateInitialValue';

type IUseCounter = {
  count: number;
  increment: () => void;
  reset: () => void;
  decrement: () => void;
};

/**
 * Classic counter example to help understand the flow of this npm package
 *
 * @example
 *   const ExampleComponent = () => {
 *     const { count, increment, reset, decrement } = useCounter();
 *
 *     return (
 *       <>
 *         <button onClick={increment}>Increment counter</button>
 *         <button onClick={reset}>Reset counter</button>
 *         <button onClick={decrement}>Decrement counter</button>
 *         <p>{count}</p>
 *       </>
 *      )
 *    }
 */

function useCounter(initialValue: number = 0): IUseCounter {
  const validatedInitialValue = validateInitialValue(initialValue);

  const [count, setCount] = useState<number>(validatedInitialValue);
  const increment = useCallback(() => setCount((value) => value + 1), []);
  const decrement = useCallback(() => setCount((value) => value - 1), []);
  const reset = useCallback(
    () => setCount(validatedInitialValue),
    [validatedInitialValue],
  );
  return { count, increment, decrement, reset };
}

export default useCounter;
