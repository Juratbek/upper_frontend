import { Article } from 'components';
import { FC } from 'react';
import { IArticle, IBlog, ILabel } from 'types';

const author: IBlog = {
  id: 1,
  name: 'Samandar',
  imgUrl: 'awda',
};

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

const articles: IArticle[] = [
  {
    id: 1,
    title: 'Article title',
    author,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
    labels,
    publishedDate: new Date(),
    updatedDate: new Date(),
    viewCount: 12000,
  },
  {
    id: 1,
    title: 'Article title',
    author,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
    labels,
    publishedDate: new Date(),
    updatedDate: new Date(),
    viewCount: 12000,
  },
  {
    id: 1,
    title: 'Article title',
    author,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
    labels,
    publishedDate: new Date(),
    updatedDate: new Date(),
    viewCount: 12000,
  },
  {
    id: 1,
    title: 'Article title',
    author,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
    labels,
    publishedDate: new Date(),
    updatedDate: new Date(),
    viewCount: 12000,
  },
];

export const ArticlesTab: FC = () => {
  return (
    <div>
      {articles.map((article) => (
        <Article key={article.id} {...article} />
      ))}
    </div>
  );
};
