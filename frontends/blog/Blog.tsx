import { Blog } from 'components';
import { Alert, Button, Head, Modal, TabBody, TabsHeader } from 'components/lib';
import { useAuth, useModal } from 'hooks';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  useCheckSubscriptionQuery,
  useSubscribeMutation,
  useUnSubscribeMutation,
} from 'store/apis';
import { openAuthModal } from 'store/states';
import { addAmazonUri, convertBlogToHeadProp, get, log } from 'utils';
import { BLOG_TAB_MENUS, BLOG_TABS, TELEGRAM_BOT } from 'variables';

import styles from './Blog.module.scss';
import { IBlogPageProps } from './Blog.types';

export const BlogPage: FC<IBlogPageProps> = ({ blog, error, fullUrl }) => {
  const {
    query: { id },
  } = useRouter();
  const [isUnsubscribeModalOpen, , { open: openUnsubscribeModal, close: closeUnsubscribeModal }] =
    useModal();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [subscribeBlog, subscribeBlogRes] = useSubscribeMutation();
  const [unsubscribeBlog, unsubscribeRes] = useUnSubscribeMutation();
  const checkSubscriptionRes = useCheckSubscriptionQuery(id, { skip: !isAuthenticated });
  const { data: isSubscribed } = checkSubscriptionRes;

  const subscribe = (): void => {
    if (!id) return;
    if (isAuthenticated) subscribeBlog(+id);
    else dispatch(openAuthModal("Obuna bo'lish uchun shaxsiy profilingizga kiring"));
  };

  const unsubscribe = (): void => {
    id && unsubscribeBlog(+id);
    closeUnsubscribeModal();
  };

  const alert = useMemo(() => {
    if (checkSubscriptionRes.error)
      return `Obunani tekshirishda xatolik yuz berdi ${log(checkSubscriptionRes.error)}`;
    if (subscribeBlogRes.error)
      return `Obuna bo'lishda xatolik yuzberdi ${log(subscribeBlogRes.error)}`;
    if (unsubscribeRes.error)
      return `Obunani bekor qilishda xatolik yuzberdi ${log(unsubscribeRes.error)}`;
  }, [checkSubscriptionRes.error, unsubscribeRes.error, subscribeBlogRes.error]);

  const subscriptionButton = useMemo(() => {
    if (checkSubscriptionRes.isLoading) return null;
    if (isSubscribed) return <Button onClick={openUnsubscribeModal}>Obuna bo&apos;lingan</Button>;
    return (
      <Button onClick={subscribe} loading={subscribeBlogRes.isLoading}>
        Obuna bo&apos;lish
      </Button>
    );
  }, [
    checkSubscriptionRes.isLoading,
    isSubscribed,
    openUnsubscribeModal,
    subscribe,
    subscribeBlogRes,
  ]);

  if (!blog) return <h3>{get(error, 'data.message')}</h3>;

  return (
    <div className='container'>
      <Alert color='red' show={Boolean(alert)} className='mt-2'>
        <p className='mb-1'>
          {alert}
          <br />
          <a href={TELEGRAM_BOT.link} className='link'>
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
          <Button onClick={closeUnsubscribeModal} className='me-2'>
            Yopish
          </Button>
          <Button onClick={unsubscribe} loading={unsubscribeRes.isLoading}>
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
            {!blog.isCurrentBlog && subscriptionButton}
          </>
        )}
      </div>
      <TabsHeader tabs={BLOG_TAB_MENUS} />
      <TabBody tabs={BLOG_TABS} />
    </div>
  );
};
