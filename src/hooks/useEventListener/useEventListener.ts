import { RefObject, useEffect, useRef } from 'react';

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

/**
 * Use EventListener with simplicity by React Hook. It takes as parameters a eventName,
 * a call-back functions (handler) and optionally a reference element.
 * You can see above two examples using useRef and window based event.
 *
 * @see https://usehooks-ts.com/react-hook/use-event-listener
 *
 * @example
 * export default function Component() {
 *   // Define button ref
 *   const buttonRef = useRef<HTMLButtonElement>(null)
 *
 *   const onScroll = (event: Event) => {
 *     console.log('window scrolled!', event)
 *   }
 *
 *   const onClick = (event: Event) => {
 *     console.log('button clicked!', event)
 *   }
 *
 *   // example with window based event
 *   useEventListener('scroll', onScroll)
 *
 *   // example with element based event
 *   useEventListener('click', onClick, buttonRef)
 *
 *   return (
 *     <div style={{ minHeight: '200vh' }}>
 *       <button ref={buttonRef}>Click me</button>
 *     </div>
 *   )
 * }
 */
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
): void;
function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: RefObject<T>,
): void;

function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  T extends HTMLElement | void = void,
>(
  eventName: KW | KH,
  handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void,
  element?: RefObject<T>,
) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current || window;
    if (!(targetElement && (targetElement as any).addEventListener)) {
      return;
    }

    // Create event listener that calls handler function stored in ref
    const eventListener: typeof handler = (event) => savedHandler.current(event);

    (targetElement as any).addEventListener(eventName, eventListener);

    // Remove event listener on cleanup
    return () => {
      (targetElement as any).removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

export default useEventListener;
