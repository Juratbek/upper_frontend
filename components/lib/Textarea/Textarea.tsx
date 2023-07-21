import { useTheme } from 'hooks';
import { forwardRef } from 'react';
import { getClassName } from 'utils';

import classes from './Textarea.module.scss';
import { ITextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(function withRef(
  { className, color, ...props },
  ref,
) {
  const rootClassName = getClassName(classes.textarea, className, classes[`textarea--${color}`]);
  const { themeColors } = useTheme();

  return (
    <textarea
      style={{ borderColor: themeColors.input.border }}
      rows={3}
      {...props}
      className={rootClassName}
      ref={ref}
    />
  );
});
