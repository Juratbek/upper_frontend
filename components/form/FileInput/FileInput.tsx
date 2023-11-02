import { Button } from 'components/lib';
import { useTheme } from 'hooks';
import { ChangeEvent, forwardRef, useState } from 'react';

import classes from './FileInput.module.scss';
import { IFileInputProps } from './FileInput.types';

const id = 'file-input';

export const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(
  function Component(props, ref) {
    const [file, setFile] = useState<File>();
    const { themeColors } = useTheme();

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
      <div className={classes.container} style={{ borderColor: themeColors.input.border }}>
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
          placeholder='Yuklash uchun bosing'
          className={classes.input}
        />
        <Button type='button' onClick={clickHandler}>
          Yuklash
        </Button>
      </div>
    );
  },
);
