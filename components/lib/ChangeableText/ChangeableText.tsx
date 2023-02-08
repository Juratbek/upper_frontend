import { Spinner } from 'components';
import { FC, FocusEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import classes from './ChangeableText.module.scss';
import { IChangeableTextProps } from './ChangeableText.types';

export const ChangeableText: FC<IChangeableTextProps> = ({ value, ...props }) => {
  const [isBeingChanged, setIsBeingChanged] = useState(props.defaultFocused);
  const inputRef = useRef<HTMLInputElement>(null);

  const doubleClickhandler = (): void => {
    if (props.loading) return;
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
      {/* {props.loading && (
        <span className={classes.spinner}>

          <Spinner color='light' />
        </span>
       
      )} */}

      {props.loading ? (
        <p className={`${classes.text}  w-100 skeleton`} />
      ) : (
        <p
          className={`m-0 ${isBeingChanged && classes.hide} ${props.className}`}
          onDoubleClick={doubleClickhandler}
          onClick={props.onClick}
        >
          {value}
        </p>
      )}
    </div>
  );
};
