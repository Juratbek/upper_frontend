import { FC, KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';

import { IToolProps } from '../tool.types';
import { textBlockKeydownHandler } from '../utils';
import classes from './Paragraph.module.scss';

export const Paragraph: FC<IToolProps<{ text: string }>> = ({
  data,
  isEditable,
  api,
  ...props
}) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!data) ref.current?.focus();
  }, []);

  const keydownHandler: KeyboardEventHandler<HTMLParagraphElement> = useCallback(
    (event) => {
      if (!ref.current) return;

      textBlockKeydownHandler(event, api, ref.current, props);
    },
    [data, props],
  );

  return (
    <p
      onKeyDown={keydownHandler}
      className={classes.paragraph}
      ref={ref}
      contentEditable={isEditable}
      dangerouslySetInnerHTML={{ __html: data?.text ?? '' }}
    />
  );
};
