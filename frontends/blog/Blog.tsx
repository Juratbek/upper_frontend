import { Blog, Button, Head, Modal, TabBody, TabsHeader } from 'components';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useFollowBlogMutation, useUnfollowBlogMutation } from 'store/apis';
import { IBlog, IResponseError } from 'types';
import { addAmazonUri, convertBlogToHeadProp, get } from 'utils';
import { BLOG_TAB_MENUS, BLOG_TABS } from 'variables';

import styles from './Blog.module.scss';

export interface IBlogPageProps {
  blog?: IBlog | null;
  error?: IResponseError;
  fullUrl: string;
}

export const BlogPage: FC<IBlogPageProps> = ({ blog, error, fullUrl }: IBlogPageProps) => {
  const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(blog?.isFollowed || false);
  const {
    query: { id },
  } = useRouter();
  const [followBlog, followBlogRes] = useFollowBlogMutation();
  const [unfollowBlog, unfollowBlogRes] = useUnfollowBlogMutation();

  const follow = (): void => {
    id && followBlog(+id).then(() => setIsFollowed(true));
  };

  const unfollow = (): void => {
    id &&
      unfollowBlog(+id).then(() => {
        setIsFollowed(false);
        setIsUnfollowModalOpen(false);
      });
  };

  const toggleUnfollowModal = (): void => {
    setIsUnfollowModalOpen((prev) => !prev);
  };

  if (!blog) return <h3>{get(error, 'data.message')}</h3>;

  return (
    <div className='container'>
      <Head {...convertBlogToHeadProp(blog)} url={fullUrl} />
      <Modal
        size='small'
        isOpen={isUnfollowModalOpen}
        close={toggleUnfollowModal}
        bodyClassName='text-center'
      >
        <strong>{blog.name}</strong> obunasini bekor qilmoqchimisiz
        <div className={['mt-2', styles.buttonsContainer].join(' ')}>
          <Button onClick={toggleUnfollowModal} color='outline-dark' className='me-2'>
            Yopish
          </Button>
          <Button onClick={unfollow} loading={unfollowBlogRes.isLoading} color='outline-dark'>
            Obunani bekor qilish
          </Button>
        </div>
      </Modal>

      <div className='d-flex align-items-center justify-content-between p-2 flex-wrap'>
        {blog && (
          <>
            <Blog {...addAmazonUri(blog)} avaratSize='extra-large' />
            {!blog.isCurrentBlog &&
              (isFollowed ? (
                <Button color='outline-dark' onClick={toggleUnfollowModal}>
                  Obuna bo`lingan
                </Button>
              ) : (
                <Button onClick={follow} loading={followBlogRes.isLoading}>
                  Obuna bo`lish
                </Button>
              ))}
          </>
        )}
      </div>
      <TabsHeader tabs={BLOG_TAB_MENUS} />
      <TabBody tabs={BLOG_TABS} />
    </div>
  );
};
