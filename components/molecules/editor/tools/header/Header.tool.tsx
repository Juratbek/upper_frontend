import {
  FC,
  forwardRef,
  HTMLAttributes,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { IToolProps } from '../tool.types';
import { textBlockKeydownHandler } from '../utils';
import classes from './Header.module.scss';
import { THeaderLevel } from './Header.types';

interface IProps extends HTMLAttributes<HTMLHeadingElement> {
  level: THeaderLevel;
}

const H = forwardRef<HTMLHeadingElement, IProps>(function Component({ level, ...props }, ref) {
  switch (level) {
    case 1:
      return <h1 {...props} ref={ref} />;
    case 2:
      return <h2 {...props} ref={ref} />;
    case 3:
      return <h3 {...props} ref={ref} />;
    case 4:
      return <h4 {...props} ref={ref} />;
    case 5:
      return <h5 {...props} ref={ref} />;
    case 6:
      return <h6 {...props} ref={ref} />;
    default:
      return <h1 {...props} ref={ref} />;
  }
});

export const Header: FC<IToolProps<{ level: THeaderLevel; text: string }>> = ({
  data,
  isEditable,
  api,
  ...props
}) => {
  const { level = 2, text } = data ?? { level: 1, text: '' };
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!data) ref.current?.focus();
  }, []);

  const keydownHandler: KeyboardEventHandler<HTMLParagraphElement> = useCallback(
    (event) => {
      if (!ref.current) return;

      textBlockKeydownHandler(event, api, ref.current, props);
    },
    [props, data, api],
  );

  return (
    <H
      onKeyDown={keydownHandler}
      level={level}
      dangerouslySetInnerHTML={{ __html: text }}
      contentEditable={isEditable}
      className={classes.heading}
      ref={ref}
    />
  );
};
