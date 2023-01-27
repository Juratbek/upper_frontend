import { ArticleImg, Author, Label, Status } from 'components';
import { Divider } from 'components/lib';
import Link from 'next/link';
import { FC, useEffect, useRef } from 'react';
import { addAmazonUri, formatToKMB, getClassName, toDateString } from 'utils';

import classes from './Article.module.scss';
import { IArticleProps } from './Article.types';

export const Article: FC<IArticleProps> = ({ article, author, redirectUrl, ...props }) => {
  const {
    title,
    content,
    updatedDate,
    publishedDate,
    viewCount,
    likeCount,
    labels = [],
    id,
    imgUrl,
    status,
  } = article;
  const rootClassName = getClassName(classes.article, props.className, 'card');
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

  const renderDate = (): JSX.Element => {
    if (updatedDate)
      return (
        <>
          <strong>{toDateString(updatedDate)}</strong> da yangilangan
        </>
      );
    if (publishedDate) return <strong>{toDateString(publishedDate)}</strong>;
    return <></>;
  };

  return (
    <div className={rootClassName}>
      <Link href={`${redirectUrl || '/articles'}/${id}`}>
        <a>
          <div className={classes.body}>
            <div className={classes['text-content']}>
              <h2 className={classes.title} dangerouslySetInnerHTML={{ __html: title }} />
              <p className={classes.content} ref={contentRef} />
            </div>
            {imgUrl && <ArticleImg imgUrl={imgUrl} />}
          </div>
          <div className={classes.footer}>
            <div className={classes.stats}>
              <span>{renderDate()}</span>
              {viewCount > 0 && (
                <>
                  <Divider type='vertical' />
                  &nbsp; &nbsp;
                  <span>
                    <strong>{formatToKMB(viewCount)}</strong> marta o`qilgan
                  </span>
                </>
              )}
              {props.showLikeCount && likeCount > 0 && (
                <>
                  &nbsp; &nbsp;
                  <span>
                    <strong>{formatToKMB(likeCount)}</strong> marta layk bosilgan
                  </span>
                </>
              )}
            </div>
            <div style={{ textAlign: 'end' }}>
              {labels?.map((label) => (
                <span
                  key={label.id}
                  style={{ marginLeft: '.3rem', marginBottom: '0.3rem', display: 'inline-block' }}
                >
                  <Label>{label.name}</Label>
                </span>
              ))}
              {props.showStatus && status && <Status className='ms-1' status={status} />}
            </div>
          </div>
          {author && (
            <div className={classes.footer} style={{ marginTop: '.5rem' }}>
              <Author {...addAmazonUri(author)} />
            </div>
          )}
        </a>
      </Link>
    </div>
  );
};
