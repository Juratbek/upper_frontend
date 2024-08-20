import { ChangeEvent, KeyboardEventHandler, memo, useCallback, useEffect, useRef } from 'react';
import { getClassName } from 'utils';

import { IToolProps } from '../tool.types';
import { textBlockKeydownHandler } from '../utils';
import { H } from './h/H';
import classes from './Header.module.scss';
import { IHeaderData } from './Header.types';

export const Header = memo(
  function Memoized({ data, isEditable, api, ...props }: IToolProps<IHeaderData>) {
    const { level, text, placeholder } = data ?? { level: 2, text: '' };
    const ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
      const { current } = ref;
      if (isEditable && !data.text && current) {
        current.focus();
        placeholder && current.style.setProperty('--placeholder', `"${placeholder}"`);
      }
    }, []);

    const keydownHandler: KeyboardEventHandler<HTMLHeadingElement> = useCallback(
      (event) => {
        if (!ref.current) return;

        textBlockKeydownHandler(event, api, ref.current, props.id);
      },
      [props, data, api],
    );

    const changeHandler = (event: ChangeEvent<HTMLHeadingElement>) => {
      api.setBlock({
        id: props.id,
        type: props.type,
        data: { text: event.target.innerHTML, level },
      });
    };

    return (
      <H
        onKeyDown={keydownHandler}
        level={level}
        onInput={changeHandler}
        dangerouslySetInnerHTML={{ __html: text }}
        contentEditable={isEditable}
        className={getClassName(classes.heading, data?.alignment && classes[data.alignment])}
        ref={ref}
      />
    );
  },
  (prevProps, currentProps) => {
    const prevData = prevProps.data;
    const currentData = currentProps.data;

    if (prevData.alignment !== currentData.alignment || prevData.level !== currentData.level)
      return false;

    return true;
  },
);
