import { GenericWrapper } from 'components/wrappers';
import { SettingsNavigation } from 'frontends/settings';

const NotificationSettings = (): JSX.Element => {
  return (
    <GenericWrapper desktopNavigation={<SettingsNavigation />}>
      notification settings
    </GenericWrapper>
  );
};

export default NotificationSettings;
