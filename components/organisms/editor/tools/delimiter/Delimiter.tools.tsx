import { FC, memo } from 'react';

import { IToolProps } from '../tool.types';
import cls from './Delimiter.module.scss';

export const Delimiter: FC<IToolProps<unknown>> = memo(
  function Memoized() {
    return (
      <div className={cls.delimiter}>
        *{'   '}*{'   '}*
      </div>
    );
  },
  () => false,
);
