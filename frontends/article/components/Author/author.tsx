import { Avatar, Link } from 'components/lib';
import { SubscriptionButton, UnsubscribeModal } from 'components/molecules';
import { FC } from 'react';

import classes from './Author.module.scss';
import { IAuthorProps } from './author.types';

export const Author: FC<IAuthorProps> = ({ name, bio, imgUrl, id }) => {
  return (
    <div className={classes.root}>
      <Link href={`/blogs/${id}`} className={classes.author}>
        <Avatar name={name} size='medium' imgUrl={imgUrl} />
        <div className={classes['text-block']}>
          <h3 className={classes.name}>{name}</h3>
          <p className={classes.bio}>{bio}</p>
        </div>
      </Link>
      <SubscriptionButton className={classes.subscribe} blogId={id} />
      <UnsubscribeModal />
    </div>
  );
};
