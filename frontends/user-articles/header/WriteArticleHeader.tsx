import { Button } from 'components/lib';
import { Logo } from 'components/molecules';
import { Profile } from 'components/organisms';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { usePublish, useUpdateArticleBlocks } from 'store/clients/article';
import { getEditor } from 'store/states';
import { removeAmazonUriFromImgBlocks } from 'utils';

import classes from './WriteArticleHeader.module.scss';

export const WriteArticleHeader: FC = () => {
  const { query } = useRouter();
  const id = +(query?.id as string);
  const isIdPresent = !isNaN(id);
  const { mutate: updateArticle } = useUpdateArticleBlocks(id, { enabled: isIdPresent });
  const { mutate: publish } = usePublish(id);
  const editorInstance = useSelector(getEditor);

  const publishHandler = useCallback(async () => {
    if (!editorInstance) return;
    const editorData = await editorInstance.save();
    const [blocks] = await removeAmazonUriFromImgBlocks(editorData.blocks);
    await updateArticle({ id, blocks });
    publish();
  }, [updateArticle, editorInstance]);

  return (
    <header className={`${classes.container} container`}>
      <Logo />
      <div className={classes['right-block']}>
        <Button onClick={publishHandler}>Nashr qilish</Button>
        <Profile />
      </div>
    </header>
  );
};
