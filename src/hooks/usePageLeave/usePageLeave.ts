import { useEffect } from 'react';

function usePageLeave(onPageLeave: () => void) {
  useEffect(() => {
    document.documentElement.addEventListener('mouseleave', onPageLeave);
    return () =>
      document.documentElement.removeEventListener('mouseleave', onPageLeave);
  }, []);
}

export default usePageLeave;
