import { Head } from 'components/lib';
import { GenericWrapper } from 'components/wrappers';
import { Notifications } from 'frontends/notifications';
import { checkAuthInServer } from 'utils';

export default function NotificationsPage(): JSX.Element {
  return (
    <GenericWrapper>
      <Head title='Xabarlar' url='/notifications' />
      <Notifications />
    </GenericWrapper>
  );
}

export const getServerSideProps = checkAuthInServer;
