import { Article } from 'components';
import { FC } from 'react';

import { articles } from '../PublishedArticlesTab/PublishedArticlesTab';

export const DraftArticlesTab: FC = () => {
  return (
    <div className='tab'>
      {articles.map((article) => (
        <Article className='mx-2 mb-3' key={article.id} {...article} />
      ))}
    </div>
  );
};
