import { Divider } from 'components';
import { useClickOutside } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch } from 'store';
import { useLazyGetCommentsByArticleIdQuery } from 'store/apis';
import { closeCommentsSidebar } from 'store/states';
import { getClassName } from 'utils';

import classes from './Comments.module.scss';
import { ICommentsProps } from './Comments.types';
import { Comment, Form } from './components';

export const Comments: FC<ICommentsProps> = ({ isOpen }) => {
  const rootClassName = getClassName(classes['comments'], isOpen && classes['comments--open']);
  const [fetchComments, fetchCommentsRes] = useLazyGetCommentsByArticleIdQuery();
  const dispatch = useAppDispatch();
  const [rootRef] = useClickOutside(() => {
    dispatch(closeCommentsSidebar());
  }, 'comment-icon');
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    id && fetchComments(+id);
  }, [id]);

  const comments = useMemo(() => {
    const { data: comments, isLoading, isFetching } = fetchCommentsRes;
    if (isLoading || isFetching) return 'Loading...';
    if (!comments) return <></>;
    if (comments.length === 0) return <p className='text-center'>Izohlar mavjud emas</p>;

    const clone = [...comments];
    return clone.reverse().map((comment) => <Comment {...comment} key={comment.id} />);
  }, [fetchCommentsRes]);

  return (
    <div ref={rootRef} className={rootClassName}>
      <div className={classes['comments-list']}>
        <h3 className='m-1'>Izohlar</h3>
        <Divider />
        {comments}
      </div>
      <div className={classes.form}>
        <Form />
      </div>
    </div>
  );
};
