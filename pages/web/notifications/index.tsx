import { Head } from 'components';
import { GenericWrapper } from 'components/wrappers';
import { NotificationsTab } from 'frontends/notifications';
import { checkAuthInServer } from 'utils';

export default function NotificationsPage(): JSX.Element {
  return (
    <GenericWrapper>
      <Head title='Xabarlar' url='/notifications' />
      <h1 className='mb-1'>Xabarlar</h1>
      <NotificationsTab />
    </GenericWrapper>
  );
}

export const getServerSideProps = checkAuthInServer;
