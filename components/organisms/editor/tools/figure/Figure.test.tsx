import { render } from '@testing-library/react';

import { createBlock } from '../../context/EditorContext.utils';
import { mockApi } from '../../mocks';
import { IToolProps } from '../tool.types';
import { Figure } from './Figure.tool';
import { IFigureData } from './Figure.types';

const figureBlock = createBlock('figure', {
  src: 'https://image.medium.com',
  element: 'picture',
  caption: 'Copied from medium.com',
} satisfies IFigureData);

const mockProps: IToolProps<IFigureData> = {
  id: figureBlock.id,
  data: figureBlock.data as IFigureData,
  type: figureBlock.type,
  isEditable: true,
  api: mockApi,
};

describe('Figure tool', () => {
  it('snapshot', () => {
    render(<Figure {...mockProps} />);
    expect(document.body).toMatchSnapshot();
  });

  it('frame element snapshot', () => {
    const frameBlock = createBlock('figure', {
      src: 'https://github.com/gists/1232',
      element: 'frame',
      caption: 'A gist from GitHub',
      width: 100,
      height: 100,
    } satisfies IFigureData);
    mockProps.data = frameBlock.data as IFigureData;

    render(<Figure {...mockProps} />);
    expect(document.body).toMatchSnapshot();
  });
});
