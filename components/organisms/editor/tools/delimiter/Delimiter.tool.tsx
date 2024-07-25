import { FC, memo } from 'react';

import cls from './Delimiter.module.scss';

export const Delimiter: FC = memo(
  function Memoized() {
    return (
      <div className={cls.delimiter}>
        *{'   '}*{'   '}*
      </div>
    );
  },
  () => false,
);
