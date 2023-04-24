import { Alert, Blog, Button, Head, Modal, TabBody, TabsHeader } from 'components';
import { useDevice } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
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
  const [unSubscribeBlog, unSubscribeBlogRes] = useUnSubscribeMutation();
  const { data: isSubscribed, isError: checkIsSubscriptionErr } = useCheckSubscriptionQuery(id);
  const [isFollowed, setIsFollowed] = useState<boolean>(isSubscribed);
  const [alert, setAlert] = useState({
    show: subscribeBlogRes.isError || unSubscribeBlogRes.isError,
    message: '',
  });

  useEffect(() => {
    if (subscribeBlogRes.isError || unSubscribeBlogRes.isError) {
      setAlert({ ...alert, show: true });
    }
    if (checkIsSubscriptionErr) {
      setAlert({ ...alert, show: true });
      setIsFollowed(false);
    }
  }, [subscribeBlogRes.isError, unSubscribeBlogRes.isError, checkIsSubscriptionErr]);

  const follow = (): void => {
    id &&
      subscribeBlog(+id)
        .unwrap()
        .then(() => {
          setIsFollowed(true);
        });
  };

  const unfollow = (): void => {
    id &&
      unSubscribeBlog(+id)
        .unwrap()
        .then(() => {
          setIsFollowed(false);
          setIsUnfollowModalOpen(false);
        })
        .catch(() => {
          setIsUnfollowModalOpen(false);
        });
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

  const handleCloseAlert = () => setAlert({ ...alert, show: false });

  if (!blog) return <h3>{get(error, 'data.message')}</h3>;

  return (
    <div className='container'>
      {alert.show && (
        <Alert onClose={handleCloseAlert} color='red'>
          <p className='mb-1'>
            {`${
              checkIsSubscriptionErr
                ? `Obunani tekshirishda`
                : subscribeBlogRes.isError
                ? `Obuna bo'lishda`
                : `Obunani bekor qilishda`
            }`}{' '}
            xatolik yuz berdi.{' '}
            <a href={TELEGRAM_BOT.link}>{TELEGRAM_BOT.link} botiga habar bering.</a>
          </p>
        </Alert>
      )}
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
          <Button onClick={unfollow} loading={unSubscribeBlogRes.isLoading} color='outline-dark'>
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
