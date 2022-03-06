import { useEffect, useLayoutEffect } from 'react';

/**
 * This hook fixes this problem by switching between useEffect and useLayoutEffect following the execution environment.
 *
 * @see https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
 *
 * @example
 * export default function Component() {
 *   useIsomorphicLayoutEffect(() => {
 *     console.log(
 *       "In the browser, I'm an `useLayoutEffect`, but in SSR, I'm an `useEffect`.",
 *     )
 *   }, [])
 *
 *   return <p>Hello, world</p>
 * }
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
