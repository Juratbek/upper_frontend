import { Editor } from 'components';
import { FC, useEffect } from 'react';
import { useIncrementViewCountMutation } from 'store/apis';
import { IArticle } from 'types';

export const ReadArticle: FC<IArticle> = (article) => {
  const [incrementViewCountRequest] = useIncrementViewCountMutation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (article.token) {
        const { id, token } = article;
        incrementViewCountRequest({ id, token });
      }
    }, 15 * 1000);
    return () => clearTimeout(timeout);
  }, [article?.id]);

  return (
    <div className='px-2'>
      <Editor content={{ blocks: article.blocks }} isEditable={false} />
    </div>
  );
};
