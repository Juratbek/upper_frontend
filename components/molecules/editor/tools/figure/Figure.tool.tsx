import { FC, memo } from 'react';

import { IToolProps } from '../tool.types';
import { IFigureData } from './Figure.types';

export const Figure = memo(function Memoized({ data }: IToolProps<IFigureData>) {
  const { caption } = data;

  return (
    <figure>
      <Content {...data} />
      {Boolean(caption) && <figcaption dangerouslySetInnerHTML={{ __html: caption! }} />}
    </figure>
  );
});

const Content: FC<IToolProps<IFigureData>['data']> = ({ element, width, height, src }) => {
  switch (element) {
    case 'frame': {
      return <iframe allowFullScreen width={width} height={height} src={src} />;
    }
    case 'picture': {
      return <img width={width} height={height} src={src} alt='' />;
    }
  }
};
