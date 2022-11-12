import { Blog, Button, Head, Modal, TabBody, TabsHeader } from 'components';
import { getCookie } from 'cookies-next';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { wrapper } from 'store';
import { blogApi, useFollowBlogMutation, useUnfollowBlogMutation } from 'store/apis';
import { IBlog, IResponseError } from 'types';
import { addAmazonUri, convertBlogToHeadProp, get } from 'utils';
import { BLOG_TAB_MENUS, BLOG_TABS } from 'variables';

interface IBlogPageProps {
  blog?: IBlog | null;
  error?: IResponseError;
  fullUrl: string;
}

const BlogPage: NextPage<IBlogPageProps> = ({ blog, error, fullUrl }: IBlogPageProps) => {
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
        <div className='mt-2'>
          <Button onClick={toggleUnfollowModal} color='outline-dark' className='me-2'>
            Yopish
          </Button>
          <Button onClick={unfollow} loading={unfollowBlogRes.isLoading} color='outline-dark'>
            Obunani bekor qilish
          </Button>
        </div>
      </Modal>

      <div className='d-flex align-items-center justify-content-between p-2'>
        {blog && (
          <>
            <Blog {...addAmazonUri(blog)} avaratSize='extra-large' />
            {isFollowed ? (
              <Button color='outline-dark' onClick={toggleUnfollowModal}>
                Obuna bo`lingan
              </Button>
            ) : (
              <Button onClick={follow} loading={followBlogRes.isLoading}>
                Obuna bo`lish
              </Button>
            )}
          </>
        )}
      </div>
      <TabsHeader tabs={BLOG_TAB_MENUS} />
      <TabBody tabs={BLOG_TABS} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<IBlogPageProps> = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      const host = req.headers.host || '';
      const url = req.url;
      const token = (getCookie('token', { req, res }) || null) as string | null;

      const blogId = get<number>(query, 'id');
      const { data: blog = null, error = {} } = await store.dispatch(
        blogApi.endpoints.getById.initiate({ id: blogId, token }, { forceRefetch: true }),
      );
      return {
        props: {
          blog: blog,
          error: error as IResponseError,
          fullUrl: `https://${host}${url}`,
        },
      };
    },
);

export default BlogPage;
