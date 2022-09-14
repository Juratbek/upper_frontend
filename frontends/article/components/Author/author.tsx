import { SidebarBlog } from 'components';
import { FC } from 'react';

import { IAuthorProps } from './author.types';

export const Author: FC<IAuthorProps> = (props) => {
  return <SidebarBlog {...props} />;
};
