import { GenericWrapper } from 'components/wrappers';
import { Profile } from 'frontends/profile';
import { checkAuthInServer } from 'utils';

const ProfilePage = (): JSX.Element => {
  return (
    <GenericWrapper>
      <Profile />
    </GenericWrapper>
  );
};

export default ProfilePage;

export const getServerSideProps = checkAuthInServer;
