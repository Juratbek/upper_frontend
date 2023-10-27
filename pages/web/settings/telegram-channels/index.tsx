import { GenericWrapper } from 'components/wrappers';
import { SettingsNavigation } from 'frontends/settings';

const TelegramChannels = (): JSX.Element => {
  return <GenericWrapper navigation={<SettingsNavigation />}>telegram channels</GenericWrapper>;
};

export default TelegramChannels;
