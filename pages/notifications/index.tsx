import { TabBody, TabsHeader } from 'components';
import { checkAuthInServer } from 'utils';
import { NOTIFICATIONS_TAB_MENUS, NOTIFICATIONS_TABS } from 'variables/notification';

export default function NotificationsPage(): JSX.Element {
  return (
    <main className='container'>
      <h1 className='mb-1'>Habarlar</h1>
      <TabsHeader tabs={NOTIFICATIONS_TAB_MENUS} />
      <TabBody tabs={NOTIFICATIONS_TABS} />
    </main>
  );
}

export const getServerSideProps = checkAuthInServer;
