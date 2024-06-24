import { GenericWrapper } from 'components/wrappers';

export default function SuccessPage() {
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
    </GenericWrapper>
  );
}
