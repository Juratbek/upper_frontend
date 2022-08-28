import { Button } from 'components/Button/Button';
import { ChangeEvent, FC, useRef, useState } from 'react';

import classes from './FileInput.module.scss';
import { IFileInputProps } from './FileInput.types';

export const FileInput: FC<IFileInputProps> = () => {
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target?.files;
    if (!files) return;
    setFile(files[0]);
  };

  const clickHandler = (): void => {
    inputRef.current?.click();
  };

  return (
    <div className={classes.container}>
      <input type='file' ref={inputRef} onChange={changeHandler} hidden />
      <input value={file?.name} disabled className={classes.input} />
      <Button onClick={clickHandler} color='outline-dark'>
        Yuklash
      </Button>
    </div>
  );
};
