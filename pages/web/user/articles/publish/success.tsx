import { Button, Link } from 'components/lib';
import { GenericWrapper } from 'components/wrappers';
import { useAppRouter } from 'hooks';

export default function SuccessPage() {
  const { query } = useAppRouter();
  const publishedArticleId = Number(query['published-article-id']);

  return (
    <GenericWrapper areNavigationAndSidebarEqual isNavigationHidden isSidebarHidden>
      <h1 className='text-center'>🎉&nbsp; Maqolangiz muvaffaqqiyatli nashr qilindi</h1>
      <div style={{ fontSize: 20 }}>
        <p>Saytimiz sizga yoqdimi?</p>
        <p>
          U haqidagi fikrlaringizni, taklif va shikoyatlaringizni{' '}
          <a href='https://t.me/upper_contact_bot' target='_blank' rel='noreferrer'>
            telegram botimizda
          </a>{' '}
          qoldiring 💬
        </p>
        <strong>Sizning fikringiz biz uchun muhim</strong>
      </div>
      {!isNaN(publishedArticleId) && (
        <Link className='mt-2 d-block' href={`/articles/${publishedArticleId}`}>
          <Button className='w-100'>Maqolani ko&apos;rish</Button>
        </Link>
      )}
    </GenericWrapper>
  );
}
