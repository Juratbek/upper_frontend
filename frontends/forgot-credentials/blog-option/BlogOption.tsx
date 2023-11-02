import { Avatar } from 'components/lib';
import { FC } from 'react';
import { IBlogSmall } from 'types';

export const BlogOption: FC<IBlogSmall> = (blog) => {
  return (
    <div className='d-flex'>
      <Avatar size='medium' imgUrl={blog.imgUrl} />
      <div className='ms-1 d-flex align-items-center'>
        <h4 className='m-0'>{blog.name}</h4>
      </div>
    </div>
  );
};
