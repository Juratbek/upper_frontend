import { Actions, ArticleImg, Author, Label } from 'components';
import Link from 'next/link';
import { FC } from 'react';
import { formatToKMB, getClassName, toDateString } from 'utils';
import { ICONS } from 'variables';

import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

export const Article: FC<IArticleProps> = ({
  className,
  actions,
  icons,
  article,
  author,
  redirectUrl,
}) => {
  const { title, content, updatedDate, publishedDate, viewCount, labels = [], status } = article;
  const rootClassName = getClassName(classes.article, className);

  return (
    <div className={rootClassName}>
      <Link href={`${redirectUrl || '/articles'}/${1}?status=${status}`}>
        <div className={classes.body}>
          <div className={classes['text-content']}>
            <h2 className={classes.title}>{title}</h2>
            <p className={classes.content}>{content}</p>
          </div>
          <ArticleImg imgUrl='' className='mt-2' />
        </div>
      </Link>
      <div className={classes.footer}>
        <div>
          {updatedDate ? (
            <span>
              <strong>{toDateString(updatedDate)}</strong> da yangilangan
            </span>
          ) : (
            <span>
              <strong>{toDateString(publishedDate)}</strong> da nashr etilgan
            </span>
          )}
          &nbsp; &nbsp;
          {viewCount && (
            <span>
              <strong>{formatToKMB(viewCount)}</strong> martta o`qilgan
            </span>
          )}
        </div>
        <div>
          {labels.map((label) => (
            <span key={label.id} style={{ marginLeft: '.3rem' }}>
              <Label>{label.name}</Label>
            </span>
          ))}
        </div>
      </div>
      <div className={classes.footer} style={{ marginTop: '.5rem' }}>
        {author ? <Author {...author} /> : <div />}
        <div className='d-flex'>
          {icons &&
            icons.map((icon) => {
              const Icon = ICONS[icon];
              return (
                <span key={icon} style={{ marginRight: '.8rem' }}>
                  <Icon />
                </span>
              );
            })}
          {actions && <Actions actions={actions} />}
        </div>
      </div>
    </div>
  );
};
