import { ChangeEvent, FC, KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';
import { debouncer } from 'utils/debouncer';

import { IToolProps } from '../tool.types';
import { textBlockKeydownHandler } from '../utils';
import classes from './Paragraph.module.scss';
import { IParagraphData } from './Paragraph.types';

const debounce = debouncer<IParagraphData>();

export const Paragraph: FC<IToolProps<IParagraphData>> = ({ data, isEditable, api, ...props }) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isEditable && !data.text) ref.current?.focus();
  }, []);

  const keydownHandler: KeyboardEventHandler<HTMLParagraphElement> = useCallback(
    (event) => {
      if (!ref.current) return;

      textBlockKeydownHandler(event, api, ref.current, props.id);
    },
    [data, props],
  );

  const changeHandler = (event: ChangeEvent<HTMLParagraphElement>) => {
    debounce({ text: event.target.innerHTML }, (d) =>
      api.setBlock({ id: props.id, type: props.type, data: d }),
    );
  };

  return (
    <p
      onKeyDown={keydownHandler}
      className={classes.paragraph}
      ref={ref}
      contentEditable={isEditable}
      onChange={changeHandler}
      dangerouslySetInnerHTML={{ __html: data.text ?? '' }}
    />
  );
};
