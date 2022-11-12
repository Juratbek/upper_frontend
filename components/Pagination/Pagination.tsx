import { useUrlParams } from 'hooks';
import { FC, useMemo, useState } from 'react';
import { getClassName } from 'utils';

import classes from './Pagination.module.scss';
import { IPagesProps } from './Pagination.types';

export const Pagination: FC<IPagesProps> = ({ count, onPageChange, ...props }) => {
  const [acitvePage, setActivePage] = useState(1);
  const totalPages = useMemo(() => Math.ceil(count), [count]);
  const arr = useMemo(() => Array(totalPages).fill(''), [totalPages]);
  const { setParam } = useUrlParams();

  const prevClassName = getClassName(classes.page, acitvePage === 1 && classes['page--disabled']);
  const nextClassName = getClassName(
    classes.page,
    acitvePage === totalPages && classes['page--disabled'],
  );

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

  if (arr.length < 2) return <></>;

  return (
    <div className={`${classes.container} ${props.className}`}>
      <div className={prevClassName} onClick={(): void => addPage(-1)}>
        &#8249;
      </div>
      {arr.map((_, index) => {
        const page = index + 1;
        return (
          <div
            key={index}
            onClick={(): void => clickHandler(page)}
            className={`${classes.page} ${page === acitvePage && classes['page--active']}`}
          >
            {page}
          </div>
        );
      })}
      <div className={nextClassName} onClick={(): void => addPage(1)}>
        &#8250;
      </div>
    </div>
  );
};
