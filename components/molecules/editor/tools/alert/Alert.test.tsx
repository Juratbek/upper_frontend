import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { createBlock } from '../../context/EditorContext.utils';
import { mockApi } from '../../mocks';
import { IToolProps } from '../tool.types';
import { Alert } from './Alert.tool';
import { IAlertData } from './Alert.types';

const newData = createBlock('alert', {
  message: 'This is an info message',
  type: 'info',
} satisfies IAlertData);

const mockProps: IToolProps<IAlertData> = {
  id: newData.id,
  type: newData.type,
  data: newData.data as IAlertData,
  isEditable: true,
  api: mockApi,
};

describe('Alert tool', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('snapshot', () => {
    render(<Alert {...mockProps} />);
    expect(document.body).toMatchSnapshot();
  });

  it('snapshot for not editable mode', () => {
    render(<Alert {...mockProps} isEditable={false} />);
    expect(document.body).toMatchSnapshot();
  });

  it('focuses on paragraph on new item created', () => {
    render(<Alert {...mockProps} data={{ type: 'info', message: '' }} />);
    const paragraph = screen.getByRole('paragraph');
    expect(paragraph).toHaveFocus();
  });

  it('debounces the paragraph value', () => {
    const mockSetBlock = vi.fn();
    mockProps.api.setBlock = mockSetBlock;

    render(<Alert {...mockProps} data={{ type: 'info', message: '' }} />);
    const paragraph = screen.getByRole('paragraph');

    fireEvent.input(paragraph, { target: { innerHTML: 'Updated message' } });

    vi.advanceTimersByTime(999);

    expect(mockSetBlock).not.toHaveBeenCalled();
  });

  it('calls the setBlock after 1000 ms', () => {
    const mockSetBlock = vi.fn();
    mockProps.api.setBlock = mockSetBlock;

    render(<Alert {...mockProps} data={{ type: 'info', message: '' }} />);
    const paragraph = screen.getByRole('paragraph');

    fireEvent.input(paragraph, { target: { innerHTML: 'Updated message' } });

    vi.advanceTimersByTime(1000);

    expect(mockSetBlock).toHaveBeenCalledWith({
      id: mockProps.id,
      type: mockProps.type,
      data: { message: 'Updated message', type: mockProps.data.type },
    });
  });
});
