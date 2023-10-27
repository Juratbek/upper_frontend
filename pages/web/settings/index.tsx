import { GenericWrapper } from 'components/wrappers';
import { SettingsNavigation } from 'frontends/settings';

const SettingsPage = (): JSX.Element => {
  return <GenericWrapper navigation={<SettingsNavigation />}>settings page</GenericWrapper>;
};

export default SettingsPage;
