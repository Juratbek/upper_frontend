import { Avatar, Button } from 'components/lib';
import { FC } from 'react';

import classes from './Author.module.scss';
import { IAuthorProps } from './author.types';

export const Author: FC<IAuthorProps> = ({ name, bio }) => {
  return (
    <div className={classes.root}>
      <Avatar imgUrl='' />
      <div className={classes['text-block']}>
        <h3 className={classes.name}>{name}</h3>
        <p className={classes.bio}>{bio}</p>
      </div>
      <Button>Obuna bo&apos;lish</Button>
    </div>
  );
};
