import { Head } from 'components';
import { GenericWrapper } from 'components/wrappers';
import { NotFound } from 'frontends/404';
import { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
  return (
    <GenericWrapper>
      <Head title='Sahifa topilmadi' url='/not-fount' />
      <NotFound />
    </GenericWrapper>
  );
};

export default NotFoundPage;
