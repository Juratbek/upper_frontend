import { FC } from 'react';

import { IToolProps } from '../tool.types';
import cls from './Delimiter.module.scss';

export const Delimiter: FC<IToolProps<unknown>> = () => (
  <div className={cls.delimiter}>
    *{'   '}*{'   '}*
  </div>
);
