import { ChangeEvent, KeyboardEventHandler, memo, useCallback, useEffect, useRef } from 'react';

import { IToolProps } from '../tool.types';
import { textBlockKeydownHandler } from '../utils';
import classes from './Paragraph.module.scss';
import { IParagraphData } from './Paragraph.types';

export const Paragraph = memo(
  function Memoized({ data, isEditable, api, id, type }: IToolProps<IParagraphData>) {
    const ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
      if (isEditable && !data.text) ref.current?.focus();
    }, []);

    const keydownHandler: KeyboardEventHandler<HTMLParagraphElement> = useCallback(
      (event) => {
        if (!ref.current) return;

        textBlockKeydownHandler(
          event,
          api,
          ref.current,
          { id, type },
          {
            shouldMergeOnBackspace: true,
          },
        );
      },
      [data, id],
    );

    const changeHandler = (event: ChangeEvent<HTMLParagraphElement>) => {
      api.setBlock<IParagraphData>({ id, type, data: { text: event.target.innerHTML } });
    };

    return (
      <p
        id={id}
        onKeyDown={keydownHandler}
        className={classes.paragraph}
        ref={ref}
        contentEditable={isEditable}
        onInput={changeHandler}
        dangerouslySetInnerHTML={{ __html: data.text ?? '' }}
      />
    );
  },
  () => true,
);
