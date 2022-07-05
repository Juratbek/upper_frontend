import { Avatar } from 'components/Avatar/Avatar';
import { FC } from 'react';
import { AVATAR_SIZES } from 'variables';

import classes from './Author.module.css';
import { IAuthorProps } from './Author.types';

export const Author: FC<IAuthorProps> = ({ name, imgUrl }) => {
  return (
    <div className={classes.blog}>
      <Avatar imgUrl={imgUrl} size={AVATAR_SIZES.small} />
      <h4 className='m-0'>{name}</h4>
    </div>
  );
};
