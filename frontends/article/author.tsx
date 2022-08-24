import { SidebarBlog } from 'components';
import { FC } from 'react';
import { IBlog } from 'types';

import { IAuthorProps } from './article.types';

const blog: IBlog = {
  id: 1,
  name: 'Blog name',
  imgUrl: '',
  bio: 'Blog bio will be here',
  articlesCount: 10,
  followersCount: 23,
};

export const Author: FC<IAuthorProps> = (props) => {
  return <SidebarBlog {...props} {...blog} />;
};
