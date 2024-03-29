import { FC, FocusEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import classes from './ChangeableText.module.scss';
import { IChangeableTextProps } from './ChangeableText.types';

export const ChangeableText: FC<IChangeableTextProps> = ({ value, ...props }) => {
  const [isBeingChanged, setIsBeingChanged] = useState(props.defaultFocused);
  const inputRef = useRef<HTMLInputElement>(null);
  const clickFnRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const doubleClickhandler = (): void => {
    if (props.loading) return;
    setIsBeingChanged(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const clickHandler = (): void => {
    if (!props.onClick) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      props.onClick?.();
    }, 400);
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
    clickFnRef.current = false;
    const value = event.target.value.trim();
    if (value.length < 1) {
      setIsBeingChanged(false);
      return;
    }
    submitHandler(value);
  };

  const keyDownHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      const value = target.value.trim();
      if (value.length < 1) return;
      submitHandler(value);
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
          required
          disabled={props.loading}
          className={classes.input}
        />
      </div>

      {props.loading ? (
        <p className={`${classes['text-skeleton']}  w-100 skeleton`} />
      ) : (
        <p
          className={`m-0 ${isBeingChanged && classes.hide} ${props.className}`}
          onDoubleClick={doubleClickhandler}
          onClick={clickHandler}
        >
          {value}
        </p>
      )}
    </div>
  );
};
