import { FC } from 'react';
import { checkAuthInServer } from 'utils';

import { WriteArticlePage } from '../../frontends/write-article';

const WriteArticleNextPage: FC = () => {
  return <WriteArticlePage />;
};

export default WriteArticleNextPage;

export const getServerSideProps = checkAuthInServer;
