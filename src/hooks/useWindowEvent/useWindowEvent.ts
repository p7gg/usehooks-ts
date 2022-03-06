import { useEffect } from 'react';

/**
 * Adds event listener to window on component mount and removes it on unmount
 *
 * @see https://mantine.dev/hooks/use-window-event/
 *
 * @example
 * const handler = (event) => console.log(event);
 *
 * // regular way
 * useEffect(() => {
 *   window.addEventListener('keydown', handler);
 *   return () => window.removeEventListener('keydown');
 * }, []);
 *
 * // with use-window-event hook
 * useWindowEvent('keydown', handler);
 */
function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    window.addEventListener(type, listener, options);
    return () => window.removeEventListener(type, listener, options);
  }, []);
}

export default useWindowEvent;
