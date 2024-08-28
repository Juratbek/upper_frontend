import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { createBlock } from '../../context/EditorContext.utils';
import { mockApi } from '../../mocks';
import { IToolProps } from '../tool.types';
import { Header } from './Header.tool';
import { IHeaderData } from './Header.types';

const mocks = vi.hoisted(() => ({
  textBlockKeydownHandler: vi.fn(),
}));

vi.mock('../utils/text-block-keydown', () => ({
  textBlockKeydownHandler: mocks.textBlockKeydownHandler,
}));

const headerBlock = createBlock('header');

const mockProps: IToolProps<IHeaderData> = {
  id: headerBlock.id,
  data: headerBlock.data as IHeaderData,
  isEditable: true,
  api: mockApi,
  type: headerBlock.type,
};

describe('Header tool', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('snapshot', () => {
    render(<Header {...mockProps} />);
    expect(document.body).toMatchSnapshot();

    const heading = screen.getByRole('heading');
    expect(heading).toHaveFocus();
  });

  it('read only snapshot', () => {
    mockProps.data.text = 'This is a heading';
    render(<Header {...mockProps} isEditable={false} />);
    expect(document.body).toMatchSnapshot();
  });

  it('renders heading level based on data level', () => {
    const headerBlockWithLevel2 = createBlock('header', {
      text: '',
      level: 2,
    } satisfies IHeaderData);
    mockProps.data = headerBlockWithLevel2.data as IHeaderData;
    mockProps.isEditable = true;

    render(<Header {...mockProps} />);
    expect(document.body).toMatchSnapshot();
  });

  it('calls the setBlock after 1000 ms', () => {
    const mockSetBlock = vi.fn();
    mockProps.api.setBlock = mockSetBlock;

    render(<Header {...mockProps} data={{ text: 'Initial text', level: 2 }} />);

    const heading = screen.getByRole('heading');
    fireEvent.input(heading, { target: { innerHTML: 'Updated message' } });

    vi.advanceTimersByTime(1000);

    expect(mockSetBlock).toHaveBeenCalledWith({
      id: mockProps.id,
      type: mockProps.type,
      data: { text: 'Updated message', level: 2 },
    });
  });

  it('calls keydown handler on input', () => {
    render(<Header {...mockProps} isEditable />);

    const heading = screen.getByRole('heading');
    fireEvent.keyDown(heading, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mocks.textBlockKeydownHandler).toHaveBeenCalled();
  });
});
