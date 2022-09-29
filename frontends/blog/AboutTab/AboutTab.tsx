import { ApiErrorBoundary, Divider } from 'components';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { useLazyGetBlogByIdQuery } from 'store/apis';
import { toDateString } from 'utils';
import { BLOG_TAB_IDS, ICONS } from 'variables';

import classes from '../Blog.module.scss';

export const AboutTab: FC = () => {
  const {
    query: { id, tab },
  } = useRouter();
  const [fetchBlogById, fetchBlogByIdRes] = useLazyGetBlogByIdQuery();

  useEffect(() => {
    if (id && tab === BLOG_TAB_IDS.about) {
      fetchBlogById(+id);
    }
  }, [id]);

  const details = useMemo(() => {
    const { data: blog } = fetchBlogByIdRes;
    return (
      <>
        <div className='bio'>
          {blog?.bio && (
            <>
              <h4 className='mb-1'>Bio</h4>
              <p>{blog?.bio}</p>
            </>
          )}
        </div>
        <Divider />
        {blog?.links && (
          <div className={classes['social-media']}>
            {blog.links.map((link) => {
              const Icon = ICONS[link.type];
              return (
                <div className={classes['social-media-link']} key={link.type}>
                  <a href={link.link} target='_blank' rel='noreferrer'>
                    <Icon />
                  </a>
                </div>
              );
            })}
          </div>
        )}
        <p>{toDateString(blog?.createdDate, { month: 'long' })}dan beri UPPER azosi</p>
      </>
    );
  }, [fetchBlogByIdRes.data]);

  return (
    <ApiErrorBoundary res={fetchBlogByIdRes} className='tab px-2'>
      {details}
    </ApiErrorBoundary>
  );
};
