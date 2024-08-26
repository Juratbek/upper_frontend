import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { createBlock } from '../context/EditorContext.utils';
import { generateBlockNode } from '../tools/utils';
import { Block } from './Block';
import { IBlockProps } from './Block.types';

const newBlock = createBlock('paragraph');

const mockProps: IBlockProps = {
  id: newBlock.id,
  data: newBlock.data,
  type: 'paragraph',
  children: 'block content',
};

describe('Editor block', () => {
  it('snapshot', () => {
    render(<Block {...mockProps} id='9e02c085' />);
    expect(document.body).toMatchSnapshot();
  });

  it('calls mouse enter callback', async () => {
    const mockMouseEnter = vi.fn();
    mockProps.onMouseEnter = mockMouseEnter;
    render(<Block {...mockProps} />);

    const block = screen.getByTestId('block') as HTMLDivElement;
    userEvent.hover(block);

    const node = generateBlockNode(block, mockProps);

    await waitFor(() => {
      expect(mockMouseEnter).toHaveBeenCalledWith(node);
    });
  });

  it('calls click callback', async () => {
    const mockClick = vi.fn();
    mockProps.onClick = mockClick;
    render(<Block {...mockProps} />);

    const block = screen.getByTestId('block') as HTMLDivElement;
    userEvent.click(block);

    await waitFor(() => {
      expect(mockClick).toHaveBeenCalledWith({
        data: mockProps.data,
        id: mockProps.id,
        type: mockProps.type,
      });
    });
  });

  it('calls focus callback', async () => {
    const mockFocusCb = vi.fn();
    mockProps.onFocus = mockFocusCb;
    render(<Block {...mockProps} />);

    const block = screen.getByTestId('block') as HTMLDivElement;
    fireEvent.focus(block);

    await waitFor(() => {
      expect(mockFocusCb).toHaveBeenCalledWith({
        data: mockProps.data,
        id: mockProps.id,
        type: mockProps.type,
      });
    });
  });
});
