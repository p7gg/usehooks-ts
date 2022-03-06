import { useEffect, useState } from 'react';

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

type ReturnType = [boolean, (locked: boolean) => void];

/**
 * This React hook is used to block the scrolling of the page.
 *
 * A good example of a use case is when you need to open a modal.
 *
 * For flexibility, this hook offers 2 APIs:
 *
 * - Use it as we would use a useState (example 1)
 * - Use it with our own logic, coming from a props or redux for example (example 2)
 *
 * Finally, you can optionally change the reflow padding if you have another sidebar size than the default (15px)
 *
 * @see https://usehooks-ts.com/react-hook/use-locked-body
 *
 * @example
 * const fixedCenterStyle: CSSProperties = {
 *   position: 'fixed',
 *   top: '50%',
 *   left: '50%',
 *   transform: 'translate(-50%, -50%)',
 * }
 *
 * const fakeScrollableStyle: CSSProperties = {
 *   minHeight: '150vh',
 *   background: 'linear-gradient(palegreen, palegoldenrod, palevioletred)',
 * }
 *
 * // Example 1: useLockedBody as useState()
 * export default function App() {
 *   const [locked, setLocked] = useLockedBody()
 *
 *   const toggleLocked = () => {
 *     setLocked(!locked)
 *   }
 *
 *   return (
 *     <div style={fakeScrollableStyle}>
 *       <button style={fixedCenterStyle} onClick={toggleLocked}>
 *         {locked ? 'unlock scroll' : 'lock scroll'}
 *       </button>
 *     </div>
 *   )
 * }
 *
 * // Example 2: useLockedBody with our custom state
 * export function App2() {
 *   const [locked, setLocked] = useState(false)
 *
 *   const toggleLocked = () => {
 *     setLocked(!locked)
 *   }
 *
 *   useLockedBody(locked)
 *
 *   return (
 *     <div style={fakeScrollableStyle}>
 *       <button style={fixedCenterStyle} onClick={toggleLocked}>
 *         {locked ? 'unlock scroll' : 'lock scroll'}
 *       </button>
 *     </div>
 *   )
 * }
 */
function useLockedBody(initialLocked = false): ReturnType {
  const [locked, setLocked] = useState(initialLocked);

  // Do the side effect before render
  useIsomorphicLayoutEffect(() => {
    if (!locked) {
      return;
    }

    // Save initial body style
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Get the scrollBar width
    const root = document.getElementById('___gatsby'); // or root
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

    // Avoid width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [locked]);

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked]);

  return [locked, setLocked];
}

export default useLockedBody;
