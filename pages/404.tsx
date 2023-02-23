import { Head } from 'components';
import { NotFound } from 'frontends/404';
import { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <Head title='Sahifa topilmadi' url='/not-fount' />
      <NotFound />
    </div>
  );
};

export default NotFoundPage;
