import { useLocalStorage } from '../useLocalStorage';
import { useMediaQuery } from '../useMediaQuery';
import { useUpdateEffect } from '../useUpdateEffect';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

interface UseDarkModeOutput {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

/**
 * This React Hook offers you an interface to enable, disable, toggle and read the dark theme mode.
 * The returned value (`isDarkMode`) is a boolean to let you be able to use with your logic.
 * It uses internally `useLocalStorage()` to persist the value and listens the OS color scheme preferences.
 *
 * @see https://usehooks-ts.com/react-hook/use-dark-mode
 *
 * @example
 * export default function Component() {
 *   const { isDarkMode, toggle, enable, disable } = useDarkMode()
 *
 *   return (
 *     <div>
 *       <p>Current theme: {isDarkMode ? 'dark' : 'light'}</p>
 *       <button onClick={toggle}>Toggle</button>
 *       <button onClick={enable}>Enable</button>
 *       <button onClick={disable}>Disable</button>
 *     </div>
 *   )
 * }
 */
function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    'usehooks-ts-dark-mode',
    defaultValue ?? isDarkOS ?? false,
  );

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    setDarkMode(isDarkOS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS]);

  return {
    isDarkMode,
    toggle: () => setDarkMode((prev) => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  };
}

export default useDarkMode;
