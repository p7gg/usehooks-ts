/**
 * Quickly know where your code will be executed;
 *
 * - In the server (Server-Side-Rendering) or
 * - In the client, the navigator
 *
 * This hook doesn't cause an extra render, it just returns the value directly, at the mount time,
 * and it didn't re-trigger if the value changes.
 * Otherwise, If you want to be notified when the value changes to react to it, you can use `useIsClient()` instead.
 *
 * @see https://usehooks-ts.com/react-hook/use-ssr
 *
 * @example
 * export default function Component() {
 *   const { isBrowser } = useSsr()
 *
 *   return <p>{isBrowser ? 'Browser' : 'Server'}!</p>
 * }
 */
function useSsr() {
  const isDOM =
    typeof window !== 'undefined' &&
    window.document &&
    window.document.documentElement;

  return {
    isBrowser: isDOM,
    isServer: !isDOM,
  };
}

export default useSsr;
