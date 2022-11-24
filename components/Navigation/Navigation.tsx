import { Alert, Button, Modal, Tooltip } from 'components';
import { useAuth, useDevice, useModal } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from 'store';
import { useLazyGetBlogNotificationsCountQuery } from 'store/apis';
import { openLoginModal, openRegisterModal } from 'store/states';
import { ICONS, NOTIFICATION_STATUSES } from 'variables';

import { NavItem } from './components';
import { NAVIGATION_ICONS } from './Navigation.constants';
import classes from './Navigation.module.scss';

const LogOutIcon = ICONS.logOut;
const Logo = ICONS.logo;

export const Navigation = (): JSX.Element => {
  const [alert, setAlert] = useState<string>();
  const { isAuthenticated, unauthenticate } = useAuth();
  const [isPublishModalOpen, togglePublishModal] = useModal();
  const [fetchBlogNotificationsCount, fetchBlogNotificationsCountRes] =
    useLazyGetBlogNotificationsCountQuery();
  const { pathname } = useRouter();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isMobile } = useDevice();

  const icons = useMemo(() => {
    return isAuthenticated ? NAVIGATION_ICONS : NAVIGATION_ICONS.filter((icon) => !icon.private);
  }, [isAuthenticated]);

  const logOut = (): void => {
    unauthenticate();
    router.push('/');
  };

  const clickHandler = (href: string, authNeeded: boolean | undefined): void => {
    if (!isAuthenticated && authNeeded) dispatch(openLoginModal());
    else router.route !== href && router.push(href);
  };

  const registerClickHandler = (): void => {
    dispatch(openRegisterModal());
  };

  const loginClickHandler = (): void => {
    dispatch(openLoginModal());
  };

  useEffect(() => {
    isAuthenticated && fetchBlogNotificationsCount(NOTIFICATION_STATUSES.UNREAD);
  }, [isAuthenticated]);

  const buttons = useMemo(
    () => (
      <div className={isMobile && !isAuthenticated ? 'd-block' : 'd-none'}>
        <Button color='outline-dark' className='me-xs-1' onClick={registerClickHandler}>
          Ro`yxatdan o`tish
        </Button>
        <Button onClick={loginClickHandler}>Kirish</Button>
      </div>
    ),
    [isMobile, isAuthenticated],
  );

  const actions = useMemo(() => {
    const isWriteArticlePage = pathname === '/write-article';
    const isUserArticlePage = pathname === '/user/articles/[id]';
    return (
      <div>
        {(isWriteArticlePage || isUserArticlePage) && (
          <Button color={isWriteArticlePage ? 'dark' : 'outline-dark'} className='me-xs-1'>
            Saqlash
          </Button>
        )}
        {isUserArticlePage && <Button className='me-xs-2'>Nashr qilish</Button>}
      </div>
    );
  }, [pathname]);

  const publishModal = useMemo(
    () => (
      <Modal
        size='small'
        isOpen={isPublishModalOpen}
        close={togglePublishModal}
        bodyClassName='text-center'
      >
        {alert && (
          <Alert color='red' onClose={(): void => setAlert('')} className='mb-1'>
            <div>{alert}</div>
            <a href={`${location.origin}/docs`} target='_blank' className='link' rel='noreferrer'>
              Yo`riqnomani o`qish
            </a>
          </Alert>
        )}
        <h3 className='mt-1'>Maqolani nashr qilmoqchimisiz</h3>
        <div className='d-flex'>
          <Button color='outline-dark' onClick={togglePublishModal} className='me-1'>
            Modalni yopish
          </Button>
          {/* <Button onClick={publish} className='flex-1' loading={publishArticleRes.isLoading}>
            Nashr qilish
          </Button> */}
        </div>
      </Modal>
    ),
    [],
  );

  return (
    <div className={classes.navigation}>
      {publishModal}
      <div className={`${classes.navigation} ${classes.positioned}`}>
        <span className={classes.logo}>
          <Logo />
        </span>
        <div className={classes.icons}>
          {icons.map(({ icon, href, authNeeded, tooltip }) => {
            const Icon = ICONS[icon];
            return (
              <Tooltip tooltip={tooltip} invisible={isMobile} key={icon}>
                <NavItem
                  onClick={(): void => clickHandler(href, authNeeded)}
                  icon={Icon}
                  className='pointer'
                  active={href === pathname}
                  badge={icon === 'notification' && fetchBlogNotificationsCountRes.data}
                />
              </Tooltip>
            );
          })}
        </div>
        <div className={classes['third-block']}>
          <div className={`${classes.logOut} pointer`} onClick={logOut}>
            {actions}
            {isAuthenticated && (
              <Tooltip tooltip='Profildan chiqish'>
                <LogOutIcon />
              </Tooltip>
            )}
          </div>
          {buttons}
        </div>
      </div>
    </div>
  );
};
