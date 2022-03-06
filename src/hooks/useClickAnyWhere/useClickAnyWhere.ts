import { useEventListener } from '../useEventListener';

type Handler = (event: MouseEvent) => void;

/**
 * This simple React hook offers you a click event listener at the page level, don't repeat yourself.
 *
 * @see https://usehooks-ts.com/react-hook/use-click-any-where
 *
 * @example
 * export default function Component() {
 *   const [count, setCount] = useState(0)
 *
 *   useClickAnyWhere(() => {
 *     setCount(prev => prev + 1)
 *   })
 *
 *   return <p>Click count: {count}</p>
 * }
 */
function useClickAnyWhere(handler: Handler) {
  useEventListener('click', (event) => {
    handler(event);
  });
}

export default useClickAnyWhere;
