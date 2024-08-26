import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CSSProperties } from 'react';

import { ToolsPopover } from './ToolsPopover';

const mocks = vi.hoisted(() => ({
  addBlock: vi.fn(),
}));

vi.mock('../../context/useEditorContext', async (importOriginal) => {
  const original = await importOriginal<typeof import('../../context/useEditorContext')>();

  return {
    ...original,
    useEditorContext: () => ({
      ...original.useEditorContext(),
      addBlock: mocks.addBlock,
      hoveredBlock: {
        id: 'unique_id',
      },
    }),
  };
});

vi.mock('utils', async (importOriginal) => {
  const original = await importOriginal<typeof import('utils')>();
  return {
    ...original,
    detectPlatform: vi.fn().mockReturnValue('Linux'),
  };
});

const mockProps: { open: boolean; close: VoidFunction; style: CSSProperties } = {
  open: true,
  close: vi.fn(),
  style: {},
};

describe('ToolsPopover', () => {
  it('calls addBlock and close on item click', async () => {
    const mockClose = vi.fn();
    render(<ToolsPopover {...mockProps} close={mockClose} />);
    const button = screen.getByRole('button', { name: /Matn/i });

    userEvent.click(button);

    await waitFor(() => {
      expect(mocks.addBlock).toHaveBeenCalledTimes(1);
      expect(mockClose).toHaveBeenCalled();
    });
  });

  it('snapshot', () => {
    render(<ToolsPopover {...mockProps} />);
    expect(document.body).toMatchSnapshot();
  });
});
