import { KeyboardEvent } from 'react';

import { IEditorAPI } from '../../context';
import { IBlockData } from '../../instance/Editor.types';
import { textBlockKeydownHandler } from './text-block-keydown';

const mocks = vi.hoisted(() => {
  const mockElement = { innerText: 'Lorem ipsum dolor sit amet.' } as unknown as HTMLElement;
  const mockSelection = { range: { startOffset: mockElement.innerText.length } };

  return {
    Selection: mockSelection,
    element: mockElement,
  };
});

vi.mock('../../utils/selection', () => ({
  Selection: mocks.Selection,
}));

const mockEvent = {
  preventDefault: vi.fn(),
} as unknown as KeyboardEvent;

const mockApi = {
  addBlock: vi.fn().mockResolvedValue({
    id: 'new_block_id',
    data: { text: '' },
    type: 'paragraph',
  } satisfies IBlockData),
  setBlock: vi.fn(),
} as unknown as IEditorAPI;

describe('textBlockKeydownHandler', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Should create a new text block on Enter', () => {
    const event = { ...mockEvent, code: 'Enter' };
    const block = {
      id: 'unique_id',
      type: 'paragraph',
    } satisfies Pick<IBlockData, 'id' | 'type'>;

    textBlockKeydownHandler(event, mockApi, mocks.element, block);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockApi.addBlock).toHaveBeenCalledWith('paragraph', block.id);
    expect(mockApi.addBlock).toHaveBeenCalledTimes(1);
    expect(mockApi.setBlock).not.toHaveBeenCalled();
  });

  it('Should create a new text block with text after the cursor', () => {
    const event = { ...mockEvent, code: 'Enter' };
    const block = {
      id: 'unique_id',
      type: 'header',
    } satisfies Pick<IBlockData, 'id' | 'type'>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(document, 'getElementById').mockImplementation((id: IBlockData['id']): any => {
      if (id === block.id) {
        return {
          querySelector: () => ({}),
        };
      }

      return null;
    });

    const cursorPosition = 5;
    mocks.Selection.range.startOffset = cursorPosition;
    const { innerText } = mocks.element;
    const beforeCursorText = innerText.slice(0, cursorPosition);
    const afterCursorText = innerText.slice(cursorPosition);

    textBlockKeydownHandler(event, mockApi, mocks.element, block);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockApi.addBlock).toHaveBeenCalledWith('paragraph', block.id, {
      text: afterCursorText,
    });
    expect(mockApi.addBlock).toHaveBeenCalledTimes(1);
    expect(mockApi.setBlock).toHaveBeenCalledWith({
      id: block.id,
      type: block.type,
      data: { text: beforeCursorText },
    });
  });
});
