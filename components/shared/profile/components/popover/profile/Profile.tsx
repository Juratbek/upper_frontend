import { Avatar, Link } from 'components/lib';
import { FC } from 'react';
import { TNoop } from 'types';
import { ICONS } from 'variables';

import classes from './Profile.module.scss';

const PenIcon = ICONS.pen;

export const Profile: FC<{ closePopover: TNoop; className?: string }> = ({
  closePopover,
  className,
}): JSX.Element => (
  <div className={className}>
    <div className={classes.profile}>
      <Avatar size='large' imgUrl='' className={classes['profile--pick']} />
      <div className='flex-1'>
        <h3 className={classes['profile--name']}>Og’abek Yusuf</h3>
        <p className={classes['profile--bio']}>ogabekyusuf...@gmail.com</p>
      </div>
      <Link href='/profile' className={classes['pen-icon']} onClick={closePopover}>
        <PenIcon />
      </Link>
    </div>
  </div>
);
