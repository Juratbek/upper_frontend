import { ApiErrorBoundary, Blog } from 'components';
import { Head } from 'components/lib';
import { PublishedArticle, SubscriptionButton, UnsubscribeModal } from 'components/molecules';
import { GenericWrapper } from 'components/wrappers';
import { FC } from 'react';
import { useBlogPublishedArticles } from 'store/clients/published-article';
import { IBlog } from 'types';
import { addAmazonUri, convertBlogToHeadProp, get } from 'utils';
import { addAmazonBucketUrl } from 'utils/published-article';

import styles from './Blog.module.scss';
import { IBlogPageProps } from './Blog.types';

export const BlogPage: FC<IBlogPageProps> = ({ blog, error, fullUrl }) => {
  if (!blog) return <h3 className='text-center flex-1'>{get(error, 'data.message')}</h3>;

  return (
    <GenericWrapper>
      <Head {...convertBlogToHeadProp(addAmazonUri(blog))} url={fullUrl} />
      <UnsubscribeModal />
      <div
        className={`d-flex align-items-center justify-content-between p-2 flex-wrap ${styles.blogContainer}`}
      >
        {blog && (
          <>
            <Blog {...addAmazonUri(blog)} avatarSize='extra-large' className='mb-2 flex-1' />
            <SubscriptionButton blogId={blog.id} />
          </>
        )}
      </div>
      <PublishedArticles id={blog.id} />
    </GenericWrapper>
  );
};

const PublishedArticles: FC<{ id: IBlog['id'] }> = ({ id }) => {
  const articlesRes = useBlogPublishedArticles(id);
  const { data } = articlesRes;

  return (
    <ApiErrorBoundary res={articlesRes}>
      {data
        ?.map(addAmazonBucketUrl)
        .map((article) => <PublishedArticle key={article.id} article={article} />)}
    </ApiErrorBoundary>
  );
};
