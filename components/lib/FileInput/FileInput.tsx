import { Button } from 'components';
import { ChangeEvent, forwardRef, useState } from 'react';

import classes from './FileInput.module.scss';
import { IFileInputProps } from './FileInput.types';

const id = 'file-input';

export const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(function Component(
  props,
  ref,
) {
  const [file, setFile] = useState<File>();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target?.files;
    if (!files) return;
    const file = files[0];
    setFile(file);
    props.onChange?.(event);
  };

  const clickHandler = (): void => {
    const element = document.getElementById(`${id}-${props.name}`);
    element?.click();
  };

  return (
    <div className={classes.container}>
      <input
        {...props}
        id={`${id}-${props.name}`}
        type='file'
        onChange={changeHandler}
        hidden
        ref={ref}
      />
      <input
        value={file?.name}
        disabled
        placeholder="O'zgartirish uchun faylni yuklang"
        className={classes.input}
      />
      <Button type='button' onClick={clickHandler} color='outline-dark'>
        Yuklash
      </Button>
    </div>
  );
});
