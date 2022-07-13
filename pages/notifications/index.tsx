import { TabBody, TabsHeader } from 'components';
import { NOTIFICATIONS_TAB_MENUS, NOTIFICATIONS_TABS } from 'variables/notification';

export default function NotificationsPage(): JSX.Element {
  return (
    <main className='container'>
      <h1 className='mb-1'>Bildirishnomalar</h1>
      <TabsHeader tabs={NOTIFICATIONS_TAB_MENUS} />
      <TabBody tabs={NOTIFICATIONS_TABS} />
    </main>
  );
}
