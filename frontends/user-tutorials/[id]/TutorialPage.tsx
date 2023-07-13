import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

import { Article } from './compoentns/Article';
import { AssignArticle } from './compoentns/AssignArticle';

export const TutorialPage: FC = () => {
  const {
    query: { itemId, id, articleId },
  } = useRouter();

  const defaultUI = useMemo(() => <div>this is default ui</div>, []);

  const content = useMemo(() => {
    // if item is not selected return default UI
    if (!itemId) return defaultUI;

    // if article is fetched return the editor
    if (articleId) return <Article articleId={+articleId} />;

    // if section item is not assigned show assign an article UI
    if (id && !articleId && itemId)
      return <AssignArticle tutorialId={+id} itemId={itemId as string} />;

    return null;
  }, [articleId, itemId, defaultUI, id]);

  return <div className='container'>{content}</div>;
};
