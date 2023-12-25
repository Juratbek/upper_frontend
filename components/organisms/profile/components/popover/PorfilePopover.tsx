import { forwardRef, useState } from 'react';
import { TNoop } from 'types';

import { LogOutBtn } from './log-out/LogOut';
import { MenuList } from './menu-list/MenuList';
import { Profile } from './profile/Profile';
import classes from './ProfilePopover.module.scss';
import { ISubmenuState } from './ProfilePopover.types';

const EmptySubmenu: ISubmenuState = {
  Component: () => null,
  isShown: false,
};

export const ProfilePopover = forwardRef<HTMLDivElement, { close: TNoop; isOpen: boolean }>(
  function Component({ close, isOpen }, ref) {
    const [submenu, setSubmenu] = useState<ISubmenuState>(EmptySubmenu);
    const Submenu = submenu.Component;
    const backHandler = (): void => setSubmenu(EmptySubmenu);

    return (
      <div className={`${classes.root} ${!isOpen && 'h-0'}`} ref={ref}>
        <Submenu onBack={backHandler} className={submenu.isShown ? 'h-auto' : 'h-0 border-none'} />
        <div className={`${classes['main-menu']} ${Boolean(submenu.isShown) && 'h-0 border-none'}`}>
          <Profile closePopover={close} className={classes['vertical-padding']} />
          <MenuList
            closePopover={close}
            setSubmenu={setSubmenu}
            itemClassName={classes['vertical-padding']}
          />
          <LogOutBtn className={classes['vertical-padding']} />
        </div>
      </div>
    );
  },
);
