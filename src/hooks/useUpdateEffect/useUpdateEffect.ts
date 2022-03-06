import { DependencyList, EffectCallback, useEffect } from 'react';

import { useIsFirstRender } from '../useIsFirstRender';

/**
 * Just modified version of `useEffect` that is skipping the first render.
 *
 * See also:
 *
 * - `useEffectOnce()`: Inverse of `useUpdateEffect()`
 * - `useIsFirstRender()`: Return a `boolean`
 * - `useIsMounted()`: Callback function to avoid Promise execution after component un-mount
 *
 * @see https://usehooks-ts.com/react-hook/use-update-effect
 *
 * @example
 * export default function Component() {
 *   const [data, setData] = useState<number>(0)
 *   useEffect(() => {
 *     console.log('Normal useEffect', { data })
 *   }, [data])
 * 
 *   useUpdateEffect(() => {
 *     console.log('Update useEffect only', { data })
 *   }, [data])
 * 
 *   return (
 *     <div>
 *       <p>Open your console</p>
 *       <button onClick={() => setData(Date.now())}>Update data</button>
 *     </div>
 *   )
 * }
 */
function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useIsFirstRender();

  useEffect(() => {
    if (!isFirst) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useUpdateEffect;
