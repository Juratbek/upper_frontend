import { Blog, Button } from 'components';
import { FC } from 'react';
import { IBlog } from 'types';

const blogs: IBlog[] = [
  {
    id: 1,
    name: 'Blog 1',
    imgUrl: 'url',
    bio: 'Blog bio will be here',
    articles: 100,
    followers: 20,
  },
  {
    id: 2,
    name: 'Blog 2',
    imgUrl: 'url',
    bio: 'Blog bio will be here',
    articles: 100,
    followers: 20,
  },
  {
    id: 3,
    name: 'Blog 3',
    imgUrl: 'url',
    bio: 'Blog bio will be here',
    articles: 100,
    followers: 20,
  },
  {
    id: 4,
    name: 'Blog 4',
    imgUrl: 'url',
    bio: 'Blog bio will be here',
    articles: 100,
    followers: 20,
  },
];

export const BlogsTab: FC = () => {
  return (
    <div className='tab'>
      {blogs.map((blog) => (
        <div className='d-flex align-items-center justify-content-between mx-3 mb-3' key={blog.id}>
          <Blog {...blog} />
          <Button color='outline-dark'>Follow</Button>
        </div>
      ))}
    </div>
  );
};
