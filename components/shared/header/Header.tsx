import { Button, Link } from 'components/lib';
import { SearchInput } from 'components/SearchInput/SearchInput';
import { useTheme } from 'hooks';
import { FC, useCallback, useEffect, useRef } from 'react';
import { ICONS } from 'variables';

import { Profile } from '../profile';
import classes from './Header.module.scss';

const Logo = ICONS.logo;

export const Header: FC = () => {
  const { themeColors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollListener = useCallback(() => {
    let headerPositionTop = 0;
    let prevScrollY = 0;
    return () => {
      const { scrollY } = window;
      const container = containerRef.current;
      if (!container) return;
      const direction = scrollY > prevScrollY ? 'down' : 'up';

      if (direction === 'down' && headerPositionTop >= -64) {
        --headerPositionTop;
        container.style.transform = `translateY(${headerPositionTop}px)`;
      } else if (direction === 'up' && headerPositionTop < 0) {
        ++headerPositionTop;
        container.style.transform = `translateY(${headerPositionTop}px)`;
      }
      prevScrollY = scrollY;
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', scrollListener());
    return () => window.removeEventListener('scroll', scrollListener());
  }, [scrollListener]);

  return (
    <div className={`${classes.header} container`} ref={containerRef}>
      <Link href='/' className={classes.logo}>
        <Logo color={themeColors.icon} />
      </Link>
      <SearchInput />
      <Button className={classes['write-article-btn']}>+ Maqola yozish</Button>
      <Profile />
    </div>
  );
};
