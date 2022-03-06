import { useEffect, useReducer, useRef } from 'react';

interface State<T> {
  data?: T;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

/**
 * Here is a React Hook which aims to retrieve data on an API using the native Fetch API.
 * I used a reducer to separate state logic and simplify testing via functional style.
 * The received data is saved (cached) in the application via useRef, but you can use LocalStorage
 * (see useLocalStorage()) or a caching solution to persist the data.
 * The fetch is executed when the component is mounted and if the url changes. If ever the url is undefined,
 * or if the component is unmounted before the data is recovered, the fetch will not be called.
 * This hook also takes the request config as a second parameter in order to be able to pass the authorization token
 * in the header of the request, for example. Be careful though, the latter does not trigger a re-rendering in case of modification,
 * go through the url params to dynamically change the request.
 *
 * Side notes:
 *
 * - To understand how is working this hook, you can read this article from "Smashing Magazine" which explains how to build a
 *   custom react hook to fetch and cache data
 * - For usage in SSR, consider using window.fetch.polyfill
 * - It's a very simple fetch hook for basic use cases and learning purposes. For advanced usages and optimisations,
 *   see these other hooks more powerfull like useSWR, useQuery or if you're using Redux Toolkit, consider RTK Query.
 *
 * @see https://usehooks-ts.com/react-hook/use-fetch
 *
 * @example
 *
 * const url = `http://jsonplaceholder.typicode.com/posts`
 *
 * interface Post {
 *   userId: number
 *   id: number
 *   title: string
 *   body: string
 * }
 *
 * export default function Component() {
 *   const { data, error } = useFetch<Post[]>(url)
 *
 *   if (error) return <p>There is an error.</p>
 *   if (!data) return <p>Loading...</p>
 *   return <p>{data[0].title}</p>
 * }
 */
function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({ type: 'fetched', payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: 'error', payload: error as Error });
      }
    };

    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetch;
