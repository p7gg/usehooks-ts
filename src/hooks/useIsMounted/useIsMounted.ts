import { useCallback, useEffect, useRef } from 'react';

/**
 * In React, once a component is unmounted, it is deleted from memory and will never be mounted again. That's why we don't define a state in a disassembled component. Changing the state in an unmounted component will result this error:
 *
 * `Warning: Can't perform a React state update on an unmounted component.
 * This is a no-op, but it indicates a memory leak in your application.
 * To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.`
 *
 * The right way to solve this is cleaning effect like the above message said. For example, see `useInterval` or `useEventListener`.
 * But, there are some cases like Promise or API calls where it's impossible to know if the component is still mounted at the resolve time.
 * This React hook help you to avoid this error with a function that return a boolean, `isMounted`.
 *
 * @see https://usehooks-ts.com/react-hook/use-is-mounted
 *
 * @example
 * const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
 *
 * function Child() {
 *   const [data, setData] = useState('loading')
 *   const isMounted = useIsMounted()
 *
 *   // simulate an api call and update state
 *   useEffect(() => {
 *     void delay(3000).then(() => {
 *       if (isMounted()) setData('OK')
 *     })
 *   }, [isMounted])
 *
 *   return <p>{data}</p>
 * }
 *
 * export default function Component() {
 *   const [isVisible, setVisible] = useState<boolean>(false)
 *
 *   const toggleVisibility = () => setVisible(state => !state)
 *
 *   return (
 *     <>
 *       <button onClick={toggleVisibility}>{isVisible ? 'Hide' : 'Show'}</button>
 *
 *       {isVisible && <Child />}
 *     </>
 *   )
 * }
 */
function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}

export default useIsMounted;
