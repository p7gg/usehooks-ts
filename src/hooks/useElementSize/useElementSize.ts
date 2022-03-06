import { useCallback, useState } from 'react';

import { useEventListener } from '../useEventListener';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

interface Size {
  width: number;
  height: number;
}

/**
 * This hook helps you to dynamically recover the width and the height of an HTML element.
 * Dimensions are updated on load, on mount/un-mount, when resizing the window and when the ref changes.
 *
 * @see https://usehooks-ts.com/react-hook/use-element-size
 *
 * @example
 * export default function Component() {
 *   const [isVisible, setVisible] = useState(true)
 *   const [squareRef, { width, height }] = useElementSize()
 *
 *   const toggleVisibility = () => setVisible(x => !x)
 *
 *   return (
 *     <>
 *       <p>{`The square width is ${width}px and height ${height}px`}</p>
 *       <p>Try, resize your window and-or click on the button.</p>
 *
 *       <button onClick={toggleVisibility}>
 *         {isVisible ? 'Hide' : 'Show'} square
 *       </button>
 *
 *       {isVisible && (
 *         <div
 *           ref={squareRef}
 *           style={{
 *             width: '50%',
 *             paddingTop: '50%',
 *             backgroundColor: 'aquamarine',
 *             margin: 'auto',
 *           }}
 *         />
 *       )}
 *     </>
 *   )
 * }
 */
function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Size,
] {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  // Prevent too many rendering using useCallback
  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  useEventListener('resize', handleSize);

  useIsomorphicLayoutEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  return [setRef, size];
}

export default useElementSize;
