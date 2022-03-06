import { useMemo } from 'react';
import { useUncontrolled } from '../useUncontrolled';
import { range } from '../../utils';

export const DOTS = 'dots';

export interface PaginationParams {
  /** Page selected on initial render, defaults to 1 */
  initialPage?: number;

  /** Controlled active page number */
  page?: number;

  /** Total amount of pages */
  total: number;

  /** Siblings amount on left/right side of selected page, defaults to 1 */
  siblings?: number;

  /** Amount of elements visible on left/right edges, defaults to 1  */
  boundaries?: number;

  /** Callback fired after change of each page */
  onChange?: (page: number | null) => void;
}

/**
 * Manage pagination state
 *
 * use-pagination hook is a state management hook for `Pagination` component, it lets you manage pagination with controlled and uncontrolled state:
 *
 * @see https://mantine.dev/hooks/use-pagination/
 *
 * @example
 * const pagination = usePagination({ total: 10, initialPage: 1 });
 *
 * pagination.range; // -> [1, 2, 3, 4, 5, 'dots', 10];
 *
 * pagination.setPage(5);
 * pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];
 *
 * pagination.next();
 * pagination.range; // -> [1, 'dots', 5, 6, 7, 'dots', 10];
 *
 * pagination.previous();
 * pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];
 *
 * pagination.last();
 * pagination.range; // -> [1, 'dots', 6, 7, 8, 9, 10];
 *
 * pagination.first();
 * pagination.range; // -> [1, 2, 3, 4, 5, 'dots', 10];
 */
function usePagination({
  total,
  siblings = 1,
  boundaries = 1,
  page,
  initialPage = 1,
  onChange,
}: PaginationParams) {
  const [activePage, setActivePage] = useUncontrolled({
    value: page,
    onChange: onChange as (page: number | null) => void,
    defaultValue: initialPage,
    finalValue: initialPage,
    rule: (_page: number | null | undefined) =>
      typeof _page === 'number' && _page <= total,
  });

  const setPage = (pageNumber: number) => {
    if (pageNumber <= 0) {
      setActivePage(1);
    } else if (pageNumber > total) {
      setActivePage(total);
    } else {
      setActivePage(pageNumber);
    }
  };

  const next = () => setPage(activePage! + 1);
  const previous = () => setPage(activePage! - 1);
  const first = () => setPage(1);
  const last = () => setPage(total);

  const paginationRange = useMemo((): (number | 'dots')[] => {
    // Pages count is determined as siblings (left/right) + boundaries(left/right) + currentPage + 2*DOTS
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;

    /*
     * If the number of pages is less than the page numbers we want to show in our
     * paginationComponent, we return the range [1..total]
     */
    if (totalPageNumbers >= total) {
      return range(1, total);
    }

    const leftSiblingIndex = Math.max(activePage! - siblings, boundaries);
    const rightSiblingIndex = Math.min(activePage! + siblings, total - boundaries);

    /*
     * We do not want to show dots if there is only one position left
     * after/before the left/right page count as that would lead to a change if our Pagination
     * component size which we do not want
     */
    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < total - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      return [
        ...range(1, leftItemCount),
        DOTS,
        ...range(total - (boundaries - 1), total),
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      return [
        ...range(1, boundaries),
        DOTS,
        ...range(total - rightItemCount, total),
      ];
    }

    return [
      ...range(1, boundaries),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(total - boundaries + 1, total),
    ];
  }, [total, siblings, activePage]);

  return {
    range: paginationRange,
    active: activePage,
    setPage,
    next,
    previous,
    first,
    last,
  };
}

export default usePagination;
