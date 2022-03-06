import React, { useCallback } from 'react';
import { assignRef } from '../../utils';

type Ref<T> = React.Dispatch<React.SetStateAction<T> | null> | React.ForwardedRef<T>;

/**
 * Use multiple refs for one dom node
 *
 * Hook accepts any amount of refs and returns function that should be passed to dom node.
 * Use hook when you need to use more than one ref on single dom node, for example,
 * when you want to use `useClickOutside` and `useFocusTrap` hooks and also get a ref for yourself:
 *
 * @see https://mantine.dev/hooks/use-merged-ref/
 *
 * @example
 * function Demo() {
 *   const myRef = useRef();
 *   const useClickOutsideRef = useClickOutside(() => {});
 *   const focusTrapRef = useFocusTrap();
 *   const mergedRef = useMergedRef(myRef, useClickOutsideRef, focusTrapRef);
 *
 *   return <div ref={mergedRef} />;
 * }
 */
function useMergedRef<T = any>(...refs: Ref<T>[]) {
  return useCallback((node: T | null) => {
    refs.forEach((ref) => assignRef(ref, node));
  }, refs);
}

export function mergeRefs<T = any>(...refs: Ref<T>[]) {
  return (node: T | null) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
}

export default useMergedRef;
