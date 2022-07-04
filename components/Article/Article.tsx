import { Blog, Label } from 'components';
import { Actions } from 'components/Actions/Actions';
import Image from 'next/image';
import { FC } from 'react';
import { formatToKMB, toDateString } from 'utils';
import { ICONS } from 'variables';

import { ARTICLE_ACTIONS, ARTICLE_ICONS } from './Article.constants';
import classes from './Article.module.css';
import { IArticleProps } from './Article.types';

export const Article: FC<IArticleProps> = (props) => {
  const { title, content, publishedDate, updatedDate, viewCount, labels = [], author } = props;

  return (
    <div className={classes.article}>
      <div className={classes.body}>
        <div className={classes['text-content']}>
          <h2 className={classes.title}>{title}</h2>
          <p className={classes.content}>{content}</p>
        </div>
        <div className={classes['article-img']}>
          <Image src='/vercel.svg' alt='Vercel Logo' width={170} height={100} />
        </div>
      </div>
      <div className={classes.footer}>
        <div>
          {updatedDate ? (
            <span>
              <strong>{toDateString(updatedDate)}</strong> da yangilangan
            </span>
          ) : (
            <span>
              <strong>{toDateString(publishedDate)}</strong> da chop etilgan
            </span>
          )}
          &nbsp; &nbsp;
          {viewCount && (
            <span>
              <strong>{formatToKMB(viewCount)}</strong> martta ko`rilgan
            </span>
          )}
        </div>
        <div>
          {labels.map((label) => (
            <span key={label.id} style={{ marginLeft: '.3rem' }}>
              <Label {...label} />
            </span>
          ))}
        </div>
      </div>
      <div className={classes.footer} style={{ marginTop: '.5rem' }}>
        <Blog {...author} />
        <div className='d-flex'>
          {ARTICLE_ICONS.map((icon) => {
            const Icon = ICONS[icon];
            return (
              <span key={icon} style={{ marginRight: '.8rem' }}>
                <Icon />
              </span>
            );
          })}
          <Actions actions={ARTICLE_ACTIONS} />
        </div>
      </div>
    </div>
  );
};
