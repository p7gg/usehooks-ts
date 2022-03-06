import { useRef } from 'react';
import { useDidUpdate } from '../useDidUpdate';

interface UseFocusReturn {
  opened: boolean;
  transitionDuration: number;
  shouldReturnFocus?: boolean;
}

/**
 * use-focus-return automatically manages focus returning to last focused element when given condition is met.
 * For example it is used in Modal component to restore focus after modal was closed.
 *
 * @see https://mantine.dev/hooks/use-focus-return/
 *
 * @example```
 * useFocusReturn({
 *  // Is region with focus trap active?
 *  // When it activates hook saves document.activeElement to internal state
 *  // and focuses this element once focus trap is deactivated
 *  opened: false,
 *
 *  // Transition duration in ms, used to set timeout as element cannot be focused when focus trap is active
 *  transitionDuration: 200,
 *
 *  // Optional Should focus be returned automatically? Defaults to true
 *  shouldReturnFocus: true,
 * });
 * ```
 *
 *
 * If shouldReturnFocus option is set to false you can call returned function to focus last active element:
 * @example```
 * const returnFocus = useFocusReturn({
 *   opened: false,
 *   transitionDuration: 200,
 *   shouldReturnFocus: true,
 * });
 *
 * // ... later
 * returnFocus();
 * ```
 */
function useFocusReturn({
  opened,
  transitionDuration,
  shouldReturnFocus = true,
}: UseFocusReturn) {
  const lastActiveElement = useRef<HTMLElement>();
  const returnFocus = () => {
    if (
      lastActiveElement.current &&
      'focus' in lastActiveElement.current &&
      typeof lastActiveElement.current.focus === 'function'
    ) {
      lastActiveElement.current?.focus();
    }
  };

  useDidUpdate(() => {
    let timeout = -1;

    const clearFocusTimeout = (event: KeyboardEvent) => {
      if (event.code === 'Tab') {
        window.clearTimeout(timeout);
      }
    };

    document.addEventListener('keydown', clearFocusTimeout);

    if (opened) {
      lastActiveElement.current = document.activeElement as HTMLElement;
    } else if (shouldReturnFocus) {
      timeout = window.setTimeout(returnFocus, transitionDuration + 10);
    }

    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener('keydown', clearFocusTimeout);
    };
  }, [opened]);

  return returnFocus;
}

export default useFocusReturn;
