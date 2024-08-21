import {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  memo,
  MouseEvent,
  ReactNode,
  useState,
} from 'react';
import { getClassName } from 'utils';

import { IToolbarSetting } from '../../tools/tool.types';
import cls from './Popover.module.scss';

export const Popover = forwardRef<
  HTMLDivElement,
  { open: boolean; children?: ReactNode; style?: CSSProperties }
>(function Component({ open, children, style }, ref) {
  return (
    <div
      ref={ref}
      role='dialog'
      className={getClassName(cls.popover, open && cls.open)}
      style={style}
    >
      {children}
    </div>
  );
});

export const Item = memo(function Component({
  icon,
  children,
  active,
  shouldBeConfirmed,
  suffix,
  ...props
}: HTMLAttributes<HTMLButtonElement> &
  Pick<IToolbarSetting, 'icon' | 'shouldBeConfirmed'> & { active?: boolean; suffix?: ReactNode }) {
  const [clickCount, setClickCount] = useState(0);

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (clickCount > 0) {
      props.onClick?.(event);
      setClickCount(0);
      return;
    }

    if (shouldBeConfirmed) {
      setClickCount((prev) => prev + 1);
      event.stopPropagation();
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
      {Boolean(suffix) && <span className={cls.suffix}>{suffix}</span>}
    </button>
  );
});
