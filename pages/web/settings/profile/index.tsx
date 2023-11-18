import { GenericWrapper } from 'components/wrappers';
import { ProfileSettingsUI, SettingsNavigation } from 'frontends/settings';

const ProfileSettingsPage = (): JSX.Element => {
  return (
    <GenericWrapper navigation={<SettingsNavigation />}>
      <ProfileSettingsUI />
    </GenericWrapper>
  );
};

export default ProfileSettingsPage;
