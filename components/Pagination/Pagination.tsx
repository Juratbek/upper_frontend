import { useTheme, useUrlParams } from 'hooks';
import { FC, ReactNode } from 'react';
import { getClassName } from 'utils';

import classes from './Pagination.module.scss';
import { IPagesProps } from './Pagination.types';

const pagesToShow = 10;

const PaginationItem: FC<{
  pageNumber: number;
  currentPage: number;
  onClick: (p: number) => void;
}> = ({ pageNumber, onClick, currentPage }) => {
  const { themeColors } = useTheme();

  return (
    <div
      onClick={(): void => onClick(pageNumber)}
      className={`${classes.page} ${pageNumber === currentPage && classes['page--active']}`}
      style={pageNumber === currentPage ? {} : { borderColor: themeColors.pagination.border }}
    >
      {pageNumber}
    </div>
  );
};

export const Pagination: FC<IPagesProps> = ({ pagesCount, onPageChange, ...props }) => {
  const { setParam, getParam } = useUrlParams();
  const currentPage = Number(getParam('page')) || 1;
  const { themeColors } = useTheme();
  const prevClassName = getClassName(classes.page, currentPage === 1 && classes['page--disabled']);
  const nextClassName = getClassName(
    classes.page,
    currentPage === pagesCount && classes['page--disabled'],
  );

  const clickHandler = (page: number): void => {
    changeActivePage(page);
  };

  const addPage = (count: number): void => {
    changeActivePage(currentPage + count);
  };

  const ellipsis = (): ReactNode => <div className={classes.ellipsis}>...</div>;
  const changeActivePage = (page: number): void => {
    if (page < 1 || page > pagesCount) return;
    onPageChange?.(page);
    setParam('page', page);
  };
  const getPageItems = (): ReactNode => {
    if (pagesCount <= pagesToShow) {
      return Array.from({ length: pagesCount }, (_, index) => (
        <PaginationItem
          key={index + 1}
          pageNumber={index + 1}
          currentPage={currentPage}
          onClick={clickHandler}
        />
      ));
    } else {
      const middleIndex = Math.ceil(pagesToShow / 2);

      if (currentPage <= middleIndex + 1) {
        return [
          ...Array.from({ length: pagesToShow }, (_, index) => (
            <PaginationItem
              key={index + 1}
              pageNumber={index + 1}
              currentPage={currentPage}
              onClick={clickHandler}
            />
          )),
          ellipsis(),
          <PaginationItem
            key={pagesCount}
            pageNumber={pagesCount}
            currentPage={currentPage}
            onClick={clickHandler}
          />,
        ];
      } else if (currentPage >= pagesCount - middleIndex) {
        return [
          <PaginationItem
            key={1}
            pageNumber={1}
            currentPage={currentPage}
            onClick={clickHandler}
          />,
          ellipsis(),
          ...Array.from({ length: pagesToShow }, (_, index) => (
            <PaginationItem
              key={pagesCount - pagesToShow + index + 1}
              pageNumber={pagesCount - pagesToShow + index + 1}
              currentPage={currentPage}
              onClick={clickHandler}
            />
          )),
        ];
      } else {
        return [
          <PaginationItem
            key={1}
            pageNumber={1}
            currentPage={currentPage}
            onClick={clickHandler}
          />,
          ellipsis(),

          ...Array.from({ length: pagesToShow - 2 }, (_, index) => (
            <PaginationItem
              key={currentPage - middleIndex + index + 2}
              pageNumber={currentPage - middleIndex + index + 2}
              currentPage={currentPage}
              onClick={clickHandler}
            />
          )),
          ellipsis(),
          <PaginationItem
            key={pagesCount}
            pageNumber={pagesCount}
            currentPage={currentPage}
            onClick={clickHandler}
          />,
        ];
      }
    }
  };

  return (
    <div className={`${classes.container} ${props.className}`}>
      <div
        style={currentPage === 1 ? {} : { borderColor: themeColors.pagination.border }}
        className={prevClassName}
        onClick={(): void => addPage(-1)}
      >
        &#8249;
      </div>
      {getPageItems()}
      <div
        style={currentPage === pagesCount ? {} : { borderColor: themeColors.pagination.border }}
        className={nextClassName}
        onClick={(): void => addPage(1)}
      >
        &#8250;
      </div>
    </div>
  );
};
