import { BlogPage, IBlogPageProps } from 'frontends/blog';
import { GetServerSideProps, NextPage } from 'next';
import { apiClient } from 'store/config';
import { IResponseError } from 'types';
import { get } from 'utils';
import { ApiError } from 'utils/error';

const BlogNextPage: NextPage<IBlogPageProps> = (props: IBlogPageProps) => {
  return <BlogPage {...props} />;
};

export const getServerSideProps: GetServerSideProps<IBlogPageProps> = async ({ req, query }) => {
  const host = req.headers.host ?? '';
  const url = req.url;

  const blogId = get<number>(query, 'id');
  let blog: IBlogPageProps['blog'] = null;
  let error: IBlogPageProps['error'] = null;
  try {
    blog = await apiClient.get(`blog/open/${blogId}`);
  } catch (e) {
    const apiError = e as ApiError;
    error = {
      status: apiError.status ?? null,
      data: {
        code: apiError.status ?? null,
        message: apiError.message,
      },
    } satisfies Partial<IResponseError>;
  }
  return {
    props: {
      blog: blog ?? null,
      error: (error as IResponseError) ?? null,
      fullUrl: `https://${host}${url}`,
    },
  };
};

export default BlogNextPage;
