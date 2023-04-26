import { Alert, Blog, Button, Head, Modal, TabBody, TabsHeader } from 'components';
import { useDevice } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  useCheckSubscriptionQuery,
  useSubscribeMutation,
  useUnSubscribeMutation,
} from 'store/apis';
import { addAmazonUri, convertBlogToHeadProp, get } from 'utils';
import { BLOG_TAB_MENUS, BLOG_TABS, ICONS, TELEGRAM_BOT } from 'variables';

import styles from './Blog.module.scss';
import { IBlogPageProps } from './Blog.types';

const HeartIcon = ICONS.heart;

export const BlogPage: FC<IBlogPageProps> = ({ blog, error, fullUrl }) => {
  const {
    query: { id },
  } = useRouter();
  const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState<boolean>(false);
  const { isMobile } = useDevice();
  const [subscribeBlog, subscribeBlogRes] = useSubscribeMutation();
  const [unsubscribeBlog, unsubscribeRes] = useUnSubscribeMutation();
  const checkSubscriptionRes = useCheckSubscriptionQuery(id);
  const { data: isSubscribed } = checkSubscriptionRes;
  const [isFollowed, setIsFollowed] = useState<boolean>(isSubscribed);
  const alert = useMemo(() => {
    if (checkSubscriptionRes.error) return `Obunani tekshirishda xatolik yuz berdi ${error}`;
  }, [checkSubscriptionRes.error, unsubscribeRes]);

  const follow = (): void => {
    id &&
      subscribeBlog(+id)
        .unwrap()
        .then(() => {
          setIsFollowed(true);
        });
  };

  const unfollow = (): void => {
    id && unsubscribeBlog(+id);
  };

  const toggleUnfollowModal = (): void => {
    setIsUnfollowModalOpen((prev) => !prev);
  };

  const closeModal = (): void => {
    setIsUnfollowModalOpen(false);
  };

  useEffect(() => {
    setIsFollowed(isSubscribed);
  }, [isSubscribed, blog]);

  // const handleCloseAlert = (): void => setAlert(undefined);

  if (!blog) return <h3>{get(error, 'data.message')}</h3>;

  return (
    <div className='container'>
      <Alert color='red' show={Boolean(alert)}>
        <p className='mb-1'>
          {alert}
          <a href={TELEGRAM_BOT.link}>
            Iltimos bu haqda {TELEGRAM_BOT.link} telegram botiga habar bering.
          </a>
        </p>
      </Alert>
      <Head {...convertBlogToHeadProp(addAmazonUri(blog))} url={fullUrl} />
      <Modal
        size='small'
        isOpen={isUnfollowModalOpen}
        close={closeModal}
        bodyClassName='text-center'
      >
        <strong>{blog.name}</strong> obunasini bekor qilmoqchimisiz
        <div className={['mt-2', styles.buttonsContainer].join(' ')}>
          <Button onClick={toggleUnfollowModal} color='outline-dark' className='me-2'>
            Yopish
          </Button>
          <Button onClick={unfollow} loading={unsubscribeRes.isLoading} color='outline-dark'>
            Obunani bekor qilish
          </Button>
        </div>
      </Modal>

      <div
        className={`d-flex align-items-center justify-content-between p-2 flex-wrap ${styles.blogContainer}`}
      >
        {blog && (
          <>
            <Blog {...addAmazonUri(blog)} avatarSize='extra-large' className='mb-2 flex-1' />
            {!blog.isCurrentBlog && (
              <>
                {isFollowed ? (
                  <Button color='outline-dark' onClick={toggleUnfollowModal}>
                    Obuna bo&apos;lingan
                  </Button>
                ) : (
                  <Button onClick={follow} loading={subscribeBlogRes.isLoading}>
                    Obuna bo&apos;lish
                  </Button>
                )}
                {Boolean(blog.cardNumber) && (
                  <Link href={`/blogs/${id}/support`}>
                    <a className='link d-flex mt-xs-2 w-100'>
                      {isMobile ? (
                        <Button className='w-100' color='outline-dark'>
                          <span className='sponsor-icon'>
                            <HeartIcon />
                          </span>
                          Blog faoliyatiga o&apos;z hissangizni qo&apos;shing
                        </Button>
                      ) : (
                        <>
                          <span className='sponsor-icon'>
                            <HeartIcon />
                          </span>
                          <h4 className='m-0'>
                            Blog faoliyatiga o&apos;z hissangizni qo&apos;shing
                          </h4>
                        </>
                      )}
                    </a>
                  </Link>
                )}
              </>
            )}
          </>
        )}
      </div>
      <TabsHeader tabs={BLOG_TAB_MENUS} />
      <TabBody tabs={BLOG_TABS} />
    </div>
  );
};
