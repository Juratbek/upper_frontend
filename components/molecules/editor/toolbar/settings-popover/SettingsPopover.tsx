import { FC } from 'react';

import { Item, Popover } from '../popover/Popover';
import { ISettingsBtn, useSettings } from './SettingsPopover.hooks';
import cls from './SettingsPopover.module.scss';

export const SettingsPopover: FC<{ open: boolean; close: VoidFunction }> = ({ open, close }) => {
  const buttons = useSettings();

  const itemClickHandler = (item: ISettingsBtn) => {
    item.onClick();
    close();
  };

  return (
    <Popover open={open}>
      <div className={cls.list}>
        {buttons.map((item) => (
          <Item key={item.text} icon={item.icon} onClick={() => itemClickHandler(item)}>
            {item.text}
          </Item>
        ))}
      </div>
    </Popover>
  );
};
