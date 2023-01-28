import { ArticleImg, Author } from 'components';
import { FC } from 'react';
import { addAmazonUri } from 'utils';

import classes from './PublishedTutorial.module.scss';
import { ITutorialProps } from './PublishedTutorial.types';

export const PublishedTutorial: FC<ITutorialProps> = ({ name, imgUrl, author }) => {
  return (
    <div className={`${classes.container} card`}>
      <ArticleImg className={classes.img} imgUrl={imgUrl} />
      <div className={classes.body}>
        <h3 className='mt-0'>{name}</h3>
        <Author {...addAmazonUri(author)} />
      </div>
    </div>
  );
};
