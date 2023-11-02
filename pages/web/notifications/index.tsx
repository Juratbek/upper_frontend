import { Head } from 'components/lib';
import { GenericWrapper } from 'components/wrappers';
import { NotificationsTab } from 'frontends/notifications';
import { checkAuthInServer } from 'utils';

export default function NotificationsPage(): JSX.Element {
  return (
    <GenericWrapper>
      <Head title='Xabarlar' url='/notifications' />
      <NotificationsTab />
    </GenericWrapper>
  );
}

export const getServerSideProps = checkAuthInServer;
