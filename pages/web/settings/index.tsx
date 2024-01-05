import { GenericWrapper } from 'components/wrappers';
import { SettingsNavigation } from 'frontends/settings';

const SettingsPage = (): JSX.Element => {
  return <GenericWrapper desktopNavigation={<SettingsNavigation />}>settings page</GenericWrapper>;
};

export default SettingsPage;
