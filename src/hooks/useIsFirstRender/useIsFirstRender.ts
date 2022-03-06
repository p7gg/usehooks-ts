import { useRef } from 'react';

/**
 * Simple React hook that return a boolean;
 *
 * - True at the mount time
 * - Then always false
 *
 * @see https://usehooks-ts.com/react-hook/use-is-first-render
 *
 * @example
 * export default function Component() {
 *   const isFirst = useIsFirstRender()
 *   const [data, setData] = useState<number>(0)
 *
 *   useEffect(() => {
 *     console.log('Normal useEffect', { data })
 *   }, [data])
 *
 *   return (
 *     <div>
 *       <p>Open your console</p>
 *       <p>Is first render: {isFirst ? 'yes' : 'no'}</p>
 *       <button onClick={() => setData(Date.now())}>Update data</button>
 *     </div>
 *   )
 * }
 */
function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}

export default useIsFirstRender;
