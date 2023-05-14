import { getCookie } from 'cookies-next';
import { BlogPage, IBlogPageProps } from 'frontends/blog';
import { GetServerSideProps, NextPage } from 'next';
import { wrapper } from 'store';
import { blogApi } from 'store/apis';
import { IResponseError } from 'types';
import { get } from 'utils';

const BlogNextPage: NextPage<IBlogPageProps> = (props: IBlogPageProps) => {
  return <BlogPage {...props} />;
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

export default BlogNextPage;
