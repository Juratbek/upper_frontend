import { forwardRef, useState } from 'react';
import { getClassName } from 'utils';
import { ICONS } from 'variables';

import classes from './Input.module.scss';
import { TInputProps } from './Input.types';

const EyeIcon = ICONS.eye;
const EyeSlashIcon = ICONS.eyeSlash;

export const Input = forwardRef<HTMLInputElement, TInputProps>(function Component(
  { className, ...props },
  ref,
) {
  const rootClassName = getClassName(className, classes.input);
  const [type, setType] = useState(props.type);

  const toggleType = (): void => {
    setType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div className='position-relative'>
      <input {...props} ref={ref} className={rootClassName} type={type} />
      {props.type === 'password' && (
        <span className={classes.eye} onClick={toggleType}>
          {type === 'password' ? <EyeIcon /> : <EyeSlashIcon />}
        </span>
      )}
    </div>
  );
});
