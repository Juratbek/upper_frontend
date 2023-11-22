import { Avatar, Button } from 'components/lib';
import { FC } from 'react';

import classes from './Author.module.scss';
import { IAuthorProps } from './author.types';

export const Author: FC<IAuthorProps> = ({ name, bio, imgUrl }) => {
  return (
    <div className={classes.root}>
      <Avatar size='medium' imgUrl={imgUrl} />
      <div className={classes['text-block']}>
        <h3 className={classes.name}>{name}</h3>
        <p className={classes.bio}>{bio}</p>
      </div>
      <Button className={classes.subscribe}>Obuna bo&apos;lish</Button>
    </div>
  );
};
