import { EyeIcon, EyeSlashIcon } from 'components/icons';
import { useTheme } from 'hooks';
import { forwardRef, useState } from 'react';
import { getClassName } from 'utils';

import classes from './Input.module.scss';
import { TInputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, TInputProps>(function Component(
  { className, rootClassName, ...props },
  ref,
) {
  const inputClassName = getClassName(className, classes.input);
  const [type, setType] = useState(props.type);
  const { themeColors } = useTheme();
  const { icon: iconColor } = themeColors;

  const toggleType = (): void => {
    setType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={`position-relative ${rootClassName}`}>
      <input
        style={{ borderColor: themeColors.input.border }}
        {...props}
        ref={ref}
        className={inputClassName}
        type={type}
      />
      {props.type === 'password' && (
        <span className={classes.eye} onClick={toggleType}>
          {type === 'password' ? <EyeIcon color={iconColor} /> : <EyeSlashIcon color={iconColor} />}
        </span>
      )}
    </div>
  );
});
