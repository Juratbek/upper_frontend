import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { ArticleFooter } from '../Footer/ArticleFooter';
import classes from './ReadArticleBottomBar.module.scss';

export const ReadArticleBottomBar: FC = () => {
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(false);
  const lastScrollTop = useRef(Number.MAX_VALUE);

  const detectScrollDirection = useCallback((event: Event): void => {
    const currentTarget = event.currentTarget as HTMLElement;

    const { scrollTop } = currentTarget;
    if (scrollTop > lastScrollTop.current) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(false);
    }
    lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
  }, []);

  useEffect(() => {
    document.querySelector('.theme-light')?.addEventListener('scroll', detectScrollDirection);

    return () => {
      document.querySelector('.theme-light')?.removeEventListener('scroll', detectScrollDirection);
    };
  }, [detectScrollDirection]);

  return (
    <div className={`${classes.root} ${isScrollingUp && classes.hide}`}>
      <div className={`${classes.body} container`}>
        <ArticleFooter />
      </div>
    </div>
  );
};
