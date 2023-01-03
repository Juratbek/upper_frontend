import { Blog, TabBody, TabsHeader } from 'components';
import { useMemo } from 'react';
import { useGetCurrentBlogQuery } from 'store/apis';
import { addAmazonUri, checkAuthInServer } from 'utils';
import { PROFILE_TAB_MENUS, PROFILE_TABS } from 'variables/Profile.constants';

export default function ProfilePage(): JSX.Element {
  const fetchCurrentBlogRes = useGetCurrentBlogQuery();

  const currentBlog = useMemo(() => {
    const { data: currentBlog, isError, error } = fetchCurrentBlogRes;
    if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;
    return (
      currentBlog && (
        <Blog
          {...addAmazonUri(currentBlog)}
          avaratSize='extra-large'
          className='p-2 align-items-center'
        />
      )
    );
  }, [fetchCurrentBlogRes]);

  return (
    <div className='container'>
      {currentBlog}
      <TabsHeader tabs={PROFILE_TAB_MENUS} />
      <TabBody tabs={PROFILE_TABS} />
    </div>
  );
}

export const getServerSideProps = checkAuthInServer;
