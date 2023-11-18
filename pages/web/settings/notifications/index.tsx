import { GenericWrapper } from 'components/wrappers';
import { SettingsNavigation } from 'frontends/settings';

const NotificationSettings = (): JSX.Element => {
  return <GenericWrapper navigation={<SettingsNavigation />}>notification settings</GenericWrapper>;
};

export default NotificationSettings;
