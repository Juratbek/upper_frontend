import { Head } from 'components';
import { SupportBlog } from 'frontends/support-blog';

const SupportBlogPage = (): JSX.Element => {
  return (
    <>
      <Head title="Blog faoliyatiga o'z hissangizni qo'shing" url='/sponsor' />
      <SupportBlog />
    </>
  );
};

export default SupportBlogPage;
