import { EffectCallback, useEffect } from 'react';

/**
 * Just modified version of useEffect that's executed only one time, at the mounting time.
 *
 * @see https://usehooks-ts.com/react-hook/use-effect-once
 *
 * @example
 * export default function Component() {
 *   const [data, setData] = useState<number>(0)
 *   useEffect(() => {
 *     console.log('Normal useEffect', { data })
 *   }, [data])
 *
 *   useEffectOnce(() => {
 *     console.log('Triggered only once, on mount', { data })
 *   })
 *
 *   return (
 *     <div>
 *       <p>Open your console</p>
 *       <button onClick={() => setData(Date.now())}>Update data</button>
 *     </div>
 *   )
 * }
 */
function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

export default useEffectOnce;
