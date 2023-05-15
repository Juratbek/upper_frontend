import { Head, TabBody, TabsHeader } from 'components';
import { checkAuthInServer } from 'utils';
import { NOTIFICATIONS_TAB_MENUS, NOTIFICATIONS_TABS } from 'variables/notification';

export default function NotificationsPage(): JSX.Element {
  return (
    <div className='container'>
      <Head title='Habarlar' url='/notifications' />
      <h1 className='mb-1' id='notification-title'>
        Habarlar
      </h1>
      <TabsHeader tabs={NOTIFICATIONS_TAB_MENUS} />
      <TabBody tabs={NOTIFICATIONS_TABS} />
    </div>
  );
}

export const getServerSideProps = checkAuthInServer;
