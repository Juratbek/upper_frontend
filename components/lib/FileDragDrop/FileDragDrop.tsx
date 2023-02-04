import { ChangeEvent, forwardRef, useId, useMemo, useState } from 'react';

import classes from './FileDragDrop.module.scss';
import { TFileDragDropProps } from './FileDragDrop.types';

export const FileDragDrop = forwardRef<HTMLInputElement, TFileDragDropProps>(function Component(
  { defaultValue, ...props },
  ref,
) {
  const [file, setFile] = useState<File | string>(defaultValue);
  const id = useId();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target?.files;
    if (!files) return;
    const file = files[0];
    setFile(file);
    props.onChange?.(file);
  };

  const clickHandler = (): void => {
    const element = document.getElementById(id);
    element?.click();
  };

  const placeholder = useMemo(
    () => props.placeholder || 'Yuklash uchun bosing',
    [props.placeholder],
  );

  const selectedFileElement = useMemo(() => {
    if (!file) return null;
    if (props.selectedFileRenderer) {
      return props.selectedFileRenderer(file);
    }
    if (file instanceof File) {
      return <p>{file?.name}</p>;
    }
    return <p>{file}</p>;
  }, [file, props.selectedFileRenderer]);

  return (
    <div>
      <input {...props} id={id} type='file' onChange={changeHandler} hidden ref={ref} />
      <div className={classes['drag-drop-container']} onClick={clickHandler}>
        {file ? selectedFileElement : placeholder}
      </div>
    </div>
  );
});
