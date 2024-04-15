import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import { getClassName } from 'utils';

import { IToolbarSetting } from '../../tools/tool.types';
import cls from './Popover.module.scss';

export const Popover: FC<{ open: boolean; children?: ReactNode }> = ({ open, children }) => {
  return <div className={getClassName(cls.popover, open && cls.open)}>{children}</div>;
};

export const Item = memo(function Component({
  icon,
  children,
  active,
  ...props
}: HTMLAttributes<HTMLButtonElement> & Pick<IToolbarSetting, 'icon'> & { active?: boolean }) {
  return (
    <button className={getClassName(cls.btn, active && cls.active)} {...props}>
      <span className={cls.icon} dangerouslySetInnerHTML={{ __html: icon }} />
      <div className={cls.text}>{children}</div>
    </button>
  );
});
