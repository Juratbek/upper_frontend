import { usePagination, useTheme, useUrlParams } from 'hooks';
import { FC, useState } from 'react';
import { getClassName } from 'utils';
import { DOTS } from 'variables';

import classes from './Pagination.module.scss';
import { IPagesProps } from './Pagination.types';

export const Pagination: FC<IPagesProps> = ({ count, onPageChange, ...props }) => {
  const [acitvePage, setActivePage] = useState(1);
  const totalPages = Math.ceil(count);
  const { setParam } = useUrlParams();
  const { themeColors } = useTheme();
  const prevClassName = getClassName(classes.page, acitvePage === 1 && classes['page--disabled']);
  const nextClassName = getClassName(
    classes.page,
    acitvePage === totalPages && classes['page--disabled'],
  );
  const dots = getClassName(classes.page, classes['page--disabled']);

  const paginationRange = usePagination({
    totalPageCount: totalPages,
    siblingCount: 1,
    currentPage: acitvePage,
  });

  const clickHandler = (page: number): void => {
    changeActivePage(page);
  };

  const addPage = (count: number): void => {
    changeActivePage(acitvePage + count);
  };

  const changeActivePage = (page: number): void => {
    if (page < 1 || page > totalPages) return;
    setActivePage(page);
    onPageChange?.(page);
    setParam('page', page);
  };

  if (acitvePage === 0 || paginationRange.length < 2) return null;

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={`${classes.container} ${props.className}`}>
      <div
        style={acitvePage === 1 ? {} : { borderColor: themeColors.pagination.border }}
        className={prevClassName}
        onClick={(): void => addPage(-1)}
      >
        &#8249;
      </div>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className={dots}>
              &#8230;
            </li>
          );
        }
        return (
          <div
            key={index}
            onClick={(): void => clickHandler(pageNumber as number)}
            className={`${classes.page} ${pageNumber === acitvePage && classes['page--active']}`}
            style={pageNumber === acitvePage ? {} : { borderColor: themeColors.pagination.border }}
          >
            {pageNumber}
          </div>
        );
      })}
      <div
        style={acitvePage === lastPage ? {} : { borderColor: themeColors.pagination.border }}
        className={nextClassName}
        onClick={(): void => addPage(1)}
      >
        &#8250;
      </div>
    </div>
  );
};
