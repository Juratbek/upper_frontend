import { FC } from 'react';
import { getClassName } from 'utils';

import classes from './Textarea.module.scss';
import { TTextareaProps } from './Textarea.types';

export const Textarea: FC<TTextareaProps> = ({ className, ...props }) => {
  const rootClassName = getClassName(classes.textarea, className);

  return <textarea {...props} className={rootClassName} />;
};
