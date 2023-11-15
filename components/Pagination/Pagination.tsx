import { useTheme, useUrlParams } from 'hooks';
import { FC, useMemo } from 'react';
import { getClassName } from 'utils';

import classes from './Pagination.module.scss';
import { IPagesProps } from './Pagination.types';

export const Pagination: FC<IPagesProps> = ({ pagesCount, ...props }) => {
  const arr = useMemo(() => Array(pagesCount).fill(''), [pagesCount]);
  const { setParam, getParam } = useUrlParams();
  const activePage = useMemo(() => {
    const p = getParam('page') as string;
    return isNaN(+p) ? 0 : parseInt(p);
  }, [getParam]);
  const { themeColors } = useTheme();
  const prevClassName = getClassName(classes.page, activePage === 0 && classes['page--disabled']);
  const nextClassName = getClassName(
    classes.page,
    activePage === pagesCount && classes['page--disabled'],
  );

  const clickHandler = (page: number): void => {
    changeActivePage(page);
  };

  const addPage = (count: number): void => {
    changeActivePage(activePage + count);
  };

  const changeActivePage = (page: number): void => {
    if (page < 1 || page > pagesCount) return;
    setParam('page', page);
  };

  if (arr.length < 2) return <></>;

  return (
    <div className={`${classes.container} ${props.className}`}>
      <div
        style={activePage === 1 ? {} : { borderColor: themeColors.pagination.border }}
        className={prevClassName}
        onClick={(): void => addPage(-1)}
      >
        &#8249;
      </div>
      {arr.map((_, index) => (
        <div
          key={index}
          onClick={(): void => clickHandler(index)}
          className={`${classes.page} ${index === activePage && classes['page--active']}`}
          style={index === activePage ? {} : { borderColor: themeColors.pagination.border }}
        >
          {index + 1}
        </div>
      ))}
      <div
        style={activePage === pagesCount ? {} : { borderColor: themeColors.pagination.border }}
        className={nextClassName}
        onClick={(): void => addPage(1)}
      >
        &#8250;
      </div>
    </div>
  );
};
