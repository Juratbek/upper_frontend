import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { InlineToolbar } from './InlineToolbar';

const mocks = vi.hoisted(() => ({
  useEditorContext: vi.fn().mockReturnValue({
    inlineToolbar: {},
    hideInlineToolbar: vi.fn(),
  }),
  inlineToolCallback: vi.fn(),
}));

vi.mock('./InlineToolbar.constants', async (importOriginal) => {
  const original = await importOriginal<typeof import('./InlineToolbar.constants')>();

  const INLINE_TOOLS = original.INLINE_TOOLS.map((tool) => {
    tool.callback = mocks.inlineToolCallback;
    return tool;
  });

  return { ...original, INLINE_TOOLS };
});

vi.mock('../context', () => ({
  useEditorContext: mocks.useEditorContext,
}));

describe('Inline toolbar', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('snapshot', () => {
    render(<InlineToolbar />);
    expect(document.body).toMatchSnapshot();
  });

  it('snapshot with positions', () => {
    mocks.useEditorContext.mockReturnValue({
      inlineToolbar: {
        position: { top: 10, left: 10 },
      },
      hideInlineToolbar: vi.fn(),
    });
    render(<InlineToolbar />);

    expect(document.body).toMatchSnapshot();
  });

  it('intine tools click handler', async () => {
    mocks.useEditorContext.mockReturnValue({
      inlineToolbar: {
        position: { top: 10, left: 10 },
      },
      hideInlineToolbar: vi.fn(),
    });
    render(<InlineToolbar />);

    const buttons = screen.getAllByRole<HTMLButtonElement>('button');

    buttons.forEach((button) => {
      userEvent.click(button);
    });

    await waitFor(() => {
      expect(mocks.inlineToolCallback).toHaveBeenCalledTimes(buttons.length);
    });
  });

  it('opens inline toolbar popover on click', async () => {
    const { INLINE_TOOLS } = await import('./InlineToolbar.constants');

    mocks.useEditorContext.mockReturnValue({
      inlineToolbar: {
        position: { top: 10, left: 10 },
      },
      hideInlineToolbar: vi.fn(),
    });
    render(<InlineToolbar />);

    const buttons = screen.getAllByRole<HTMLButtonElement>('button');
    const toolWithPopoverIndex = INLINE_TOOLS.findIndex(
      (tool) => typeof tool.renderPopover === 'function',
    );
    const linkTool = buttons[toolWithPopoverIndex];

    userEvent.click(linkTool);

    await waitFor(() => {
      expect(mocks.inlineToolCallback).toHaveBeenCalledTimes(1);
      expect(document.body).toMatchSnapshot();
    });
  });
});
