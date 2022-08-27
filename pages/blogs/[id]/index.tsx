import { Blog, Button, TabBody, TabsHeader } from 'components';
import { BLOG_TAB_MENUS, BLOG_TABS } from 'frontends/blog';
import { IBlog } from 'types';

export const blog: IBlog = {
  id: 1,
  name: 'Boymurodov Samandar',
  imgUrl: '',
};

const isBeeingFollowed = false;

export default function BlogPage(): JSX.Element {
  return (
    <main className='container'>
      <div className='d-flex align-items-center justify-content-between p-2'>
        <Blog {...blog} avaratSize='extra-large' />
        {isBeeingFollowed ? (
          <Button color='outline-dark' disabled className='test'>
            Kuzatib borilmoqda
          </Button>
        ) : (
          <Button>Kuzatib borish</Button>
        )}
      </div>
      <TabsHeader tabs={BLOG_TAB_MENUS} />
      <TabBody tabs={BLOG_TABS} />
    </main>
  );
}
