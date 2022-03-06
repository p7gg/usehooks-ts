import { useCallback, useEffect, useState } from 'react';

// See: https://usehooks-ts.com/react-hook/use-event-listener
import { useEventListener } from '../useEventListener';

type Value<T> = T | null;

/**
 * This React Hook allows you to read a value from localStorage by its key. It can be useful if you just want
 * to read without passing a default value. If the window object is not present (as in SSR), or if the value doesn't exist,
 * `useReadLocalStorage()` will return `null`.
 *
 * Note:
 * - If you want to be able to change the value, look useLocalStorage().
 *
 * @see https://usehooks-ts.com/react-hook/use-read-local-storage
 *
 * @example
 * export default function Component() {
 *  // Assuming a value was set in localStorage with this key
 *  const darkMode = useReadLocalStorage('darkMode')
 *
 *  return <p>DarkMode is {darkMode ? 'enabled' : 'disabled'}</p>
 *}
 */
function useReadLocalStorage<T>(key: string): Value<T> {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): Value<T> => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return null;
    }
  }, [key]);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<Value<T>>(readValue);

  // Listen if localStorage changes
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(() => {
    setStoredValue(readValue());
  }, [readValue]);

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange);

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener('local-storage', handleStorageChange);

  return storedValue;
}

export default useReadLocalStorage;
