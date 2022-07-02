import Link from 'next/link';

import { NAVIGATION_ICONS } from './Navigation.constants';
import classes from './Navigation.module.css';

export const Navigation = (): JSX.Element => {
  return (
    <div className={classes.navigation}>
      <div className={`${classes.navigation} ${classes.positioned}`}>
        {NAVIGATION_ICONS.map(({ Icon, href, ...props }, index) => (
          <div key={index}>
            <Link href={href}>
              <a>
                <Icon {...props} />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
