import { useTheme, useUrlParams } from 'hooks';
import { FC, ReactNode } from 'react';
import { getClassName } from 'utils';

import { PAGINATION_SIZE } from '../../variables';
import classes from './Pagination.module.scss';
import { IPagesProps } from './Pagination.types';

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

export const Pagination: FC<IPagesProps> = ({ count, onPageChange, ...props }) => {
  const { setParam, getParam } = useUrlParams();
  const currentPage = Number(getParam('page')) || 1;
  const { themeColors } = useTheme();
  const prevClassName = getClassName(classes.page, currentPage === 1 && classes['page--disabled']);
  const nextClassName = getClassName(
    classes.page,
    currentPage === count && classes['page--disabled'],
  );

  const clickHandler = (page: number): void => {
    changeActivePage(page);
  };

  const addPage = (count: number): void => {
    changeActivePage(currentPage + count);
  };

  const ellipsis = (): JSX.Element => <div className={classes.ellipsis}>...</div>;
  const changeActivePage = (page: number): void => {
    if (page < 1 || page > count) return;
    onPageChange?.(page);
    setParam('page', page);
  };
  const getPageItems = (): ReactNode => {
    if (count <= PAGINATION_SIZE) {
      return Array.from({ length: count }, (_, index) => (
        <PaginationItem
          key={index + 1}
          pageNumber={index + 1}
          currentPage={currentPage}
          onClick={clickHandler}
        />
      ));
    } else {
      const middleIndex = Math.ceil(PAGINATION_SIZE / 2);

      if (currentPage <= middleIndex + 1) {
        return [
          ...Array.from({ length: PAGINATION_SIZE }, (_, index) => (
            <PaginationItem
              key={index + 1}
              pageNumber={index + 1}
              currentPage={currentPage}
              onClick={clickHandler}
            />
          )),
          ellipsis(),
          <PaginationItem
            key={count}
            pageNumber={count}
            currentPage={currentPage}
            onClick={clickHandler}
          />,
        ];
      } else if (currentPage >= count - middleIndex) {
        return [
          <PaginationItem
            key={1}
            pageNumber={1}
            currentPage={currentPage}
            onClick={clickHandler}
          />,
          ellipsis(),
          ...Array.from({ length: PAGINATION_SIZE }, (_, index) => (
            <PaginationItem
              key={count - PAGINATION_SIZE + index + 1}
              pageNumber={count - PAGINATION_SIZE + index + 1}
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

          ...Array.from({ length: PAGINATION_SIZE - 2 }, (_, index) => (
            <PaginationItem
              key={currentPage - middleIndex + index + 2}
              pageNumber={currentPage - middleIndex + index + 2}
              currentPage={currentPage}
              onClick={clickHandler}
            />
          )),
          ellipsis(),
          <PaginationItem
            key={count}
            pageNumber={count}
            currentPage={currentPage}
            onClick={clickHandler}
          />,
        ];
      }
    }
  };

  if (count < 1) return null;

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
        style={currentPage === count ? {} : { borderColor: themeColors.pagination.border }}
        className={nextClassName}
        onClick={(): void => addPage(1)}
      >
        &#8250;
      </div>
    </div>
  );
};
