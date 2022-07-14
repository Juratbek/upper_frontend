import { Blog, TabBody, TabsHeader } from 'components';
import { IBlog } from 'types';
import { PROFILE_TAB_MENUS, PROFILE_TABS } from 'variables/Profile.constants';

export const blog: IBlog = {
  id: 1,
  name: 'Boymurodov Samandar',
  imgUrl: '',
  articlesCount: 200,
  followersCount: 1000,
};

export default function ProfilePage(): JSX.Element {
  return (
    <main className='container'>
      <Blog {...blog} avaratSize='extra-large' className='p-2 align-items-center' />
      <TabsHeader tabs={PROFILE_TAB_MENUS} />
      <TabBody tabs={PROFILE_TABS} />
    </main>
  );
}
