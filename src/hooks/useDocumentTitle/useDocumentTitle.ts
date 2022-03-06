import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

/**
 * use-document-title sets `document.title` property with `React.useLayoutEffect` hook.
 * Hook is not called during server side rendering. Use this hook with client only applications,
 * for isomorphic use more advanced options, for example, `react-helmet`.
 *
 * Call hook with string that should be set as document title inside any component. Hook is triggered
 * every time value changes and value is not empty string (trailing whitespace is trimmed) or `null`.
 *
 * @see https://mantine.dev/hooks/use-document-title/
 *
 * @example
 * export function Component() {
 *   const [title, setTitle] = useState('');
 *   useDocumentTitle(title);
 *
 *   return (
 *     <Button onClick={() => setTitle(randomId())}>
 *       Set document title to random id
 *     </Button>
 *   );
 * }
 */
function useDocumentTitle(title: string) {
  useIsomorphicLayoutEffect(() => {
    if (typeof title === 'string' && title.trim().length > 0) {
      document.title = title.trim();
    }
  }, [title]);
}

export default useDocumentTitle;
