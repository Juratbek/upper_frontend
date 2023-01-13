import { FC, FocusEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import classes from './ChangeableText.module.scss';
import { IChangeableTextProps } from './ChangeableText.types';

export const ChangeableText: FC<IChangeableTextProps> = ({ value, ...props }) => {
  const [isBeingChanged, setIsBeingChanged] = useState(props.defaultFocused);
  const inputRef = useRef<HTMLInputElement>(null);

  const doubleClickhandler = (): void => {
    setIsBeingChanged(true);
  };

  useEffect(() => {
    if (isBeingChanged) {
      const input = inputRef.current;
      input?.focus();
      input?.select();
    }
  }, [isBeingChanged]);

  const submitHandler = (value: string): void => {
    setIsBeingChanged(false);
    props.onSubmit?.(value);
  };
  const blurChangeHandler = (event: FocusEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    submitHandler(value);
  };

  const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      submitHandler(target.value);
    }
  };

  return (
    <div className={classes.root}>
      <div className={isBeingChanged ? props.className : ''}>
        <input
          ref={inputRef}
          onBlur={blurChangeHandler}
          defaultValue={value}
          hidden={!isBeingChanged}
          onKeyDown={keyDownHandler}
        />
      </div>
      <p
        className={`m-0 ${isBeingChanged && classes.hide} ${props.className}`}
        onDoubleClick={doubleClickhandler}
      >
        {value}
      </p>
    </div>
  );
};
