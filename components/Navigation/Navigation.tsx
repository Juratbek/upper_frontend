import Link from 'next/link';
import { ICONS } from 'variables';

import { NAVIGATION_ICONS } from './Navigation.constants';
import classes from './Navigation.module.css';

export const Navigation = (): JSX.Element => {
  return (
    <div className={classes.navigation}>
      <div className={`${classes.navigation} ${classes.positioned}`}>
        {NAVIGATION_ICONS.map(({ icon, href, ...props }, index) => {
          const Icon = ICONS[icon];
          return (
            <div key={index}>
              <Link href={href}>
                <a className={classes.icon}>
                  <Icon {...props} />
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
