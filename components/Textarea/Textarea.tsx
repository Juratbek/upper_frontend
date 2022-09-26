import { forwardRef } from 'react';
import { getClassName } from 'utils';

import classes from './Textarea.module.scss';
import { ITextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(function withRef(
  { className, color, ...props },
  ref,
) {
  const rootClassName = getClassName(classes.textarea, className, classes[`textarea--${color}`]);

  return <textarea {...props} className={rootClassName} ref={ref} />;
});
