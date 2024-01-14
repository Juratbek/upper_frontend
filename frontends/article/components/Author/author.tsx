import { Avatar } from 'components/lib';
import { SubscriptionButton } from 'components/molecules';
import { FC } from 'react';

import classes from './Author.module.scss';
import { IAuthorProps } from './author.types';

export const Author: FC<IAuthorProps> = ({ name, bio, imgUrl, id }) => {
  return (
    <div className={classes.root}>
      <Avatar size='medium' imgUrl={imgUrl} />
      <div className={classes['text-block']}>
        <h3 className={classes.name}>{name}</h3>
        <p className={classes.bio}>{bio}</p>
      </div>
      <SubscriptionButton className={classes.subscribe} blogId={id} />
    </div>
  );
};
