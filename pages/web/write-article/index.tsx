import { Head } from 'components';
import { FC } from 'react';
import { checkAuthInServer } from 'utils';

import { WriteArticlePage } from '../../../frontends/write-article';

const WriteArticleNextPage: FC = () => {
  return (
    <div>
      <Head title='Maqola yozish' url='/write-article' />
      <WriteArticlePage />
    </div>
  );
};

export default WriteArticleNextPage;

export const getServerSideProps = checkAuthInServer;
