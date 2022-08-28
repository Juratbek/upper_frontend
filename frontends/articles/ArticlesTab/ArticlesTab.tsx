import { Article } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { IArticleResult, ILabel } from 'types';
import { TAB_IDS } from 'variables';
import { ARTICLE_STATUSES } from 'variables/article';

const labels: ILabel[] = [
  {
    name: 'JavaScript',
    id: 1,
  },
  {
    name: 'TypeScript',
    id: 2,
  },
];

export const ARTICLES: IArticleResult[] = [
  {
    id: 1,
    title: 'Article title',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    labels,
    publishedDate: new Date(),
    updatedDate: new Date(),
    viewCount: 12000,
    status: ARTICLE_STATUSES.PUBLISHED,
  },
  {
    id: 2,
    title: 'Article title',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
    labels,
    publishedDate: new Date(),
    updatedDate: new Date(),
    viewCount: 12000,
    status: ARTICLE_STATUSES.UNPUBLISHED,
  },
  {
    id: 3,
    title: 'Article title',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
    labels,
    publishedDate: new Date(),
    updatedDate: new Date(),
    viewCount: 12000,
    status: ARTICLE_STATUSES.DELETED,
  },
  {
    id: 4,
    title: 'Article title',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
    labels,
    publishedDate: new Date(),
    updatedDate: new Date(),
    viewCount: 12000,
    status: ARTICLE_STATUSES.DRAFT,
  },
  {
    id: 4,
    title: 'Article title',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
    labels,
    publishedDate: new Date(),
    updatedDate: new Date(),
    viewCount: 12000,
    status: ARTICLE_STATUSES.SAVED,
  },
];

export const ArticlesTab: FC = () => {
  const [articles, setArticles] = useState<IArticleResult[]>([]);
  const { query } = useRouter();

  useEffect(() => {
    if (query.tab) {
      const t = ARTICLES.filter((article) => article.status.toLowerCase() === query.tab);
      setArticles(t);
    }
  }, [query.tab]);

  return (
    <div className='tab'>
      {articles.map((article) => {
        const url = query.tab === TAB_IDS.saved ? '/articles' : '/user/articles';
        return (
          <Article redirectUrl={url} className='px-2 py-2' key={article.id} article={article} />
        );
      })}
    </div>
  );
};
