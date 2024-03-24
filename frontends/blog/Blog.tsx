import { Blog } from 'components';
import { Head } from 'components/lib';
import { SubscriptionButton, UnsubscribeModal } from 'components/molecules';
import { GenericWrapper } from 'components/wrappers';
import { FC } from 'react';
import { addBlogAmazonUrl, convertBlogToHeadProp, get } from 'utils';

import styles from './Blog.module.scss';
import { IBlogPageProps } from './Blog.types';

export const BlogPage: FC<IBlogPageProps> = ({ blog, error, fullUrl }) => {
  if (!blog) return <h3 className='text-center flex-1'>{get(error, 'data.message')}</h3>;

  return (
    <GenericWrapper>
      <Head {...convertBlogToHeadProp(addBlogAmazonUrl(blog))} url={fullUrl} />
      <UnsubscribeModal />
      <div
        className={`d-flex align-items-center justify-content-between p-2 flex-wrap ${styles.blogContainer}`}
      >
        {blog && (
          <>
            <Blog {...blog} avatarSize='extra-large' className='mb-2 flex-1' />
            <SubscriptionButton blogId={blog.id} />
          </>
        )}
      </div>
    </GenericWrapper>
  );
};
