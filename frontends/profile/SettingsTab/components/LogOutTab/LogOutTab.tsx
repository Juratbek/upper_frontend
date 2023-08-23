import { Button } from 'components';
import { useAuth } from 'hooks';
import { useRouter } from 'next/router';
import { useLogoutMutation } from 'store/apis';

export const LogOutTab = (): JSX.Element => {
  const { unauthenticate } = useAuth();
  const [logoutBlog] = useLogoutMutation();
  const router = useRouter();
  const logOut = async (): Promise<void> => {
    unauthenticate();
    await logoutBlog().unwrap();
    router.push('/');
  };
  return (
    <div>
      <h3>Profilingizdan chiqmoqchimisiz</h3>
      <Button onClick={logOut} color='outline-dark'>
        Profildan chiqish
      </Button>
    </div>
  );
};
