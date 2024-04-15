import {
  ChangeEvent,
  FC,
  forwardRef,
  HTMLAttributes,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { getClassName } from 'utils';
import { debouncer } from 'utils/debouncer';

import { IToolProps } from '../tool.types';
import { textBlockKeydownHandler } from '../utils';
import classes from './Header.module.scss';
import { IHeaderData } from './Header.types';

interface IProps extends HTMLAttributes<HTMLHeadingElement>, Pick<IHeaderData, 'level'> {}

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

const debounce = debouncer<IHeaderData>();

export const Header: FC<IToolProps<IHeaderData>> = ({ data, isEditable, api, ...props }) => {
  const { level, text } = data ?? { level: 1, text: '' };
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isEditable && !data.text) ref.current?.focus();
  }, []);

  const keydownHandler: KeyboardEventHandler<HTMLParagraphElement> = useCallback(
    (event) => {
      if (!ref.current) return;

      textBlockKeydownHandler(event, api, ref.current, props.id);
    },
    [props, data, api],
  );

  const changeHandler = (event: ChangeEvent<HTMLHeadingElement>) => {
    debounce({ text: event.target.innerHTML }, (d) =>
      api.setBlock({ id: props.id, type: props.type, data: d }),
    );
  };

  return (
    <H
      onKeyDown={keydownHandler}
      level={level}
      onChange={changeHandler}
      dangerouslySetInnerHTML={{ __html: text }}
      contentEditable={isEditable}
      className={getClassName(classes.heading, data?.alignment && classes[data.alignment])}
      ref={ref}
    />
  );
};
