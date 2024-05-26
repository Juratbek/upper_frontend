import { ChangeEvent, useCallback, useEffect, useRef } from 'react';

import cls from './UploadImage.module.scss';

export const UploadImage = ({ onUpload }: { onUpload: (file: File) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const inputSelectHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      console.error('File is not defined');
      return;
    }

    onUpload(file);
  };

  const clickFileInput = useCallback(() => {
    inputRef.current?.click();
  }, []);

  useEffect(clickFileInput, [clickFileInput]);

  return (
    <>
      <input
        accept='image/png, image/gif, image/jpeg'
        ref={inputRef}
        type='file'
        hidden
        onChange={inputSelectHandler}
      />
      <button onClick={clickFileInput} className={cls.btn}>
        Rasm yuklash
      </button>
    </>
  );
};
