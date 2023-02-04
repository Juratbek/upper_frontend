import { ApiErrorBoundary } from 'components';
import { useUrlParams } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useAppDispatch } from 'store';
import { useLazyGetPublishedTutorialByIdQuery } from 'store/apis';
import { setPublishedTutorialAuthor } from 'store/states';
import { ITutorialArticle } from 'types';

import classes from './TutorialSidebar.module.scss';

export const TutorialSidebar: FC = () => {
  const {
    query: { id },
  } = useRouter();
  const dispatch = useAppDispatch();
  const { setParam } = useUrlParams();
  const [fetchPublishedTutorial, fetchPublishedTutorialRes] =
    useLazyGetPublishedTutorialByIdQuery();
  const { data: tutorial } = fetchPublishedTutorialRes;
  const { sections, name } = tutorial || { sections: [], name: '' };

  const getPublishedTutorial = async (): Promise<void> => {
    if (!id) return;
    const tutorial = await fetchPublishedTutorial(+id).unwrap();
    const firstArticle = tutorial.sections[0].articles[0];
    setParam('articleId', firstArticle.articleId);
    dispatch(setPublishedTutorialAuthor(tutorial.author));
  };

  const selectArticle = (article: ITutorialArticle): void => {
    setParam('articleId', article.articleId);
  };

  useEffect(() => {
    getPublishedTutorial();
  }, [id]);

  return (
    <div className={classes.root}>
      <ApiErrorBoundary res={fetchPublishedTutorialRes}>
        <h2 className={classes.header}>{name}</h2>
        {sections.map((section) => (
          <div key={section.id} className={classes['section-container']}>
            <h3 className={classes.section}>{section.name}</h3>
            <div>
              {section.articles.map((article) => (
                <p
                  className={classes.article}
                  key={article.id}
                  onClick={(): void => selectArticle(article)}
                >
                  {article.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </ApiErrorBoundary>
    </div>
  );
};
