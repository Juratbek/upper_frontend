import { Article } from 'frontends/article';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const ArticlePage: NextPage = () => {
  const router = useRouter();
  const { id: articleId } = router.query;

  return <Article articleId={articleId + ''} />;
};

export default ArticlePage;
