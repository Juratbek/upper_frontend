import { Button } from 'components/Button/Button';
import { ChangeEvent, FC, useRef, useState } from 'react';

import classes from './FileInput.module.scss';
import { TFileInputProps } from './FileInput.types';

export const FileInput: FC<TFileInputProps> = ({ onChange, ...props }) => {
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target?.files;
    if (!files) return;
    const file = files[0];
    setFile(file);
    onChange?.(file);
  };

  const clickHandler = (): void => {
    inputRef.current?.click();
  };

  return (
    <div className={classes.container}>
      <input {...props} type='file' ref={inputRef} onChange={changeHandler} hidden />
      <input
        value={file?.name}
        disabled
        placeholder='O`zgartirish uchun faylni yuklang'
        className={classes.input}
      />
      <Button onClick={clickHandler} color='outline-dark'>
        Yuklash
      </Button>
    </div>
  );
};
