import Image from 'next/image';
import { FC } from 'react';

import { Label } from '../Label/Label';
import classes from './Article.module.css';
import { IArticleProps } from './Article.types';

export const Article: FC<IArticleProps> = ({ title, content, author = {}, labels = [] }) => {
  return (
    <div className={classes.article}>
      <div className={classes.body}>
        <div className={classes['text-content']}>
          <h2 className={classes.title}>{title}</h2>
          <p className={classes.content}>{content}</p>
        </div>
        <Image
          className={classes['article-img']}
          src='/vercel.svg'
          alt='Vercel Logo'
          width={170}
          height={100}
        />
      </div>
      <div className={classes.footer}>
        <div className={classes.author}>
          <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          <p>{author.name}</p>
        </div>
        <div className={classes.labels}>
          {labels.map((label) => (
            <Label key={label.id} {...label} />
          ))}
        </div>
      </div>
    </div>
  );
};
