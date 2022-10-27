import { Blog, Button, TabBody, TabsHeader } from 'components';
import { getCookie } from 'cookies-next';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { wrapper } from 'store';
import { blogApi, useFollowBlogMutation, useUnfollowBlogMutation } from 'store/apis';
import { IBlog, IResponseError } from 'types';
import { get } from 'utils';
import { BLOG_TAB_MENUS, BLOG_TABS } from 'variables';

interface IBlogPageProps {
  blog?: IBlog | null;
  error?: IResponseError;
  fullUrl: string;
}

const BlogPage: NextPage<IBlogPageProps> = ({ blog, error, fullUrl }: IBlogPageProps) => {
  const {
    query: { id },
  } = useRouter();
  const [followBlog] = useFollowBlogMutation();
  const [unfollowBlog] = useUnfollowBlogMutation();

  const follow = (): void => {
    id && followBlog(+id);
  };

  const unfollow = (): void => {
    id && unfollowBlog(+id);
  };

  if (!blog) return <h3>{get(error, 'data.message')}</h3>;

  return (
    <div className='container'>
      <Head>
        <meta property='og:site_name' content='UPPER' />
        <meta property='og:title' content={blog.name} />
        <meta property='og:image' content={blog.imgUrl} />
        <meta property='og:description' content={blog.bio} />
        <meta property='og:type' content='blog' />
        <meta property='og:locale' content='uz' />
        <meta property='og:url' content={fullUrl} />
        <meta name='description' content={blog.bio} />
        <title>{blog.name}</title>
      </Head>
      <div className='d-flex align-items-center justify-content-between p-2'>
        {blog && (
          <>
            <Blog {...blog} avaratSize='extra-large' />
            {blog.isFollowed ? (
              <Button color='outline-dark' onClick={unfollow}>
                Kuzatishni bekor qilish
              </Button>
            ) : (
              <Button onClick={follow}>Kuzatib borish</Button>
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
        blogApi.endpoints.getById.initiate({ id: blogId, token }),
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
