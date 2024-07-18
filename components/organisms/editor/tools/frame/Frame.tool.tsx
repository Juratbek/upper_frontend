import { memo } from 'react';

import { IToolProps } from '../tool.types';
import cls from './Frame.module.scss';
import { IFrameData } from './Frame.types';

export const Frame = memo(
  function Memoized({ data }: IToolProps<IFrameData>) {
    return (
      <figure>
        <iframe
          className={cls.frame}
          width={data.width}
          height={data.height}
          src={data.src}
          allowFullScreen
          frameBorder={0}
        />
      </figure>
    );
  },
  (prevProps, currentProps) => {
    if (prevProps.data.src !== currentProps.data.src) return false;

    return true;
  },
);
