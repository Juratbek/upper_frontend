import { Editor } from 'components';
import { useRouter } from 'next/router';
import { ARTICLE_STATUSES } from 'variables';

export default function ArticlePage(): JSX.Element {
  const {
    query: { status },
  } = useRouter();
  return (
    <div className='container'>
      <Editor readOnly={status === ARTICLE_STATUSES.DELETED} />
    </div>
  );
}
