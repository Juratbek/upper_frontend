import { Avatar, Link } from 'components/lib';
import { FC } from 'react';
import { addAmazonUri } from 'utils/blog';
import { dateInterval } from 'utils/date';

import classes from './Comment.module.scss';
import { ICommentProps } from './Comment.types';

export const Comment: FC<ICommentProps> = (props) => {
  const { author, text, date, updatedText } = props;

  return (
    <div className={classes.root}>
      <Avatar imgUrl={addAmazonUri(author).imgUrl} size='small' />
      <div className={classes.body}>
        <div className={classes['body-header']}>
          <Link href={`/blogs/${author.id}`} className={classes.link}>
            <h4 className={classes['author-name']}>{author.name}</h4>
          </Link>
          <p className={classes.date}>{dateInterval(date)}</p>
        </div>
        <p className={classes.text}>{updatedText || text}</p>
      </div>
    </div>
  );
};
