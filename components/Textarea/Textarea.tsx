import { FC, forwardRef } from 'react';
import { getClassName } from 'utils';

import classes from './Textarea.module.scss';
import { TTextareaProps } from './Textarea.types';

export const Textarea: FC<TTextareaProps> = forwardRef<HTMLTextAreaElement, TTextareaProps>(
  function withRef({ className, ...props }, ref) {
    const rootClassName = getClassName(classes.textarea, className);

    return <textarea {...props} className={rootClassName} ref={ref} />;
  },
);
