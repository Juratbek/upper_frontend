import { Blog } from 'components';
import { FC, Fragment } from 'react';
import { IBlog } from 'types';

const followers: IBlog[] = [
  {
    id: 1,
    name: 'Boymurodov Samandar',
    imgUrl: '',
    articlesCount: 20,
    followersCount: 100,
    bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  },
  {
    id: 2,
    name: 'Boymurodov Samandar',
    imgUrl: '',
    articlesCount: 20,
    followersCount: 100,
  },
  {
    id: 3,
    name: 'Boymurodov Samandar',
    imgUrl: '',
  },
  {
    id: 4,
    name: 'Boymurodov Samandar',
    imgUrl: '',
    articlesCount: 20,
    followersCount: 100,
  },
];

export const FollowersTab: FC = () => {
  return (
    <div>
      {followers.map((follower) => (
        <Fragment key={follower.id}>
          <Blog {...follower} className='px-3 py-2' isLink />
        </Fragment>
      ))}
    </div>
  );
};
