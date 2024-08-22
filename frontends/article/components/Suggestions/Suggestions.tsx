import { PublishedArticle } from 'components/molecules';
import { FC } from 'react';
import { useBlogPublishedArticles } from 'store/clients/published-article';
import { IBlog } from 'types';

import cls from './Suggestions.module.scss';

export const Suggestions: FC<{ blogId: IBlog['id'] }> = ({ blogId }) => {
  const { list: articles, isSuccess } = useBlogPublishedArticles(blogId);

  if (!isSuccess) return null;

  return (
    <div className={cls.container}>
      {articles.map((article) => (
        <PublishedArticle key={article.id} article={article} />
      ))}
    </div>
  );
};
