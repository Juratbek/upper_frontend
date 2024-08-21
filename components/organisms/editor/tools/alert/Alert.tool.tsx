import { ChangeEvent, memo, useEffect, useRef } from 'react';
import { getClassName } from 'utils';
import { debouncer } from 'utils/debouncer';

import { IToolProps } from '../tool.types';
import cls from './Alert.module.scss';
import { Warning } from './Alert.settings';
import { IAlertData } from './Alert.types';

const debounce = debouncer<string>();

export const Alert = memo(
  function Memoized({ data, api, isEditable, ...props }: IToolProps<IAlertData>) {
    const ref = useRef<HTMLParagraphElement>(null);

    const changeHandler = (event: ChangeEvent<HTMLHeadingElement>) => {
      debounce(event.target.innerHTML, (message) =>
        api.setBlock<IAlertData>({
          id: props.id,
          type: props.type,
          data: { message, type: data.type },
        }),
      );
    };

    useEffect(() => {
      if (isEditable && !data.message) ref.current?.focus();
    }, []);

    return (
      <div className={getClassName(cls.alert, cls[data.type] ?? cls.info)}>
        <span className={cls.icon} dangerouslySetInnerHTML={{ __html: Warning(data.type) }} />
        <p
          role='paragraph'
          ref={ref}
          className={cls.text}
          onInput={changeHandler}
          contentEditable={isEditable}
          dangerouslySetInnerHTML={{ __html: data.message }}
        />
      </div>
    );
  },
  (prevProps, currentProps) => {
    const prevData = prevProps.data;
    const currentData = currentProps.data;

    if (prevData.type !== currentData.type) return false;

    return true;
  },
);
