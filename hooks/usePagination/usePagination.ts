import { useMemo } from 'react';
import { range } from 'utils';
import { DOTS } from 'variables';

import { IPagination } from './usePagination.types';

export const usePagination = ({
  totalPageCount,
  siblingCount = 1,
  currentPage,
}: IPagination): Array<number | string> => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers: number = siblingCount + 4;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex: number = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex: number = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots: boolean = leftSiblingIndex > 2;
    const shouldShowRightDots: boolean = rightSiblingIndex < totalPageCount - 2;

    const fristPageIndex = 1;
    const lastPageIndex: number = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount: number = 2 + 2 * siblingCount;
      const itemRange = range(1, leftItemCount);

      return [...itemRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount: number = 2 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

      return [fristPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const midRange = range(leftSiblingIndex, rightSiblingIndex);
      return [fristPageIndex, DOTS, ...midRange, DOTS, lastPageIndex];
    }
    return [];
  }, [totalPageCount, siblingCount, currentPage]);

  return paginationRange;
};
