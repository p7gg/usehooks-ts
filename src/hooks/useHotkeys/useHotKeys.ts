import { useEffect } from 'react';
import { getHotkeyMatcher, getHotkeyHandler } from './parse-hotkey';

export { getHotkeyHandler };

type HokeyItem = [string, (event: KeyboardEvent) => void];

function shouldFireEvent(event: KeyboardEvent) {
  if (event.target instanceof HTMLElement) {
    return !['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName);
  }
  return true;
}

/**
 * Listen for keys combinations on document element
 *
 * Hook accepts an array with hotkey and handler tuples:
 *
 * - `hotkey` - hotkey string e.g. `ctrl+E`, `shift+alt+L`, `mod+S`
 * - `handler` - event handler called when given combination was pressed
 *
 * @see https://mantine.dev/hooks/use-hotkeys/
 *
 * @example```
 * function Demo() {
 *   // ctrl + J and ⌘ + J to toggle color scheme
 *   // ctrl + K and ⌘ + K to search
 *   useHotkeys([
 *     ['mod+J', () => toggleColorScheme()],
 *     ['ctrl+K', () => search()],
 *     ['alt+mod+shift+X', () => rickRoll()],
 *   ]);
 *
 *   return null;
 * }
 * ```
 *
 * use-hotkeys hook can work only with document element, you will need to create your own event
 * listener if you need to support other elements. For this purpose package exports getHotkeysHandler
 * function which should be used with `onKeyDown`:
 *
 * @example
 * function Demo() {
 *   const [value, setValue] = useState("I've just used a hotkey to send a message");
 *   const notifications = useNotifications();
 *
 *   const handleSubmit = () =>
 *     notifications.showNotification({ title: 'Your message', message: value });
 *
 *   const handleSave = () =>
 *     notifications.showNotification({ title: 'You saved', color: 'teal', message: value });
 *
 *   return (
 *     <TextInput
 *       placeholder="Your message"
 *       label="Press ⌘+Enter or Ctrl+Enter when input has focus to send message"
 *       value={value}
 *       onChange={(event) => setValue(event.target.value)}
 *       onKeyDown={getHotkeyHandler([
 *         ['mod+Enter', handleSubmit],
 *         ['mod+S', handleSave],
 *       ])}
 *     />
 *   );
 * }
 */
function useHotkeys(hotkeys: HokeyItem[]) {
  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      hotkeys.forEach(([hotkey, handler]) => {
        if (getHotkeyMatcher(hotkey)(event) && shouldFireEvent(event)) {
          event.preventDefault();
          handler(event);
        }
      });
    };

    document.documentElement.addEventListener('keydown', keydownListener);
    return () =>
      document.documentElement.removeEventListener('keydown', keydownListener);
  }, [hotkeys]);
}

export default useHotkeys;
