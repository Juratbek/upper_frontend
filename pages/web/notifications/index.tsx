import { Head } from 'components';
import { NotificationsTab } from 'frontends/notifications';
import { checkAuthInServer } from 'utils';

export default function NotificationsPage(): JSX.Element {
  return (
    <div className='container'>
      <Head title='Habarlar' url='/notifications' />
      <h1 className='mb-1'>Habarlar</h1>
      <NotificationsTab />
    </div>
  );
}

export const getServerSideProps = checkAuthInServer;
