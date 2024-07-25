import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { createBlock } from '../../context/EditorContext.utils';
import { mockApi } from '../../mocks';
import { IToolProps } from '../tool.types';
import { List } from './List.tool';
import { IListData } from './List.types';

const mocks = vi.hoisted(() => ({
  handleListItemKeydown: vi.fn(),
}));

vi.mock('./List.utils', () => ({
  handleListItemKeydown: mocks.handleListItemKeydown,
}));

const listBlock = createBlock('list', { items: [''], style: 'unordered' } satisfies IListData);

const mockProps: IToolProps<IListData> = {
  api: mockApi,
  id: listBlock.id,
  data: listBlock.data as IListData,
  isEditable: true,
  type: listBlock.type,
};

describe('List tool', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('snapshot', () => {
    render(<List {...mockProps} />);

    expect(document.body).toMatchSnapshot();

    const listitem = screen.getByRole('listitem');
    expect(listitem).toHaveFocus();
  });

  it('ordered list snapshot', () => {
    render(<List {...mockProps} data={{ items: [''], style: 'ordered' }} />);

    expect(document.body).toMatchSnapshot();

    const listitem = screen.getByRole('listitem');
    expect(listitem).toHaveFocus();
  });

  it('read only mode snapshot', () => {
    render(
      <List
        {...mockProps}
        isEditable={false}
        data={{
          items: ['Birinchi element', 'Ikkinchi element', 'Uchinchi element'],
          style: 'ordered',
        }}
      />,
    );

    expect(document.body).toMatchSnapshot();
  });

  it('calls keydown handler on input', () => {
    render(<List {...mockProps} isEditable data={{ items: [''] }} />);

    const listItem = screen.getByRole('listitem');
    fireEvent.keyDown(listItem, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mocks.handleListItemKeydown).toHaveBeenCalled();
  });

  it('calls the setBlock after 1000 ms', () => {
    const mockSetBlock = vi.fn();
    mockProps.api.setBlock = mockSetBlock;

    render(<List {...mockProps} data={{ items: ['Initial text'] }} />);

    const listItem = screen.getByRole('listitem');
    fireEvent.input(listItem, { target: { innerHTML: 'Updated text' } });

    vi.advanceTimersByTime(1000);

    expect(mockSetBlock).toHaveBeenCalledWith({
      id: mockProps.id,
      type: mockProps.type,
      data: { items: ['Updated text'] },
    });
  });

  it('debounces the input', () => {
    const mockSetBlock = vi.fn();
    mockProps.api.setBlock = mockSetBlock;

    render(<List {...mockProps} />);

    const listItem = screen.getByRole('listitem');
    fireEvent.input(listItem, { target: { innerHTML: 'Some new text' } });

    vi.advanceTimersByTime(999);

    expect(mockSetBlock).not.toHaveBeenCalled();
  });
});
