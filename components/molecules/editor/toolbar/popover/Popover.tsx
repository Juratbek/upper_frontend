import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import { getClassName } from 'utils';

import { IToolbar } from '../../tools/tool.types';
import cls from './Popover.module.scss';

export const Popover: FC<{ open: boolean; children?: ReactNode }> = ({ open, children }) => {
  return <div className={getClassName(cls.popover, open && cls.open)}>{children}</div>;
};

export const Item = memo(function Component({
  icon,
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement> & { icon: IToolbar['icon'] }) {
  return (
    <button className={cls.btn} {...props}>
      <span className={cls.icon} dangerouslySetInnerHTML={{ __html: icon }} />
      {children}
    </button>
  );
});
