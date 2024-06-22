import { GenericWrapper } from 'components/wrappers';

export default function SuccessPage() {
  return (
    <GenericWrapper areNavigationAndSidebarEqual isNavigationHidden isSidebarHidden>
      <h1 className='text-center'>Maqolangiz muvaffaqqiyatli nashr qilindi</h1>
    </GenericWrapper>
  );
}
