import {
  FC,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { selectAll } from 'utils';

import classes from './ChangeableText.module.scss';
import { TChangeableTextProps } from './ChangeableText.types';

export const ChangeableText: FC<TChangeableTextProps> = ({ value, onSubmit, ...props }) => {
  const [isContentEditable, setIsContentEditable] = useState(props.defaultFocused || false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const doubleClickhandler = (): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const clickHandler = (event: MouseEvent<HTMLParagraphElement>): void => {
    setIsContentEditable(true);

    if (!props.onClick) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsContentEditable(false);
      props.onClick?.(event);
    }, 400);
  };

  useEffect(() => {
    if (props.defaultFocused) {
      const paragraph = textRef.current;
      if (!paragraph) return;
      paragraph.focus();
      selectAll(paragraph);
    }
  }, []);

  const keyDownHandler = (event: KeyboardEvent<HTMLParagraphElement>): void => {
    if (event.key === 'Enter') {
      (event.target as HTMLParagraphElement).blur();
      event.preventDefault();
    }
  };

  const blurHandler = useCallback((event: FocusEvent<HTMLParagraphElement>) => {
    props.onBlur?.(event);
    setIsContentEditable(false);
    const newValue = event.target.textContent?.trim();
    if (!newValue) return;
    onSubmit?.(newValue);
  }, []);

  return (
    <p
      ref={textRef}
      {...props}
      contentEditable={isContentEditable}
      onClick={clickHandler}
      onDoubleClick={doubleClickhandler}
      dangerouslySetInnerHTML={{ __html: value }}
      className={`m-0 w-100 ${classes.text}`}
      onBlur={blurHandler}
      onKeyDown={keyDownHandler}
    />
  );
};
