import { Alert, Blog, Button, Head, Modal, TabBody, TabsHeader } from 'components';
import { useDevice, useModal } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
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
  const [isUnsubscribeModalOpen, , { open: openUnsubscribeModal, close: closeUnsubscribeModal }] =
    useModal();
  const { isMobile } = useDevice();
  const [subscribeBlog, subscribeBlogRes] = useSubscribeMutation();
  const [unsubscribeBlog, unsubscribeRes] = useUnSubscribeMutation();
  const checkSubscriptionRes = useCheckSubscriptionQuery(id);
  const { data: isSubscribed } = checkSubscriptionRes;

  const subscribe = (): void => {
    id && subscribeBlog(+id);
  };

  const unsubscribe = (): void => {
    id && unsubscribeBlog(+id);
  };

  const alert = useMemo(() => {
    if (checkSubscriptionRes.error)
      return `Obunani tekshirishda xatolik yuz berdi ${error?.data.message}`;
    if (subscribeBlogRes.error) return `Obuna bo'lishda xatolik yuzberdi ${error?.data.message}`;
  }, [checkSubscriptionRes.error, unsubscribeRes.error, subscribeBlogRes.error]);

  const subscriptionButton = useMemo(() => {
    if (checkSubscriptionRes.isLoading) return null;
    if (isSubscribed)
      return (
        <Button color='outline-dark' onClick={openUnsubscribeModal}>
          Obuna bo&apos;lingan
        </Button>
      );
    return <Button onClick={subscribe}>Obuna bo&apos;lish</Button>;
  }, [checkSubscriptionRes.isLoading, isSubscribed, openUnsubscribeModal, subscribe]);

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
        isOpen={isUnsubscribeModalOpen}
        close={closeUnsubscribeModal}
        bodyClassName='text-center'
      >
        <strong>{blog.name}</strong> obunasini bekor qilmoqchimisiz
        <div className={['mt-2', styles.buttonsContainer].join(' ')}>
          <Button onClick={closeUnsubscribeModal} color='outline-dark' className='me-2'>
            Yopish
          </Button>
          <Button onClick={unsubscribe} loading={unsubscribeRes.isLoading} color='outline-dark'>
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
                {subscriptionButton}
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
