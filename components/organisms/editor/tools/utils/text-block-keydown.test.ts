import { KeyboardEvent } from 'react';

import { IEditorAPI } from '../../context';
import { IBlockData } from '../../instance/Editor.types';
import { textBlockKeydownHandler } from './text-block-keydown';

const mocks = vi.hoisted(() => {
  const mockElement = { innerText: 'Lorem ipsum dolor sit amet.' } as unknown as HTMLElement;

  return {
    element: mockElement,
    isEmpty: vi.fn(),
  };
});

vi.mock('../../utils/html', () => ({ isEmpty: mocks.isEmpty }));

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
  removeBlock: vi.fn().mockResolvedValue({ prevBlocks: [] }),
} as unknown as IEditorAPI;

describe('textBlockKeydownHandler', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Should create a new empty text block on Enter if there is no content after the cursor', () => {
    vi.spyOn(document, 'getSelection').mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getRangeAt: () => {
        const { innerText } = mocks.element;
        const cursorPosition = innerText.length;

        return {
          startOffset: cursorPosition,
          cloneRange: () => ({
            setStart: vi.fn(),
            setEndAfter: vi.fn(),
            extractContents: () => {
              const textNode = document.createTextNode('');
              const fragment = document.createDocumentFragment();
              fragment.append(textNode);
              return fragment;
            },
          }),
        };
      },
    });
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
    const cursorPosition = 5;
    vi.spyOn(document, 'getSelection').mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getRangeAt: () => {
        return {
          startOffset: cursorPosition,
          cloneRange: () => ({
            setStart: vi.fn(),
            setEndAfter: vi.fn(),
            extractContents: () => {
              const { innerText } = mocks.element;
              const textAfterTheCursor = innerText.slice(cursorPosition);
              const textBeforeTheCursor = innerText.slice(0, cursorPosition);

              mocks.element.innerHTML = textBeforeTheCursor;

              const textNode = document.createTextNode(textAfterTheCursor);
              const fragment = document.createDocumentFragment();
              fragment.appendChild(textNode);
              return fragment;
            },
          }),
        };
      },
    });
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

  it('deletes current block on Backspace if text content is empty', () => {
    mocks.isEmpty.mockReturnValue(true);
    const block = {
      id: 'unique_id',
      type: 'header',
    } satisfies Pick<IBlockData, 'id' | 'type'>;
    const event = { ...mockEvent, code: 'Backspace' };

    textBlockKeydownHandler(event, mockApi, mocks.element, block);

    expect(mockApi.removeBlock).toHaveBeenCalledWith(block.id);
  });
});
