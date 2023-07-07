import { useUrlParams } from 'hooks';
import { FC } from 'react';
import { ITutorialArticle } from 'types';

import { Article } from '../Article/Article';
import classes from './Section.module.scss';
import { ISectionProps } from './Section.types';
import { SectionHeader } from './SectionHeader';

export const Section: FC<ISectionProps> = ({ section }) => {
  const { setParams } = useUrlParams();

  const selectArticle = (article: ITutorialArticle): void => {
    setParams({ sectionId: section.id, articleId: article.id, alert: '' });
  };

  return (
    <div>
      <SectionHeader section={section} />
      <ul className={classes.articles}>
        {section.articles.map((article) => (
          <li key={article.id}>
            <Article
              article={article}
              section={section}
              onClick={(): void => selectArticle(article)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
