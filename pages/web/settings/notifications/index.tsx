import { GenericWrapper } from 'components/wrappers';
import { SettingsNavigation } from 'frontends/settings';

const NotificationSettings = (): JSX.Element => {
  return <GenericWrapper desktopNavigation={<SettingsNavigation />}>Tez orada..</GenericWrapper>;
};

export default NotificationSettings;
