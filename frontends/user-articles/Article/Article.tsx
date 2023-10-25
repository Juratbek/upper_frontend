import { Link } from 'components/lib';
import { FC } from 'react';

import { IArticleProps } from './Article.types';

export const Article: FC<IArticleProps> = ({ article }) => {
  const { title, id } = article;

  return (
    <Link href={`/user/articles/${id}`}>
      <h2 dangerouslySetInnerHTML={{ __html: title || 'Sarlavha kiritilmagan' }} />
    </Link>
  );
};
