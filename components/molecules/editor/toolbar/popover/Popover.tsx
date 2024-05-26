import { FC, HTMLAttributes, memo, MouseEvent, ReactNode, useState } from 'react';
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
  shouldBeConfirmed,
  ...props
}: HTMLAttributes<HTMLButtonElement> &
  Pick<IToolbarSetting, 'icon' | 'shouldBeConfirmed'> & { active?: boolean }) {
  const [clickCount, setClickCount] = useState(0);

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (clickCount > 0) {
      props.onClick?.(event);
      setClickCount(0);
      return;
    }

    if (shouldBeConfirmed) {
      setClickCount((prev) => prev + 1);
      return;
    }

    props.onClick?.(event);
  };

  return (
    <button
      {...props}
      onClick={clickHandler}
      className={getClassName(
        cls.btn,
        active && cls.active,
        props.className,
        clickCount > 0 && cls[shouldBeConfirmed!],
      )}
    >
      <span className={cls.icon} dangerouslySetInnerHTML={{ __html: icon }} />
      <div className={cls.text}>{children}</div>
    </button>
  );
});
