import { Avatar } from 'components/Avatar/Avatar';
import { FC } from 'react';

import classes from './Author.module.css';
import { IAuthorProps } from './Author.types';

export const Author: FC<IAuthorProps> = ({ name, imgUrl }) => {
  return (
    <div className={classes.blog}>
      <Avatar imgUrl={imgUrl} />
      <h4 className='m-0'>{name}</h4>
    </div>
  );
};
