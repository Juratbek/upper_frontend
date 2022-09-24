import { ArticleImg, Author, Label } from 'components';
import Link from 'next/link';
import { FC, useEffect, useRef } from 'react';
import { formatToKMB, getClassName, toDateString } from 'utils';

import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

export const Article: FC<IArticleProps> = ({ className, article, author, redirectUrl }) => {
  const { title, content, updatedDate, publishedDate, viewCount, labels = [], id } = article;
  const rootClassName = getClassName(classes.article, className);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentContainer = contentRef.current;
    const contentMaxChar = 500;
    if (contentContainer) {
      const span = document.createElement('span');
      span.innerHTML =
        content.length > contentMaxChar ? `${content.slice(0, contentMaxChar)}...` : content;
      contentContainer.appendChild(span);
    }
  }, [content]);

  return (
    <div className={rootClassName}>
      <Link href={`${redirectUrl || '/articles'}/${id}`}>
        <div className={classes.body}>
          <div className={classes['text-content']}>
            <h2 className={classes.title}>{title}</h2>
            <p className={classes.content} ref={contentRef} />
          </div>
          <ArticleImg imgUrl='' />
        </div>
      </Link>
      <div className={classes.footer}>
        <div className={classes.stats}>
          <span>
            {updatedDate ? (
              <>
                <strong>{toDateString(updatedDate)}</strong> da yangilangan
              </>
            ) : (
              <>
                <strong>{toDateString(publishedDate)}</strong> da nashr etilgan
              </>
            )}
          </span>
          &nbsp; &nbsp;
          {viewCount > 0 && (
            <span>
              <strong>{formatToKMB(viewCount)}</strong> martta o`qilgan
            </span>
          )}
        </div>
        <div>
          {labels?.map((label) => (
            <span key={label.id} style={{ marginLeft: '.3rem' }}>
              <Label>{label.name}</Label>
            </span>
          ))}
        </div>
      </div>
      <div className={classes.footer} style={{ marginTop: '.5rem' }}>
        {author ? <Author {...author} /> : <div />}
      </div>
    </div>
  );
};
